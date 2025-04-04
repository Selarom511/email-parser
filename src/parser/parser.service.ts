import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { EmailSource, EmailParser, FileService } from 'src/utils';
import { EmailDto } from './dto/email.dto';
import { Attachment } from './entities/attachment.entity';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { ParsedMail } from 'mailparser';

@Injectable()
export class ParserService {

    constructor(
        private readonly http: HttpService,
    ) {}

    private async parseThisEmail(source?: string): Promise<ParsedMail> {
        if (!source) {
            throw new BadRequestException('Either url or path must be provided');
        }

        let email: EmailSource;

        FileService.pathExists(source);
        email = FileService.readFile(source);
        const parsedEmail = await EmailParser.parse(email);

        return parsedEmail;
    }

    async fileFromAttachment({ url, path }: EmailDto): Promise<Attachment[]> {
        const parsedEmail = await this.parseThisEmail(url || path);
        const { attachments: emailAttachments } = parsedEmail;

        let attachments: Attachment[] = [];
        this.getFilesFromAttachments(attachments, emailAttachments);

        return attachments;
    }

    async fileFromBody({ url, path }: EmailDto): Promise<Attachment> {
        const parsedEmail = await this.parseThisEmail(url || path);
        const { html: emailHtml } = parsedEmail;

        if (!emailHtml) {
            throw new BadRequestException('Email body is empty');
        }
        const parsedEmailHtml = emailHtml.match(/https?:\/\/[^\s]+\"/g);
        let links: string[] = [];
        if (parsedEmailHtml) {
            parsedEmailHtml?.map(link => {
                links.push(link.slice(0, link.length - 1));
            });
        }

        return this.getFileFromUrl(links[0]);
    }

    async fileFromWebsite({ url, path }: EmailDto): Promise<Attachment> {
        const parsedEmail = await this.parseThisEmail(url || path);
        const { html: emailHtml } = parsedEmail;

        if (!emailHtml) {
            throw new BadRequestException('Email body is empty');
        }
        const parsedEmailHtml = emailHtml.match(/https?:\/\/[^\s]+\"/g);
        let websiteLinks: string[] = [];
        if (parsedEmailHtml) {
            parsedEmailHtml?.map(link => {
                websiteLinks.push(link.slice(0, link.length - 1));
            });
        }

        const website = await this.getFileFromUrl(websiteLinks[0]);
        const parsedWebsite = JSON.stringify(website.content).match(/https?:\/\/[^\s]+\"/g);
        
        let fileLinks: string[] = [];
        if (parsedWebsite) {
            parsedWebsite?.map(link => {
                fileLinks.push(link.slice(0, link.length - 1));
            });
        }

        return this.getFileFromUrl(fileLinks[0]);
    }

    private getFilesFromAttachments(parsedAttachments: Attachment[], emailAttachments): void {
        if (emailAttachments.length > 0) {
            emailAttachments.forEach( emailAttachment => {
                parsedAttachments.push({
                    filename: emailAttachment.filename || "",
                    contentType: emailAttachment.contentType,
                    content: JSON.parse(emailAttachment.content.toString())
                });
            });
        }
        return;
    }

    private async getFileFromUrl(url: string): Promise<Attachment> {
        const {data} = await firstValueFrom(
            this.http.get(url).pipe(
                catchError((error: AxiosError) => {
                    throw new InternalServerErrorException(`Error fetching file from URL: ${error.message}`);
                }),
            ),
        );
        
        return {
            filename: url.slice(url.lastIndexOf('/')) || "",
            contentType: 'application/json',
            content: data
        } as Attachment;
    }

}

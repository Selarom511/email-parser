import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { EmailDto } from './dto/email.dto';
import { Attachment } from './entities/attachment.entity';
import { ParserService } from './parser.service';

@ApiTags('Email Parser')
@Controller('parser')
export class ParserController {
  constructor(private readonly parserService: ParserService) {}

  @Post('from-attachment')
  @ApiResponse({ status: 200, description: 'JSON file successfully retrieved from email attachment', type: [Attachment] })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Email file not found' })
  @ApiResponse({ status: 500, description: 'Could not parse email file' })
  @HttpCode(HttpStatus.OK)
  fromAttachments(@Body() email: EmailDto): Promise<Attachment[]> {
    return this.parserService.fileFromAttachment( email );
  }

  @Post('from-body')
  @ApiResponse({ status: 200, description: 'JSON file successfully retrieved from email body', type: Attachment })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Email file not found' })
  @ApiResponse({ status: 500, description: 'Could not parse email file' })
  @HttpCode(HttpStatus.OK)
  fromBody(@Body() email: EmailDto): Promise<Attachment> {
    return this.parserService.fileFromBody( email );
  }

  @Post('from-website')
  @ApiResponse({ status: 200, description: 'JSON file successfully retrieved from website link', type: Attachment })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Email file not found' })
  @ApiResponse({ status: 500, description: 'Could not parse email file' })
  @HttpCode(HttpStatus.OK)
  fromWebsite(@Body() email: EmailDto): Promise<Attachment> {
    return this.parserService.fileFromWebsite( email );
  }
}

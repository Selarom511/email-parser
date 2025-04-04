import Stream from 'stream';
import { ParsedMail, simpleParser } from 'mailparser'

export type EmailSource = string | Buffer<ArrayBufferLike> | Stream;

export class EmailParser {

    static async parse(source: EmailSource ): Promise<ParsedMail> {
        let parsed: ParsedMail = await simpleParser( source );

        return parsed;
    }
}

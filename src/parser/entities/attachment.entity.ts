import { ApiProperty } from "@nestjs/swagger";

export class Attachment {

    @ApiProperty({
        description: 'The name of the file',
        example: 'example.json',
    })
    filename: string;

    @ApiProperty({
        description: 'The type of the file',
        example: 'application/json',
    })
    contentType: string;

    @ApiProperty({
        description: 'The content of the file',
        example: '{ "key": "value" }',
    })
    content: JSON;
}

import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, IsUrl } from "class-validator";

export class EmailDto {

    @ApiProperty({
        example: '/user/desktop/email-file.eml',
        description: 'Path to the email file',
        nullable: true,
        required: false,
    })
    @IsUrl()
    @IsOptional()
    url?: string;

    @ApiProperty({
        example: 'http://example.com/email-file.eml',
        description: 'Url to the email file',
        nullable: true,
        required: false,
    })
    @IsString()
    @IsOptional()
    path?: string;

}

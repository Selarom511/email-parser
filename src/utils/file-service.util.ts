import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { existsSync, readFileSync} from 'fs';

export class FileService {

    static pathExists(path: string): void {
        if (!existsSync(path)) {
            throw new NotFoundException('File not found');
        }
        return;
    }

    static readFile(path: string): Buffer {
        try {
            const file = readFileSync(path);
            return file;
        } catch (error) {
            throw new InternalServerErrorException('Something went wrong while reading the file');
        }
    }

}

import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ParserService } from './parser.service';
import { ParserController } from './parser.controller';

@Module({
  imports: [HttpModule],
  controllers: [ParserController],
  providers: [ParserService],
})
export class ParserModule {}

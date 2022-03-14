import { Module } from '@nestjs/common';
import { KeyModule } from 'src/key/key.module';
import { FileService } from './file.service';

@Module({
  providers: [FileService],
  exports: [FileService],
  imports: [KeyModule],
})
export class FileModule {}

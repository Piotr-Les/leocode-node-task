import { Module } from '@nestjs/common';
import { KeyGenService } from './key-gen.service';

@Module({
  providers: [KeyGenService],
  exports: [KeyGenService],
})
export class KeyGenModule {}

import { Module } from '@nestjs/common';
import { KeyGenService } from './key-gen.service';
import { KeyVaultService } from './key-vault.service';

@Module({
  providers: [KeyVaultService, KeyGenService],
  exports: [KeyVaultService, KeyGenService],
})
export class KeyModule {}

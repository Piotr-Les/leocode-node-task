import { Module } from '@nestjs/common';
import { KeyGenModule } from 'src/key-gen/key-gen.module';
import { KeyVaultService } from './key-vault.service';

@Module({
  providers: [KeyVaultService],
  imports: [KeyGenModule],
  exports: [KeyVaultService],
})
export class KeyVaultModule {}

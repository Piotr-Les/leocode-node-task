import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { KeyGenModule } from './key-gen/key-gen.module';
import { KeyVaultModule } from './key-vault/key-vault.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ConfigModule.forRoot(),
    KeyGenModule,
    KeyVaultModule,
  ],
  controllers: [AppController],
})
export class AppModule {}

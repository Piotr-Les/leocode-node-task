import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { KeyGenModule } from './key-gen/key-gen.module';

@Module({
  imports: [AuthModule, UsersModule, ConfigModule.forRoot(), KeyGenModule],
  controllers: [AppController],
})
export class AppModule {}

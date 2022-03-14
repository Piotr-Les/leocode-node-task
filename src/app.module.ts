import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { FileModule } from './file/file.module';
import { KeyModule } from './key/key.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ConfigModule.forRoot(),
    KeyModule,
    FileModule,
  ],
  controllers: [AppController],
})
export class AppModule {}

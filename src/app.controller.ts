import {
  Controller,
  Header,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guards/jwtAuth.guard';
import { LocalAuthGuard } from './auth/guards/localAuth.guard';
import { SignInDto } from './dtos/sign-in.dto';
import { FileService } from './file/file.service';
import { KeyVaultService } from './key/key-vault.service';
import {
  EncryptFileResponse,
  GenerateRSAKeyPairResponse,
  SignInResponse,
} from './types';

@Controller('/api')
export class AppController {
  constructor(
    private authService: AuthService,
    private keyVaultService: KeyVaultService,
    private fileService: FileService,
  ) {}

  @ApiOperation({ summary: 'User sign in endpoint' })
  @ApiOkResponse({
    type: SignInResponse,
    description: 'Returns a JWT valid for 5 minutes',
  })
  @ApiUnauthorizedResponse({
    description: 'Returns unauthorized when passed credentials are invalid',
  })
  @ApiBadRequestResponse({
    description: 'Returns bad request when passed credentials are incomplete',
  })
  @ApiBody({
    type: SignInDto,
    examples: {
      User1: {
        description: 'user1 credentials',
        value: { email: 'user1@example.com', password: 'password11' },
      },
      User2: {
        description: 'user2 credentials',
        value: { email: 'user2@example.com', password: 'password22' },
      },
      User3: {
        description: 'user3 credentials',
        value: { email: 'user3@example.com', password: 'password33' },
      },
    },
  })
  @UseGuards(LocalAuthGuard)
  @Post('/sign-in')
  @HttpCode(200)
  signIn(@Request() req): SignInResponse {
    return this.authService.login(req.user);
  }

  @ApiOperation({ summary: 'Generate RSA key pair endpoint' })
  @ApiCreatedResponse({
    type: GenerateRSAKeyPairResponse,
    description:
      'Saves RSA key pair (2048 bits) to vault and returns them back',
  })
  @ApiUnauthorizedResponse({
    description:
      'Returns unauthorized when there is no JWT provided in header or the JWT provided is invalid',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('/generate-key-pair')
  generateKeyPair(@Request() req) {
    return this.keyVaultService.handleKeys(req.user.id);
  }

  @ApiOperation({ summary: 'Encrypt file endpoint' })
  @ApiNotFoundResponse({
    description: 'Returns not found when user has no rsa keys assigned',
  })
  @ApiOkResponse({
    type: EncryptFileResponse,
    description: 'Returns encrypted file as Base64 string',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('/encrypt')
  @HttpCode(200)
  @Header('content-type', 'application/json')
  async encryptFile(@Request() req) {
    return await this.fileService.handleFile(req.user.id);
  }
}

import {
  Request,
  Controller,
  Post,
  UseGuards,
  Body,
  Get,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/guards/localAuth.guard';
import { SignInDto } from './dtos/sign-in.dto';
import { SignInResponse } from './types';

@Controller('/api')
export class AppController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'User sign in endpoint' })
  @ApiOkResponse({
    type: SignInResponse,
    description: 'returns a JWT valid for 5 minutes',
  })
  @ApiUnauthorizedResponse({
    description: 'returns unauthorized when passed credentials are invalid',
  })
  @ApiBadRequestResponse({
    description: 'returns bad request when passed credentials are incomplete',
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
  signIn(@Request() req): SignInResponse {
    return this.authService.login(req.user);
  }
}

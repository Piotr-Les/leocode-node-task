import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  handleRequest<TUser = any>(
    err: any,
    user: any,
    info: any,
    context: any,
    status?: any,
  ): TUser {
    const body = context.args[0].body;

    if (!body || !body.email || !body.password) {
      throw new BadRequestException('Missing credentials');
    }
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}

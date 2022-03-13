import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({ type: 'string', format: 'email' })
  email: string;

  @ApiProperty({ type: 'string' })
  password: string;
}

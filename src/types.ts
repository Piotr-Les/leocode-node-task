import { ApiProperty } from '@nestjs/swagger';

export class SignInResponse {
  @ApiProperty()
  authToken: string;
}

export interface UserData {
  id: number;
  email: string;
}

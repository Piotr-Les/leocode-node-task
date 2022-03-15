import { ApiProperty } from '@nestjs/swagger';

export class SignInResponse {
  @ApiProperty()
  authToken: string;
}

export class GenerateRSAKeyPairResponse {
  @ApiProperty()
  pubKey: string;

  @ApiProperty()
  privKey: string;
}

export class EncryptFileResponse {
  @ApiProperty()
  encryptedFile: string;
}

export interface UserData {
  id: number;
  email: string;
}

export interface RSAKeyPair {
  pubKey: string;
  privKey: string;
}

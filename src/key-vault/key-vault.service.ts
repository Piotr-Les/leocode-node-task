import { Injectable } from '@nestjs/common';
import { KeyGenService } from 'src/key-gen/key-gen.service';

export interface UserKeyPair {
  userId: number;
  pubKey: string;
  privKey: string;
}
@Injectable()
export class KeyVaultService {
  private keys: UserKeyPair[];

  constructor(private keyGenService: KeyGenService) {
    this.keys = [];
  }

  private getKeys(userId: number): Omit<UserKeyPair, 'userId'> | undefined {
    const key = this.keys.find((key) => key.userId === userId);
    if (key) {
      const { userId, ...result } = key;
      return result;
    }
    return undefined;
  }

  private setKeys(keys: UserKeyPair) {
    this.keys.push(keys);
  }

  handleKeys(userId: number): Omit<UserKeyPair, 'userId'> {
    const keys = this.getKeys(userId);
    if (!keys) {
      const newKeys = this.keyGenService.generateKeyPair();
      this.setKeys({ userId, ...newKeys });
      return newKeys;
    }
    return keys;
  }
}

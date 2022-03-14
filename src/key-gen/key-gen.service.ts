import { Injectable } from '@nestjs/common';
import { RSAKeyPair } from 'src/types';
import * as NodeRSA from 'node-rsa';
@Injectable()
export class KeyGenService {
  private bits: number;

  constructor() {
    this.bits = 2048;
  }

  generateKeyPair(): RSAKeyPair {
    const nodeRSA = new NodeRSA().generateKeyPair(this.bits);

    const privateKey = nodeRSA.exportKey('private');
    const publicKey = nodeRSA.exportKey('public');

    return {
      pubKey: publicKey,
      privKey: privateKey,
    };
  }
}

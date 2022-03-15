import { Injectable } from '@nestjs/common';
import * as NodeRSA from 'node-rsa';
import { RSAKeyPair } from 'src/types';
@Injectable()
export class KeyGenService {
  private bits: number;

  constructor() {
    this.bits = 2048;
  }

  generateKeyPair(): RSAKeyPair {
    const nodeRSA = new NodeRSA(null, 'pkcs8', {
      environment: 'node',
    }).generateKeyPair(this.bits);

    const privateKey = nodeRSA
      .exportKey('pkcs8-private')
      .replace(/[\n\r]/g, '');
    const publicKey = nodeRSA.exportKey('pkcs8-public').replace(/[\n\r]/g, '');

    return {
      pubKey: publicKey,
      privKey: privateKey,
    };
  }

  encrypt(base64: any, publicKey: string): string {
    const key = new NodeRSA(publicKey);
    return key.encrypt(base64, 'base64');
  }

  decrypt(encryptedString: string, privateKey: string): string {
    const key = new NodeRSA(privateKey);
    return key.decrypt(encryptedString, 'ascii');
  }
}

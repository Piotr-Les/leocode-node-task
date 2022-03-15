import { Injectable, NotFoundException } from '@nestjs/common';
import { KeyGenService } from 'src/key/key-gen.service';
import { KeyVaultService } from 'src/key/key-vault.service';

const imageToBase64 = require('image-to-base64');
@Injectable()
export class FileService {
  private url: string;

  constructor(
    private keyVaultService: KeyVaultService,
    private keyGenService: KeyGenService,
  ) {
    this.url = 'http://www.africau.edu/images/default/sample.pdf';
  }

  private async getBase64() {
    return await imageToBase64(this.url);
  }

  async handleFile(userId: number) {
    const keys = this.keyVaultService.getKeys(userId);
    if (!keys) {
      throw new NotFoundException('user has no RSA keys assigned');
    }
    const fileAsBase64String = await this.getBase64();
    return {
      encryptedFile: this.keyGenService
        .encrypt(fileAsBase64String, keys.pubKey)
        .toString(),
    };
  }
}

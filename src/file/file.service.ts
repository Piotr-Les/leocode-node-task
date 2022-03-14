import { Injectable } from '@nestjs/common';
import imageToBase64 from 'image-to-base64';

@Injectable()
export class FileService {
  private url: string;

  constructor() {
    this.url = 'http://www.africau.edu/images/default/sample.pdf';
  }

  private async getBase64() {
    return await imageToBase64(this.url);
  }
}

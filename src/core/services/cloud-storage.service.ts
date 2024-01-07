/* eslint-disable prettier/prettier */
import { Bucket, Storage } from "@google-cloud/storage";
import { BadRequestException, Injectable } from "@nestjs/common";
import { parse } from "path";
import api_konfig from "../../../src/shop-info-config.json";
export interface File {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    destination: string;
    filename: string;
    path: string;
    buffer: Buffer;
  }
@Injectable()
export class CloudStorageService {
  private bucket: Bucket;
  private storage: Storage;

  constructor() {
    this.storage = new Storage({
      projectId: 'shopfotos',
      credentials: {
        client_email: api_konfig.client_email,
        private_key:  api_konfig.private_key,
      },
    })
    this.bucket = this.storage.bucket('shop_bucket_api');
  }

  private setDestination(destination: string): string {
    let escDestination = '';
    escDestination += destination.replace(/^\.+/g, '').replace(/^\/+|\/+$/g, '');
    if (escDestination !== '') escDestination = escDestination + '/';
    return escDestination;
  }

  private setFilename(uploadedFile: File): string {
    const fileName = parse(uploadedFile.originalname);
    return `${fileName.name}-${Date.now()}${fileName.ext}`.replace(/^\.+/g, '').replace(/^\/+/g, '').replace(/\r|\n/g, '_');
  }
async uploadFiles(uploadedFiles: Array<File>, destination: string): Promise<any[]> {
    const files = [];
    console.log(uploadedFiles, 'uploadedFiles');
    for (let i = 0; i < uploadedFiles.length; i++) {
      const fileName = this.setDestination(destination) + this.setFilename(uploadedFiles[i]);
      const file = this.bucket.file(fileName);
      try {
        if(uploadedFiles[i].buffer === undefined) throw new BadRequestException('File is not buffer');
        await file.save(uploadedFiles[i].buffer, { contentType: uploadedFiles[i].mimetype });
        files.push(file);
      } catch (error) {
        console.log(error, 'error');
        throw new BadRequestException(error?.message);
      }

    }
    console.log(files, 'files');
    return files;
}
  async uploadFile(uploadedFile: File, destination: string): Promise<any> {
    const fileName = this.setDestination(destination) + this.setFilename(uploadedFile);
    const file = this.bucket.file(fileName);
    try {
      await file.save(uploadedFile.buffer, { contentType: uploadedFile.mimetype });
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
    return { ...file.metadata, publicUrl: `https://storage.googleapis.com/${this.bucket.name}/${file.name}` };
  }

  async removeFile(fileName: string): Promise<void> {
    const file = this.bucket.file(fileName);
    try {
      await file.delete();
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }
}

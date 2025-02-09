import { Module } from '@nestjs/common';
import { FilesUploadService } from './files-upload.service';
import { CloudinaryProvider } from './cloudinary.provider';

@Module({
  providers: [FilesUploadService, CloudinaryProvider],
  exports: [FilesUploadService],
})
export class FilesUploadModule {}

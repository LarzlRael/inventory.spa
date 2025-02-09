import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { FoldersNameEnum } from './enums/folder.enum';
import { v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');
import { FileReturn } from './interfaces/file-return-interface';

@Injectable()
export class FilesUploadService {
  uploadFile(
    file: Express.Multer.File,
    folder: keyof typeof FoldersNameEnum,
  ): Promise<FileReturn> {
    try {
      return new Promise((resolve, reject) => {
        const uploadStream = v2.uploader.upload_stream(
          {
            folder,
            /* resource_type: 'auto', */
          },
          (error, result) => {
            if (error) reject(error);

            resolve({
              publicId: result.public_id,
              secureUrl: result.secure_url,
            });
          },
        );
        const fileStream = toStream(file.buffer);
        fileStream.pipe(uploadStream);
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error to upload file o is empty');
    }
  }

  async deleteImage(imageId?: string) {
    if (imageId == null) return;
    const deletedResult = await v2.uploader.destroy(imageId);
    return deletedResult;
  }

  async updateImage(
    file: Express.Multer.File,
    folder: keyof typeof FoldersNameEnum,
    imageId?: string,
  ): Promise<FileReturn> {
    /* 1 - Delete the image */
    if (imageId) {
      await this.deleteImage(imageId);
    }
    /* 2 - Upload the new Image */
    return await this.uploadFile(file, folder);
  }

  uploadPdfBuffer(
    fileBuffer: Buffer,
    folder: keyof typeof FoldersNameEnum,
    originalFileName: string, // Nombre del archivo a usar en Cloudinary
  ): Promise<FileReturn> {
    try {
      const timestamp = new Date().toISOString().replace(/[-:.]/g, ''); // Eliminar caracteres no permitidos
      const fileNameWithoutExt = originalFileName.replace(/\.[^/.]+$/, ''); // Eliminar la extensión del nombre original
      const fileName = `${fileNameWithoutExt}_${timestamp}.pdf`; // Combinar el nombre original, timestamp y extensión .pdf

      return new Promise((resolve, reject) => {
        const uploadStream = v2.uploader.upload_stream(
          {
            folder,
            resource_type: 'raw', // Cloudinary usa 'raw' para archivos no multimedia como PDFs
            public_id: fileName, // Puedes usar un nombre personalizado para el archivo
          },
          (error, result) => {
            if (error) reject(error);

            resolve({
              publicId: result.public_id,
              secureUrl: result.secure_url,
            });
          },
        );
        const fileStream = toStream(fileBuffer); // Convertir el buffer a un stream
        fileStream.pipe(uploadStream); // Subir el archivo
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Error to upload PDF or file is empty',
      );
    }
  }
}

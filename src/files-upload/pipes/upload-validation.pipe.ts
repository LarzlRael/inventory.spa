import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
  Inject,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class FileValidationPipe implements PipeTransform {
  constructor(private readonly reflector: Reflector) {}

  transform(value: any, metadata: ArgumentMetadata) {
    // Obtener los tipos de archivos y el tamaño máximo desde el Reflector
    const fileValidation = this.reflector.get<{
      types: string[];
      maxSizeMb: number;
    }>('fileValidation', metadata.metatype);

    // Si no hay configuración de validación, permitimos que el archivo pase
    if (!fileValidation) {
      return value;
    }

    const { types, maxSizeMb } = fileValidation;

    if (!value || !value.file) {
      return value; // Si no hay archivo, lo dejamos pasar como se solicitó
    }

    const file = value.file;

    // Validar tipo de archivo
    const validTypes = types;
    const fileType = file.mimetype;

    if (!validTypes.includes(fileType)) {
      throw new BadRequestException(
        `El archivo debe ser uno de los siguientes tipos: ${validTypes.join(
          ', ',
        )}`,
      );
    }

    // Validar tamaño del archivo
    const maxSizeInBytes = maxSizeMb * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      throw new BadRequestException(
        `El tamaño máximo permitido es ${maxSizeMb} MB`,
      );
    }

    return value;
  }
}

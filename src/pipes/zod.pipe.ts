import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ZodPipe implements PipeTransform {
  constructor(private readonly schema: any) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const parsedValue = this.schema.safeParse(value);
    if (parsedValue.success) return parsedValue.data;

    throw new BadRequestException(parsedValue.error.format());
  }
}

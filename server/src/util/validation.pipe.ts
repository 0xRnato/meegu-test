import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform {
  constructor(private readonly minimumAge?: number) {}

  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToClass(metatype, value);
    const errors = await validate(object);

    if (errors.length > 0) {
      throw new BadRequestException('Validation failed');
    }

    if (this.minimumAge !== undefined) {
      const birthdate = new Date(object.birthdate);
      const ageDiff = Date.now() - birthdate.getTime();
      const age = new Date(ageDiff).getUTCFullYear() - 1970;

      if (age < this.minimumAge) {
        throw new BadRequestException(
          `User must be at least ${this.minimumAge} years old`,
        );
      }
    }

    return value;
  }

  private toValidate(metatype: any): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}

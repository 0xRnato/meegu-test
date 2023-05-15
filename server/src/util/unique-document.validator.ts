import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { PrismaClient } from '@prisma/client';
import { BadRequestException } from '@nestjs/common';

const prisma = new PrismaClient();

@ValidatorConstraint({ async: true })
export class IsUniqueDocumentConstraint
  implements ValidatorConstraintInterface
{
  async validate(document: string) {
    if (!!document) {
      const user = await prisma.user.findUnique({
        where: { document },
      });
      return user === null;
    }
    throw new BadRequestException({
      success: false,
      errors: 'document is required',
    });
  }

  defaultMessage() {
    return 'User with this CPF already exists';
  }
}

export function IsUniqueDocument(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUniqueDocumentConstraint,
    });
  };
}

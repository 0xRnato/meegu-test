import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsPostalCode,
  IsString,
  Length,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsCPF } from '../../util/document.validator';
import { IsUniqueDocument } from '../../util/unique-document.validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsString()
  @Length(2, 100)
  name?: string;

  @IsOptional()
  @IsDateString()
  birthdate?: Date;

  @IsOptional()
  @IsCPF()
  @IsUniqueDocument()
  document?: string;

  @IsOptional()
  @IsPostalCode('BR')
  zipcode?: string;
}

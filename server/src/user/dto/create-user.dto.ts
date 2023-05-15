import {
  IsBoolean,
  IsDateString,
  IsOptional,
  IsPostalCode,
  IsString,
  Length,
  IsDefined,
} from 'class-validator';
import { IsCPF } from '../../util/document.validator';
import { IsUniqueDocument } from '../../util/unique-document.validator';

export class CreateUserDto {
  @IsDefined()
  @IsString()
  @Length(2, 100)
  name: string;

  @IsDateString()
  @IsDefined()
  birthdate: Date;

  @IsDefined()
  @IsCPF()
  @IsUniqueDocument()
  document: string;

  @IsOptional()
  @IsBoolean()
  acceptedTermsAndConditions?: boolean;

  @IsDefined()
  @IsPostalCode('BR')
  zipcode: string;

  @IsOptional()
  @IsString()
  street?: string;

  @IsOptional()
  @IsString()
  neighborhood?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  state?: string;
}

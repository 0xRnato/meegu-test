import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 100)
  name: string;

  @IsDateString()
  @IsNotEmpty()
  birthdate: Date;

  @IsOptional()
  @IsString()
  document?: string;

  @IsOptional()
  @IsBoolean()
  acceptedTermsAndConditions?: boolean;

  @IsNotEmpty()
  @IsString()
  zipcode: string;

  @IsOptional()
  @IsString()
  street: string;

  @IsOptional()
  @IsString()
  neighborhood: string;

  @IsOptional()
  @IsString()
  city: string;

  @IsOptional()
  @IsString()
  state: string;
}

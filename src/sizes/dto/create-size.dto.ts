import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateSizeDto {
  @IsString()
  @ApiProperty()
  CM: string;
  @ApiProperty()
  @IsString()
  EU: string;
  @ApiProperty()
  @IsString()
  USA: string;
  @ApiProperty()
  Lenght: string;
}

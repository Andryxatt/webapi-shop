import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateBrandDto {
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  iconPath: string;
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;
}

import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class UpdateBrandDto {
  @IsString()
  @ApiProperty()
  name: string;

  @ApiProperty()
  @IsString()
  iconPath: string;
  
  @ApiProperty()
  @IsString()
  description: string;
}

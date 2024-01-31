import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UpdateSubCategoryDto {
  @ApiProperty()
  id: number;
  @IsString()
  @ApiProperty()
  name: string;
  @ApiProperty()
  @IsString()
  description: string;
  @ApiProperty()
  categoryId: number;
}

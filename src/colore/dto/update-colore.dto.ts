import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UpdateColoreDto {
  @IsString()
  @ApiProperty()
  name: string;
  @ApiProperty()
  @IsString()
  hexColor: string;
}

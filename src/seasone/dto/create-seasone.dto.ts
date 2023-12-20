import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateSeasoneDto {
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  name: string;
}

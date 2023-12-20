import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

export class CreateGenderDto {
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  name: string;
}

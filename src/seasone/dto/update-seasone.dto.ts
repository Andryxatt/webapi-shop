import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class UpdateSeasoneDto {
  @IsString()
  @ApiProperty()
  name: string;
}

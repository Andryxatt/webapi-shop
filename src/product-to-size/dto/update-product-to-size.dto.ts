import { PartialType } from "@nestjs/swagger";
import { CreateProductToSizeDto } from "./create-product-to-size.dto";

export class UpdateProductToSizeDto extends PartialType(
  CreateProductToSizeDto
) {}

import { IsNotEmpty, IsInt, IsString } from 'class-validator';
import { Exclude, Expose, Transform } from 'class-transformer';
import type { Variant } from '../models/product.model';
export default class ProductDTO {
  @IsString()
  @IsNotEmpty()
  @Expose()
  title!: string;

  @IsInt()
  @IsNotEmpty()
  @Expose()
  stock!: number;

  @IsInt()
  @IsNotEmpty()
  @Expose()
  price!: number;

  @IsString()
  @IsNotEmpty()
  @Expose()
  variant!: Variant;
}

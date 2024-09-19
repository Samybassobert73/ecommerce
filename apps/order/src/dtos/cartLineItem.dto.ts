import { IsNotEmpty, IsInt, IsString } from 'class-validator';
import { Exclude, Expose, Transform } from 'class-transformer';

export default class CartLineItemDTO {
  @IsString()
  @IsNotEmpty()
  @Expose()
  productId!: string;

  @IsInt()
  @IsNotEmpty()
  @Expose()
  qty!: number;

  @IsString()
  @IsNotEmpty()
  @Expose()
  variant!: string;
}

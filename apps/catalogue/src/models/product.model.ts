import { timeStamp } from 'console';
import mongoose, { InferSchemaType } from 'mongoose';

export type Variant = 'small' | 'medium' | 'large';
export interface IProduct {
  title: string;
  stock: Number;
  price: Number;
  variant: Variant;
}

const productSchema = new mongoose.Schema<IProduct>(
  {
    title: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    variant: {
      type: String,
      enum: ['small', 'medium', 'large'], //test
      required: true,
    },
  },
  { timestamps: true }
);

export type product = InferSchemaType<typeof productSchema>;

const productModel = mongoose.model('Product', productSchema);

export default productModel;

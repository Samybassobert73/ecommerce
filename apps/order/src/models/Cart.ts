import mongoose, { InferSchemaType } from 'mongoose';

export interface ICart {
  customerId: string;
}

const cartSchema = new mongoose.Schema<ICart>({
  customerId: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
});

export type cart = InferSchemaType<typeof cartSchema>;

const cartModel = mongoose.model('Cart', cartSchema);

export default cartModel;

import mongoose, { InferSchemaType } from 'mongoose';

const cartLineItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' },
  cartId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' },
  itemName: {
    type: String,
    required: true,
  },
  variant: {
    type: String,
    required: true,
  },
  qty: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

export type cartLineItem = InferSchemaType<typeof cartLineItemSchema>;

const cartLineItemModel = mongoose.model('CartLineItem', cartLineItemSchema);

export default cartLineItemModel;

import mongoose, { InferSchemaType } from 'mongoose';

export interface IAdress {
  street: string;
}

const adressSchema = new mongoose.Schema<IAdress>(
  {
    street: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export type adress = InferSchemaType<typeof adressSchema>;

const adressModel = mongoose.model('Adress', adressSchema);

export default adressModel;

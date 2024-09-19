import mongoose, { InferSchemaType, Model } from 'mongoose';
import bcrypt from 'bcrypt';
export interface IUser extends Document {
  name: string;
  email: string;
  phone: string;
  // adressId: mongoose.Schema.Types.ObjectId;
  password: string;
  isValidPassword: (password: string) => Promise<boolean>;
}

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: false,
    },
    // adressId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Adress',
    //   required: false,
    // },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export type User = InferSchemaType<typeof userSchema>;

userSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.isValidPassword = async function (password: string) {
  const compare = await bcrypt.compare(password, this.password);
  return compare;
};

const UserModel: Model<IUser> = mongoose.model<IUser>('User', userSchema);

export default UserModel;

import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'The Password Must Be At Least 5 Characters'],
    },
    image: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

export const User = models?.User || model('User', UserSchema);

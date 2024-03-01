import mongoose, { Schema, models } from 'mongoose';
const UserInfoSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      default: '',
    },

    streetAddress: {
      type: String,
      default: '',
    },
    postalCode: {
      type: String,
      default: '',
    },
    city: {
      type: String,
      default: '',
    },
    country: {
      type: String,
      default: '',
    },
    admin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const UserInfo =
  models?.UserInfo || mongoose.model('UserInfo', UserInfoSchema);

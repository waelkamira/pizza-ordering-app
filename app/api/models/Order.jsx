import { Schema, model, models } from 'mongoose';

const OrderSchema = new Schema(
  {
    streetAddress: String,
    email: String,
    phoneNumber: String,
    city: String,
    country: String,
    postalCode: String,
    cartProducts: Object,
    paid: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Order = models?.Order || model('Order', OrderSchema);

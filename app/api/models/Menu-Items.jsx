import mongoose, { Schema, model, models } from 'mongoose';

const MenuItemSchema = new Schema(
  {
    image: {
      type: String,
    },
    itemName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    basePrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const MenuItem = models?.MenuItem || model('MenuItem', MenuItemSchema);

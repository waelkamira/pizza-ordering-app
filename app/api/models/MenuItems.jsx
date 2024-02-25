import mongoose, { Schema, model, models } from 'mongoose';

const ExtraPriceSchema = new Schema({
  name: String,
  price: Number,
});
const MenuItemSchema = new Schema(
  {
    image: {
      type: String,
      required: true,
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
    sizes: { type: [ExtraPriceSchema] },
    ingredients: { type: [ExtraPriceSchema] },
    category: { type: String },
  },
  { timestamps: true }
);

export const MenuItem = models?.MenuItem || model('MenuItem', MenuItemSchema);

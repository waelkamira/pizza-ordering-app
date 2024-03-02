import mongoose from 'mongoose';
const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
import { Order } from '../models/Order';
export async function POST(req) {
  await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI);
  const { data, cartProducts } = await req.json();
  const { streetAddress, email, phoneNumber, city, country, postalCode } = data;
  const order = await Order.create({
    streetAddress,
    email,
    phoneNumber,
    city,
    country,
    postalCode,
    cartProducts,
    paid: false,
  });

  //? this function to calculate cart product price
  function cartProductFinalPrice(cartProduct) {
    let price = cartProduct?.basePrice;

    if (cartProduct?.size) {
      price += cartProduct?.size?.price;
    }

    if (cartProduct?.extras?.length > 0) {
      for (const extra of cartProduct.extras) {
        price += extra.price;
      }
    }

    return price;
  }

  const stripeLineItems = [];
  for (const cartProduct of cartProducts) {
    const productName = cartProduct.itemName;
    const productPrice = cartProductFinalPrice(cartProduct);
    stripeLineItems.push({
      quantity: 1,
      price_data: {
        currency: 'USD',
        product_data: {
          name: productName,
        },
        unit_amount: productPrice * 100,
      },
    });
  }

  const stripeSession = await stripe.checkout.sessions.create({
    line_items: stripeLineItems,
    mode: 'payment',
    customer_email: data.email,
    metadata: { orderId: order._id.toString() },
    payment_intent_data: { metadata: { orderId: order._id.toString() } },
    success_url:
      process.env.NEXT_PUBLIC_NEXTAUTH_URL +
      'orders/' +
      order._id.toString() +
      'clear-cart=1',
    cancel_url: process.env.NEXT_PUBLIC_NEXTAUTH_URL + 'cart?canceled=1',

    shipping_options: [
      {
        shipping_rate_data: {
          display_name: 'delivery fee',
          type: 'fixed_amount',
          fixed_amount: { amount: 500, currency: 'USD' },
        },
      },
    ],
  });
  return Response.json(stripeSession.url);
}

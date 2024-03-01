import { buffer } from 'stream/consumers';
import { Order } from '../models/Order';

const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export async function POST(req) {
  const sig = req.headers.get('stripe-signature');
  let event;

  try {
    const reqBuffer = await req.text();
    event = stripe.webhooks.constructEvent(
      reqBuffer,
      sig,
      process.env.NEXT_PUBLIC_STRIPE_KEY
    );
  } catch (err) {
    console.log(err);
    return Response.json(err, { status: 400 });
  }

  if (event?.type === 'checkout.session.completed') {
    const orderId = event?.data?.object?.metadata?.orderId;
    console.log(orderId);
    const isPaid = event?.data?.object?.payment_status === 'paid';
    console.log(
      'metadata >>>>>>>>>>>>>>>>>>>>>>',
      event?.data?.object?.metadata
    );

    if (isPaid) {
      await Order.updateOne({ _id: orderId }, { paid: true });
    }
  }
  console.log(event);
  return Response.json('ok', { status: 200 });
}

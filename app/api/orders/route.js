import mongoose from 'mongoose';
import { Order } from '../models/Order';
import { getServerSession } from 'next-auth';
import { isAdmin } from '../auth/[...nextauth]/route';
import { authOptions } from '../authOptions/route';
export async function GET() {
  await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI);
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  const orders = await Order.find({ email });
  if (await isAdmin()) {
    const allOrders = await Order.find();
    return Response.json(allOrders);
  } else {
    return Response.json(orders);
  }
}

import mongoose from 'mongoose';
import { Order } from '../models/Order';
import { getServerSession } from 'next-auth';
import { authOptions, isAdmin } from '../auth/[...nextauth]/route';
export async function GET() {
  await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI);
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  const orders = await Order.find({ email });
  return Response.json(orders);
}

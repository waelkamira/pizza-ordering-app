import mongoose from 'mongoose';
import { User } from './../models/User';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function PUT(req) {
  await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI);
  console.log('connected to Mongodb');
  const body = await req.json();
  const session = await getServerSession(authOptions);
  // console.log('this is session from profile route', session);
  const email = session?.user?.email;

  const user = await User.updateOne({ email }, { name: body.name });

  return Response.json(user);
}

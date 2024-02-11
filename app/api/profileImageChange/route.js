import mongoose from 'mongoose';
import { User } from './../models/User';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function PUT(req) {
  console.log('send');

  const data = await req?.json();
  console.log('this is data from profileImageChange: ', data);
  await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI);
  const session = await getServerSession(authOptions);
  console.log('this is session from profileImageChange route', session);
  const email = session?.user?.email;
  const user = await User.updateOne({ email }, { image: data.image });
  return Response.json('user');
}

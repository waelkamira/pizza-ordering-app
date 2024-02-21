import mongoose from 'mongoose';
import { User } from './../models/User';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { UserInfo } from './../models/UserInfo';

export async function PUT(req) {
  await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI);
  const { _id, email, name, image, ...otherUserInfo } = await req.json();

  let filter = {};
  if (_id) {
    filter = { _id };
  }

  if (email) {
    filter = { email };
  }
  console.log('this is image from profile route:', image, 'filter', filter);
  const user = await User.updateOne(filter, { name, image });
  const userInfo = await UserInfo.updateOne(filter, otherUserInfo);
  return Response.json({ ...user, ...userInfo });
}

export async function GET() {
  await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI);
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  const user = await User?.findOne({ email }).lean();
  const userInfo = await UserInfo?.findOne({ email }).lean();
  return Response.json({ ...user, ...userInfo });
}

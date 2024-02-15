import mongoose from 'mongoose';
import { User } from './../models/User';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { UserInfo } from './../models/UserInfo';

export async function PUT(req) {
  await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI);
  const body = await req.json();
  const { name, image, ...otherUserInfo } = body;
  console.log(otherUserInfo);
  const session = await getServerSession(authOptions);
  console.log('this is session from profile route', session);

  const email = session?.user?.email;
  const user = await User.updateOne({ email }, { name, image });
  const userInfo = await UserInfo.updateOne({ email }, otherUserInfo);

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

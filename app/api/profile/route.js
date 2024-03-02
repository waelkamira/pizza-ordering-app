import mongoose from 'mongoose';
import { User } from './../models/User';
import { getServerSession } from 'next-auth';
import { isAdmin } from '../auth/[...nextauth]/route';
import { UserInfo } from './../models/UserInfo';
import { authOptions } from '../authOptions/route';
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
  const user = await User.updateOne(filter, { name, image });
  const userInfo = await UserInfo.updateOne(filter, otherUserInfo);

  if (await isAdmin()) {
    return Response.json({ ...user, ...userInfo });
  } else {
    return Response.json({});
  }
}

export async function GET() {
  await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI);
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  const user = await User?.findOne({ email }).lean();
  const userInfo = await UserInfo?.findOne({ email }).lean();
  return Response.json({ ...user, ...userInfo });
}

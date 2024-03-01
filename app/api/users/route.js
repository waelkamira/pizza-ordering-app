import mongoose from 'mongoose';
import { User } from './../models/User';
import { UserInfo } from './../models/UserInfo';
import { isAdmin } from '../auth/[...nextauth]/route';

export async function GET() {
  await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI);

  const users = await User.find();
  const usersInfo = await UserInfo.find();
  const arr = [...users, ...usersInfo];
  console.log('arr: ', arr);

  if (await isAdmin()) {
    return Response.json(arr);
  } else {
    return Response.json([]);
  }
}

export async function PUT(req) {
  await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI);
  const { image } = await req.json();
  return Response.json('');
}

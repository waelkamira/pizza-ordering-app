import mongoose from 'mongoose';
import { User } from './../models/User';
import { UserInfo } from './../models/UserInfo';

export async function GET() {
  await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI);

  const users = await User.find();
  const usersInfo = await UserInfo.find();
  const arr = [...users, ...usersInfo];
  console.log('arr: ', arr);
  return Response.json(arr);
}

export async function PUT(req) {
  await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI);
  const { image } = await req.json();
  // const user = await User.find({image},)
  return Response.json('');
}

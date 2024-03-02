import mongoose from 'mongoose';
import { User } from '../models/User';
import bcrypt from 'bcryptjs';
import { UserInfo } from '../models/UserInfo';

export async function POST(req) {
  const body = await req.json();
  const { name, email, password, image, ...otherUserInfo } = body;

  //? connect to mongodb
  await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI);

  //? hash password
  const hashedPassword = await bcrypt.hash(body.password, 10);

  //! create new user

  const createdUser = await User.create({
    name,
    email,
    image,
    password: hashedPassword,
  });

  const createdUserInfo = await UserInfo.create({ email, ...otherUserInfo });

  return Response.json({ ...createdUser, ...createdUserInfo });
}

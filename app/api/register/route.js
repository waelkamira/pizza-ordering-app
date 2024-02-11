import mongoose from 'mongoose';
import { User } from '../models/User';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  const body = await req.json();
  try {
    //? connect to mongodb
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI);

    console.log('Connected To Mongodb');

    //? hash password
    const hashedPassword = await bcrypt.hash(body.password, 10);
    //! create new user
    const createdUser = await User.create({
      ...body,
      password: hashedPassword,
    });
    return Response.json(createdUser);
  } catch (error) {
    console.log('failed To Connect To Mongodb', error);
  }
}

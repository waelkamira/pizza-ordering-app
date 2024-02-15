import mongoose from 'mongoose';
import { MenuItem } from '../models/Menu-Items';

export async function POST(req) {
  await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI);
  console.log('connected to mongodb');
  const body = await req.json();
  console.log('this is body :', body);
  const item = await MenuItem.create({ ...body });
  console.log('item created successfully');
  return Response.json(item);
}

export async function GET() {
  await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI);
  const menuItems = await MenuItem.find();
  return Response.json(menuItems);
}

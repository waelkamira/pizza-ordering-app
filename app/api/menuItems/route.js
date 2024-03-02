import mongoose from 'mongoose';
import { MenuItem } from '../models/MenuItems';
import { isAdmin } from '../auth/[...nextauth]/route';
export async function POST(req) {
  await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI);
  const body = await req.json();

  if (await isAdmin()) {
    const item = await MenuItem.create({ ...body });
    return Response.json(item);
  }
}

export async function PUT(req) {
  await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI);
  const { _id, ...data } = await req.json();

  if (await isAdmin()) {
    const item = await MenuItem.findByIdAndUpdate(_id, data);
    return Response.json(item);
  }
}

export async function GET() {
  await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI);
  const menuItems = await MenuItem.find();
  return Response.json(menuItems);
}

export async function DELETE(req) {
  await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI);
  const { _id } = await req.json();

  if (await isAdmin()) {
    await MenuItem.findByIdAndDelete({ _id });
    return Response.json('Deleted');
  }
}

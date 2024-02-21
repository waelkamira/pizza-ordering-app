import mongoose from 'mongoose';
import { MenuItem } from '../models/menuItems';

export async function POST(req) {
  await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI);
  console.log('connected to mongodb');
  const body = await req.json();
  console.log('this is body :', body);
  const item = await MenuItem.create({ ...body });
  console.log('item created successfully');
  return Response.json(item);
}
export async function PUT(req) {
  await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI);
  console.log('connected to mongodb');
  const { _id, ...data } = await req.json();
  console.log(
    'this is image from menuItems route:',
    data.image,
    '_id',
    _id,
    data
  );

  const item = await MenuItem.findByIdAndUpdate(_id, data);
  console.log('item created successfully');
  return Response.json(item);
}

export async function GET() {
  await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI);
  const menuItems = await MenuItem.find();
  return Response.json(menuItems);
}

export async function DELETE(req) {
  await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI);
  const { _id } = await req.json();
  console.log(_id);
  await MenuItem.findByIdAndDelete({ _id });
  return Response.json('Deleted');
}

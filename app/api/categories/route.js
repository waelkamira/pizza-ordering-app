import { isAdmin } from '../auth/[...nextauth]/route';
import { Category } from '../models/Category';
import mongoose from 'mongoose';

export async function POST(req) {
  await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI);
  const { name } = await req.json();

  if (await isAdmin()) {
    const categoryDoc = await Category.create({ name });
    return Response.json(categoryDoc);
  }
}

export async function GET() {
  await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI);

  const categories = await Category.find();
  return Response.json(categories);
}

export async function PUT(req) {
  await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI);
  const { _id, name } = await req.json();

  if (await isAdmin()) {
    const editedCategory = await Category.updateOne({ _id }, { name });
    return Response.json(editedCategory);
  }
}

export async function DELETE(req) {
  await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI);
  const { _id } = await req.json();

  if (await isAdmin()) {
    await Category.findByIdAndDelete({ _id });
  }

  return Response.json('ok');
}

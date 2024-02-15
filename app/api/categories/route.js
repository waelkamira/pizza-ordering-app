import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { Category } from '../models/Category';

export async function POST(req) {
  await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI);
  const { name } = await req.json();
  const categoryDoc = await Category.create({ name });
  return Response.json(categoryDoc);
}

export async function GET() {
  await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI);
  const categories = await Category.find();
  return Response.json(categories);
}

export async function PUT(req) {
  await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI);
  const { _id, name } = await req.json();
  const editedCategory = await Category.updateOne({ _id }, { name });
  return Response.json(editedCategory);
}

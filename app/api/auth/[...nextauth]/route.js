import NextAuth, { getServerSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { User } from '../../models/User';
import { UserInfo } from '../../models/UserInfo';

// import { MongoDBAdapter } from '@auth/mongodb-adapter';
// import clientPromise from '../../../../lip/mongodb';

export const authOptions = {
  secret: process.env.NEXT_PUBLIC_SECRET,

  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    }),

    CredentialsProvider({
      async authorize(credentials, req) {
        const email = credentials?.email;
        const password = credentials?.password;

        await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI);
        const user = await User.findOne({ email });
        const passwordOk =
          user && (await bcrypt.compare(password, user.password));

        if (passwordOk) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
};

export async function isAdmin() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  if (!email) {
    return false;
  }

  const userInfo = await UserInfo.findOne({ email });
  if (!userInfo?.admin) {
    return false;
  }

  return userInfo?.admin;
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

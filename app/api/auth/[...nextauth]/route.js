import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { User } from '../../models/User';

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
          // console.log('this is use from auth route page', user);

          return user;
        } else {
          return null;
        }
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

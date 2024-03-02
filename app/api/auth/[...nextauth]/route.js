import NextAuth, { getServerSession } from 'next-auth';
import { authOptions } from '../../authOptions/route';
import { UserInfo } from '../../models/UserInfo';

// import { MongoDBAdapter } from '@auth/mongodb-adapter';
// import clientPromise from '../../../../lip/mongodb';

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

'use client';

import { usePathname } from 'next/navigation';
import UserTabs from '../../components/layout/UserTabs';
import UseProfile from '../../components/UseProfile';

export default function UsersPage() {
  const { data, loading } = UseProfile();
  console.log(data.admin);

  if (!data?.admin) {
    return 'Not an Admin';
  }

  if (loading) {
    return 'Loading .User Info ..';
  }
  const path = usePathname();
  // console.log(path);

  return (
    <section className="mt-8">
      <UserTabs isAdmin={data.admin} />
    </section>
  );
}

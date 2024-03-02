'use client';

import UserTabs from '../../components/layout/UserTabs';
import UseProfile from '../../components/UseProfile';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const { data, loading } = UseProfile();

  useEffect(() => {
    fetchAllUsers();
  }, []);

  //! this function to fetch all users from mongodb
  const fetchAllUsers = async () => {
    await fetch('/api/users').then((res) =>
      res.json().then((res) => {
        setUsers(res);
      })
    );
  };

  if (!data?.admin) {
    return 'Not an Admin';
  }

  if (loading) {
    return 'Loading User Info ...';
  }

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={data.admin} />
      <div className="mt-8">
        {users?.map((user, index) => {
          if (user.name && user.email) {
            return (
              <div
                key={user._id}
                className="flex flex-col items-center sm:flex-row bg-gray-500 mb-2 p-2 rounded-lg text-white justify-around"
              >
                <div className="flex flex-col mt-2 sm:mt-0 sm:flex-row sm:gap-16 w-full justify-center items-center">
                  <h1 className="italic uppercase hover:underline">
                    {user?.name}
                  </h1>

                  <div className=" bg-emerald-400  transform -skew-x-12 py-2 px-8 mx-16 rounded-lg">
                    <h1 className="transform skew-x-12">{user?.email}</h1>
                  </div>
                </div>
                <Link href={`/users/${user._id}`}>
                  <button className="mr-4 w-24 text-white hover:bg-primary">
                    Edit
                  </button>
                </Link>
              </div>
            );
          }
        })}
      </div>
    </section>
  );
}

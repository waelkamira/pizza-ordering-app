'use client';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import UserTabs from './../../components/layout/UserTabs';
import UserForm from '../../components/layout/UserForm';

export default function ProfilePage() {
  const session = useSession();
  const { status, data } = session;
  const [isAdmin, setIsAdmin] = useState(false);
  const [fetchedProfile, setFetchedProfile] = useState(false);
  const [formStates, setFormStates] = useState({
    image: '',
    name: '',
    phoneNumber: '',
    streetAddress: '',
    postalCode: '',
    city: '',
    country: '',
  });

  useEffect(() => {
    if (status === 'authenticated') {
      fetchData();
    }
  }, [session]);

  //! this function to fetch data from mongodb
  const fetchData = async () =>
    fetch('/api/profile').then((res) =>
      res.json().then((res) => {
        setIsAdmin(res?.admin);
        setFetchedProfile(true);
        setFormStates(res);
      })
    );

  //! this function for changing user info
  function handleProfileInfoUpdate(e) {
    e.preventDefault();
    const promise = new Promise(async (resolve, reject) => {
      const res = async () => {
        await fetch('/api/profile', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formStates.name,
            phoneNumber: formStates.phoneNumber,
            streetAddress: formStates.streetAddress,
            postalCode: formStates.postalCode,
            city: formStates.city,
            country: formStates.country,
            email: formStates.email,
            admin: formStates.admin,
          }),
        });
      };

      if (res) {
        resolve();
      } else {
        reject();
      }
      res();
    });

    toast.promise(promise, {
      loading: 'Updating ...',
      success: 'Uploaded',
      error: 'Sorry Something Went Wrong',
    });
  }

  if (status === 'loading' || !fetchedProfile) {
    return 'loading ...';
  }

  if (status === 'unauthenticated') {
    return redirect('/login');
  }

  return (
    <section className="mt-8 flex flex-col justify-center items-center">
      <UserTabs isAdmin={isAdmin} />

      <div className="max-w-xl border rounded-lg p-4 mt-8">
        <UserForm
          routeProp={'profile'}
          props={formStates}
          setProps={setFormStates}
          handleProfileInfoUpdate={handleProfileInfoUpdate}
        />
      </div>
    </section>
  );
}

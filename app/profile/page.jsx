'use client';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { CldImage } from 'next-cloudinary';
import axios from 'axios';
import toast from 'react-hot-toast';
import { right } from '@cloudinary/url-gen/qualifiers/textAlignment';
import Link from 'next/link';
import UserTabs from './../../components/layout/UserTabs';
import EditableImage from '../../components/layout/EditableImage';

export default function ProfilePage() {
  const session = useSession();
  const { status, data } = session;
  const [imageData, setImageData] = useState(' ');
  const [isAdmin, setIsAdmin] = useState(false);
  const [fetchedProfile, setFetchedProfile] = useState(false);
  const [formStates, setFormStates] = useState({
    image: '',
    name: '',
    phoneNumber: '',
    streetAddress: '',
    postalCod: '',
    city: '',
    country: '',
  });

  useEffect(() => {
    // console.log('useEffect');
    if (status === 'authenticated') {
      fetchData();
    }
  }, [session]);

  //! this function to fetch data from mongodb
  const fetchData = async () =>
    fetch('/api/profile').then((res) =>
      res.json().then((res) => {
        // console.log('this res from useEffect:', res);
        setIsAdmin(res?.admin);
        setFetchedProfile(true);
        setFormStates({
          image: res.image,
          name: res.name,
          phoneNumber: res.phoneNumber,
          streetAddress: res.streetAddress,
          postalCod: res.postalCod,
          city: res.city,
          country: res.country,
        });
      })
    );

  //! this function for changing user name
  function handleProfileInfoUpdate(e) {
    e.preventDefault();

    const res = async () => {
      toast('Saving ...', { duration: 300 });

      await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formStates.name,
          phoneNumber: formStates.phoneNumber,
          streetAddress: formStates.streetAddress,
          postalCod: formStates.postalCod,
          city: formStates.city,
          country: formStates.country,
        }),
      });
      toast.success('Successfully Saved!', { duration: 5000 });
    };
    res();
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
        <div className="flex gap-4 items-start justify-center p-4 rounded-lg">
          <EditableImage routeName={'profile'} />
          <form
            className="grow flex flex-col justify-center items-center"
            onSubmit={handleProfileInfoUpdate}
          >
            <label htmlFor="input" className="text-start w-full">
              First And Last Name:
            </label>
            <input
              type="text"
              value={formStates.name}
              onChange={(e) =>
                setFormStates({ ...formStates, name: e.target.value })
              }
              placeholder="Your Name"
            />
            <label htmlFor="input" className="text-start w-full">
              Email:
            </label>
            <input type="text" disabled value={session?.data?.user?.email} />
            <label htmlFor="input" className="text-start w-full">
              Phone Number:
            </label>
            <input
              type="number"
              value={formStates.phoneNumber}
              placeholder="Phone Number"
              onChange={(e) =>
                setFormStates({ ...formStates, phoneNumber: e.target.value })
              }
            />
            <label htmlFor="input" className="text-start w-full">
              Street Address:
            </label>
            <input
              type="text"
              value={formStates.streetAddress}
              placeholder="Street Address"
              onChange={(e) =>
                setFormStates({ ...formStates, streetAddress: e.target.value })
              }
            />

            <div className=" flex justify-center items-center gap-4  m-0 px-0">
              <div>
                <label htmlFor="input" className="text-start w-full">
                  Postal Cod:
                </label>
                <input
                  style={{ marginLeft: 0 }}
                  type="number"
                  value={formStates.postalCod}
                  placeholder="Postal Cod"
                  onChange={(e) =>
                    setFormStates({ ...formStates, postalCod: e.target.value })
                  }
                />
              </div>
              <div>
                <label htmlFor="input" className="text-start w-full">
                  City:
                </label>
                <input
                  style={{ marginRight: 0 }}
                  type="text"
                  value={formStates.city}
                  placeholder="City"
                  onChange={(e) =>
                    setFormStates({ ...formStates, city: e.target.value })
                  }
                />
              </div>
            </div>
            <label htmlFor="input" className="text-start w-full">
              Country:
            </label>
            <input
              type="text"
              value={formStates.country}
              placeholder="Country"
              onChange={(e) =>
                setFormStates({ ...formStates, country: e.target.value })
              }
            />
            <button className="bg-primary text-white m-1" type="submit">
              Save
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

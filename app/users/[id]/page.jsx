'use client';
import UseProfile from './../../../components/UseProfile';
import UserTabs from '../../../components/layout/UserTabs';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import UserForm from '../../../components/layout/UserForm';
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';
export default function EditUserPage() {
  const { id } = useParams();
  const { loading, data } = UseProfile();
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
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    await fetch('/api/users').then((res) =>
      res.json().then((res) => {
        const findUser = res.find((u) => u._id === id);
        let findUserInfo = res.filter((i) => i.email == findUser.email);
        const user = { ...findUser, ...findUserInfo[1] };
        setFormStates(user);
      })
    );
  };

  function handleProfileInfoUpdate(e) {
    e.preventDefault();
    const promise = new Promise(async (resolve, reject) => {
      const res = async () => {
        await fetch('/api/profile', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formStates?.name,
            phoneNumber: formStates?.phoneNumber,
            streetAddress: formStates?.streetAddress,
            postalCode: formStates?.postalCode,
            city: formStates?.city,
            country: formStates?.country,
            email: formStates?.email,
            image: formStates?.image,
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
      loading: 'Saving ...',
      success: 'Successfully Saved!',
      error: 'Sorry Something Went Wrong',
    });
  }
  if (loading) {
    return 'Loading ...';
  }

  if (!data?.admin) {
    return 'you Are Not An Admin';
  }

  return (
    <section className="max-w-xl mx-auto mt-8">
      <UserTabs isAdmin={data?.admin} />
      <UserForm
        routeProp={'profile'}
        props={formStates}
        setProps={setFormStates}
        handleProfileInfoUpdate={handleProfileInfoUpdate}
      />
    </section>
  );
}

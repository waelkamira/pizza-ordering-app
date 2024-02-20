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
  // console.log(path);
  const { loading, data } = UseProfile();
  const session = useSession();

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
    fetchAllUsers();
  }, []);

  // console.log(formStates);
  const fetchAllUsers = async () => {
    await fetch('/api/users').then((res) =>
      res.json().then((res) => {
        // console.log('this is res"', res);
        const findUser = res.find((u) => u._id === id);
        let findUserInfo = res.filter((i) => i.email == findUser.email);
        const user = { ...findUser, ...findUserInfo[1] };
        console.log('this is user"', user);
        setFormStates(user);
      })
    );
  };

  function handleProfileInfoUpdate(e) {
    e.preventDefault();

    const res = async () => {
      toast('Saving ...', { duration: 300 });

      await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formStates?.name,
          phoneNumber: formStates?.phoneNumber,
          streetAddress: formStates?.streetAddress,
          postalCod: formStates?.postalCod,
          city: formStates?.city,
          country: formStates?.country,
          email: formStates?.email,
          image: formStates?.image,
        }),
      });
      toast.success('Successfully Saved!', { duration: 5000 });
    };
    res();
  }
  if (loading) {
    return 'Loading ...';
  }

  if (!data?.admin) {
    return 'you Are Not An Admin';
  }
  console.log('props from users', formStates.image);
  return (
    <section className="max-w-xl mx-auto mt-8">
      <UserTabs isAdmin={data?.admin} />
      <UserForm
        props={formStates}
        setProps={setFormStates}
        routeName={'profile'}
        handleProfileInfoUpdate={handleProfileInfoUpdate}
      />
    </section>
  );
}

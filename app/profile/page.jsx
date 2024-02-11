'use client';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { CldImage } from 'next-cloudinary';
import axios from 'axios';

export default function ProfilePage() {
  const session = useSession();
  // console.log('session in profile page', session);
  const [userName, setUserName] = useState(session?.data?.user?.name || '');
  const { status, data } = session;
  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const userImage = session?.data?.user?.image;
  const [imageData, setImageData] = useState(' ');
  const name = session?.data?.user?.name;
  // localStorage.setItem('userName', name);

  useEffect(() => {
    console.log('usrEffect');
    if (status === 'authenticated') {
      setUserName(localStorage.getItem('userName'));
      setImageData(localStorage.getItem('imageData'));
    }
  }, [session, imageData]);

  //! this function for changing user name
  async function handleProfileInfoUpdate(e) {
    e.preventDefault();
    localStorage.setItem('userName', userName);
    setIsSaving(true);
    const res = await fetch('/api/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: userName }),
    });
    setIsSaving(false);
    if (res.ok) {
      setSaved(true);
    }
  }

  if (status === 'loading') {
    return 'loading ...';
  }

  if (status === 'unauthenticated') {
    return redirect('/login');
  }

  //! this function for changing profile's image
  async function handleFileChange(e) {
    const files = e.target.files;
    const formData = new FormData();
    formData.set('file', files[0]);
    formData.set('upload_preset', 'dq8dx63w');

    const imagePost = async () => {
      try {
        const response = await axios
          //! this function for upload image to cloudinary server
          .post('https://api.cloudinary.com/v1_1/dh2xlutfu/upload', formData)
          .then((res) => {
            console.log('this is res', res);

            //! this function for sending changed image to mongodb
            async function sendChangedImage() {
              const imagePublic_id = res?.data?.public_id;
              console.log('this is imagePublic_id: ', imagePublic_id);
              await fetch('/api/profileImageChange', {
                method: 'PUT',
                body: JSON.stringify({ image: imagePublic_id }),
                headers: { 'Content-Type': 'application/json' },
              });

              localStorage.setItem('imageData', imagePublic_id);
              setImageData(imagePublic_id);
            }
            sendChangedImage();
          });
      } catch (error) {
        console.log(error);
      }
    };
    imagePost();
  }

  return (
    <section className="mt-8 flex flex-col justify-center items-center">
      <h1 className="text-center text-primary text-4xl mb-4">Profile</h1>

      <div className="max-w-lg border rounded-lg p-4 ">
        {saved && (
          <h1 className="text-center bg-green-200 p-4 rounded-lg border border-green-300">
            Profile Saved!
          </h1>
        )}
        {isSaving && (
          <h1 className="text-center bg-blue-200 p-4 rounded-lg border border-blue-300">
            Saving!
          </h1>
        )}
        <div className="flex gap-2 items-center justify-center bg-gray-500 p-4 rounded-lg">
          <div className="border border-orange-300 py-3 px-3 rounded-lg ">
            <div className="relative h-28 w-full">
              <CldImage
                src={`/${imageData || userImage}`}
                alt="avatar"
                width={100}
                height={100}
                sizes="100vw"
              ></CldImage>
            </div>

            <label className="mx-6">
              <input
                className="hidden"
                type="file"
                onChange={handleFileChange}
              />
              <span className="text-[15px] bg-primary cursor-pointer border border-gray-400 text-white px-4 py-1 rounded-lg">
                Edit
              </span>
            </label>
          </div>

          <form
            className="grow flex flex-col"
            onSubmit={handleProfileInfoUpdate}
          >
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="First And Last Name"
            />
            <input type="text" disabled value={session?.data?.user?.email} />
            <button className="bg-primary text-white m-0">Save</button>
          </form>
        </div>
      </div>
    </section>
  );
}

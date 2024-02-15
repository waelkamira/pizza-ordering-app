'use client';

import UserTabs from '../../../components/layout/UserTabs';
import UseProfile from '../../../components/UseProfile';
import React, { useEffect, useState } from 'react';
import { CldImage } from 'next-cloudinary';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Left from '../../../components/icons/Left';

export default function NewMenuItemsPage() {
  const session = useSession();
  const [isAdmin, setIsAdmin] = useState(false);
  const { data, loading } = UseProfile();
  const [itemDataStates, setItemDataState] = useState({
    image: '',
    itemName: '',
    description: '',
    basePrice: '',
  });

  useEffect(() => {
    fetchData();
  }, [session]);

  //! this function to fetch data from mongodb
  const fetchData = async () =>
    fetch('/api/menu-items').then((res) =>
      res.json().then((res) => {
        setItemDataState({
          image: res?.image,
        });
      })
    );

  if (loading) {
    return 'Loading User Info ..';
  }

  if (!data?.admin) {
    return 'Not an Admin';
  }

  //! upload image to cloudinary

  async function handleFormSubmit(e) {
    e.preventDefault();

    try {
      //! this function for upload image to cloudinary server
      toast('Uploading ...', {
        duration: 1000,
      });

      console.log('this is image : ', itemDataStates.image);
      //! this function for sending changed image to mongodb
      async function sendMenuItemInfo() {
        await fetch(`/api/menu-items`, {
          method: 'POST',
          body: JSON.stringify({
            image: itemDataStates.image,
            itemName: itemDataStates.itemName,
            description: itemDataStates.description,
            basePrice: itemDataStates.basePrice,
          }),
          headers: { 'Content-Type': 'application/json' },
        });
      }

      async function functions() {
        await sendMenuItemInfo();
        fetchData();
        toast.success('Successfully Uploaded!', {
          duration: 3000,
        });
      }

      functions();
      //   setItemDataState({
      //     image: '',
      //     itemName: '',
      //     description: '',
      //     basePrice: '',
      //   });
    } catch (error) {
      console.log(error);
    }
  }

  //! this function for upload image to cloudinary server
  async function handleImage(e) {
    const files = e.target.files;
    const formData = new FormData();
    formData.set('file', files[0]);
    formData.set('upload_preset', 'dq8dx63w');

    const response = await axios
      .post('https://api.cloudinary.com/v1_1/dh2xlutfu/upload', formData)
      .then((res) => {
        const imagePublic_id = res?.data?.public_id;
        console.log('this is imagePublic_id: ', imagePublic_id);
        setItemDataState({ ...itemDataStates, image: imagePublic_id });
      });
  }

  return (
    <section className="mt-8">
      <UserTabs isAdmin={true} />
      <form className="mt-8 max-w-md mx-auto" onSubmit={handleFormSubmit}>
        <div className="mt-8">
          <Link
            className="button flex justify-center gap-2"
            href={'/menu-items'}
          >
            <Left />
            Show All Menu Items
          </Link>
        </div>
        <div className="flex items-start gap-4 mt-8">
          <div className="flex flex-col py-3 px-3  bg-gray-500 rounded-lg ">
            <div className="flex justify-center items-center mb-2 border border-orange-300 rounded-lg  p-2">
              {itemDataStates.image ? (
                <CldImage
                  src={`/${itemDataStates?.image}`}
                  alt={'avatar'}
                  width={100}
                  height={100}
                  sizes="100vw"
                  priority
                  className="h-[80px] w-[80px] object-cover object-bottom  rounded-lg"
                ></CldImage>
              ) : (
                <h1>No Image</h1>
              )}
            </div>

            <label className="mx-6">
              <input
                className="hidden"
                type="file"
                onChange={(e) => handleImage(e)}
              />
              <div className="flex flex-col justify-center items-center">
                <span className="text-lg bg-primary cursor-pointer border border-gray-400 text-white rounded-lg py-1 px-4">
                  Edit
                </span>
              </div>
            </label>
          </div>
          <div className="grow">
            <label htmlFor="">Item Name</label>
            <input
              value={itemDataStates.itemName}
              onChange={(e) =>
                setItemDataState({
                  ...itemDataStates,
                  itemName: e.target.value,
                })
              }
              required
              type="text"
              name=""
              id=""
            />
            <label htmlFor="">Description</label>
            <input
              value={itemDataStates.description}
              onChange={(e) =>
                setItemDataState({
                  ...itemDataStates,
                  description: e.target.value,
                })
              }
              required
              type="text"
              name=""
              id=""
            />
            <label htmlFor="">Base Price</label>
            <input
              value={itemDataStates.basePrice}
              onChange={(e) =>
                setItemDataState({
                  ...itemDataStates,
                  basePrice: e.target.value,
                })
              }
              required
              type="text"
              name=""
              id=""
            />
            <button type="submit">Save</button>
          </div>
        </div>
      </form>
    </section>
  );
}

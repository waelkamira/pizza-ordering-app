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
import { useRouter } from 'next/navigation';
import AddItemProps from '../../../components/layout/AddItemProps';

export default function NewMenuItemsPage() {
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [sizes, setSizes] = useState([]);
  const router = useRouter();
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
    fetchCategories();
  }, [session]);

  //? this function to fetch categories from mongodb
  const fetchCategories = async () =>
    await fetch('/api/categories').then((res) =>
      res.json().then((res) => {
        console.log(res);
        setCategories(res);
      })
    );

  //! this function to fetch data from mongodb to display image to user
  const fetchData = async () =>
    fetch('/api/menuItems').then((res) =>
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

  //! this function for sending changed image and item data to mongodb
  async function handleFormSubmit(e) {
    e.preventDefault();
    try {
      console.log('this is image : ', itemDataStates.image);
      async function sendMenuItemInfo() {
        const creationPromise = new Promise(async (resolve, reject) => {
          const res = await fetch(`/api/menuItems`, {
            method: 'POST',
            body: JSON.stringify({
              image: itemDataStates?.image,
              itemName: itemDataStates?.itemName,
              description: itemDataStates?.description,
              basePrice: itemDataStates?.basePrice,
              sizes: sizes,
              ingredients: ingredients,
              category: category,
            }),
            headers: { 'Content-Type': 'application/json' },
          });

          if (
            itemDataStates?.image &&
            itemDataStates?.itemName &&
            itemDataStates?.description &&
            itemDataStates?.basePrice
          ) {
            resolve();

            setItemDataState({
              image: '',
              itemName: '',
              description: '',
              basePrice: '',
            });

            router.push('/menuItems');
          } else {
            reject();
          }
        });

        await toast.promise(creationPromise, {
          loading: 'Uploading',
          success: 'Menu Item Uploaded Successfully',
          error: 'Image And Other Fields Are Required',
        });
      }

      async function functions() {
        await sendMenuItemInfo();
        // fetchData();
      }

      functions();
    } catch (error) {
      console.log(error);
    }
  }

  //! this function for upload image to cloudinary server
  async function handleImage(e) {
    const creationPromise = new Promise(async (resolve, reject) => {
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
          if (imagePublic_id) {
            resolve();
          } else {
            reject();
            return;
          }
        });
    });

    await toast.promise(creationPromise, {
      loading: 'Uploading Image',
      success: 'Image is Uploaded',
      error: 'Image Did Not Upload',
    });
  }

  return (
    <section className="mt-8">
      <UserTabs isAdmin={data.admin} />
      <form className="mt-8 max-w-lg mx-auto" onSubmit={handleFormSubmit}>
        <div className="mt-8">
          <Link
            className="flex justify-center gap-2 border border-gray-400 p-2 rounded-lg font-semibold"
            href={'/menuItems'}
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
            <label>Item Name</label>
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
            <label>Description</label>
            <input
              type="text"
              value={itemDataStates.description}
              onChange={(e) =>
                setItemDataState({
                  ...itemDataStates,
                  description: e.target.value,
                })
              }
              required
              name=""
              id=""
            />
            <div>
              <h1 className="">Select Category</h1>
              <select
                name=""
                id=""
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories?.map((category, index) => {
                  return (
                    <option
                      key={index}
                      value={category.name}
                      className="rounded-ld bg-gray-500 hover:bg-primary"
                    >
                      {category.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <label>Base Price</label>
            <input
              value={itemDataStates.basePrice}
              onChange={(e) =>
                setItemDataState({
                  ...itemDataStates,
                  basePrice: e.target.value,
                })
              }
              required
              type="number"
              name=""
              id=""
            />
            <AddItemProps
              name={'Sizes:'}
              label={'Add Item Size:'}
              props={sizes}
              setProps={setSizes}
            />
            <div className="mt-4">
              <AddItemProps
                name={'ingredients:'}
                label={'Add Extra Ingredients'}
                props={ingredients}
                setProps={setIngredients}
              />
            </div>

            <button type="submit">Save</button>
          </div>
        </div>
      </form>
    </section>
  );
}

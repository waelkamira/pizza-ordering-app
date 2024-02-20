'use client';

import UserTabs from '../../../../components/layout/UserTabs';
import UseProfile from '../../../../components/UseProfile';
import React, { useEffect, useState } from 'react';
import { CldImage } from 'next-cloudinary';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Left from '../../../../components/icons/Left';
import { useParams, useRouter } from 'next/navigation';
import AddItemProps from '../../../../components/layout/AddItemProps';
import ConfirmDelete from '../../../../components/layout/ConfirmDelete';

export default function EditMenuItemsPage() {
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [integrediants, setIntegrediants] = useState([]);
  const router = useRouter();
  const { id } = useParams();
  const session = useSession();
  const [isAdmin, setIsAdmin] = useState(false);
  const { data, loading } = UseProfile();
  const [itemDataStates, setItemDataState] = useState({
    image: '',
    itemName: '',
    description: '',
    basePrice: '',
    _id: '',
    category: '',
  });

  useEffect(() => {
    fetchData();
    fetchCategories();
  }, []);

  //? this function to fetch categories from mongodb
  const fetchCategories = async () =>
    await fetch('/api/categories').then((res) =>
      res.json().then((res) => {
        console.log(res);
        setCategories(res);
      })
    );

  //? this function to fetch data from mongodb
  const fetchData = async () =>
    await fetch('/api/menuItems').then((res) =>
      res.json().then((res) => {
        // console.log('this is res: ', res);
        const result = res.filter((item) => item._id === id);
        // console.log('this is result: ', result);
        setItemDataState({
          image: result[0]?.image,
          itemName: result[0]?.itemName,
          description: result[0]?.description,
          basePrice: result[0]?.basePrice,
          sizes: result[0]?.sizes,
          integrediants: result[0]?.integrediants,
          _id: result[0]?._id,
          category: result[0]?.category,
        });
      })
    );

  if (loading) {
    return 'Loading User Info ..';
  }

  if (!data?.admin) {
    return 'Not an Admin';
  }

  async function handleFormSubmit(e) {
    e.preventDefault();

    try {
      const creationPromise = new Promise(async (resolve, reject) => {
        // console.log('this is image : ', itemDataStates.image);
        //! this function for sending changed image to mongodb
        async function sendMenuItemInfo() {
          const response = await fetch(`/api/menuItems`, {
            method: 'Put',
            body: JSON.stringify({
              image: itemDataStates.image,
              itemName: itemDataStates.itemName,
              description: itemDataStates.description,
              basePrice: itemDataStates.basePrice,
              sizes: sizes,
              integrediants: integrediants,
              category: itemDataStates.category,
              _id: id,
            }),
            headers: { 'Content-Type': 'application/json' },
          });

          if (response.ok) {
            resolve();
            fetchData();
          } else {
            reject();
          }
        }
        async function functions() {
          await sendMenuItemInfo();
          fetchData();
        }
        functions();
      });

      await toast.promise(creationPromise, {
        loading: 'Updating Menu Item',
        success: 'Menu Item Updated',
        error: 'Error Sorry ...!',
      });
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

  function DeleteMenuItem(menuItem) {
    console.log(menuItem);
    const creationPromise = new Promise(async (resolve, reject) => {
      const response = await fetch('/api/menuItems', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(menuItem),
      });
      if (response.ok) {
        resolve();
        router.push('/menuItems');
      } else {
        reject();
      }
    });

    toast.promise(creationPromise, {
      loading: 'Deleting ...',
      success: 'Menu Item Deleted',
      error: 'Sorry Something Went Wrong',
    });
  }
  return (
    <section className="mt-8">
      <UserTabs isAdmin={data.admin} />
      <form className="mt-8 max-w-md mx-auto" onSubmit={handleFormSubmit}>
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
              <div className="flex justify-between text-center gap-2">
                <div className="left-0 grow flex flex-col justify-start w-full ">
                  <label className="mb-3 text-left">Select Category</label>
                  <select
                    name=""
                    id=""
                    onChange={(e) =>
                      setItemDataState({
                        ...itemDataStates,
                        category: e.target.value,
                      })
                    }
                  >
                    {categories?.map((cate, index) => {
                      return (
                        <option
                          key={index}
                          value={cate.name}
                          className="rounded-ld bg-gray-500 hover:bg-primary"
                        >
                          {cate.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div>
                  <label className="text-nowrap">Current Category</label>
                  <button disabled type="button">
                    {itemDataStates.category}
                  </button>
                </div>
              </div>
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
              type="text"
              name=""
              id=""
            />
            <AddItemProps
              name={'Sizes:'}
              label={'Add Item Size:'}
              props={itemDataStates.sizes}
              setProps={setSizes}
            />

            <div className="mt-4 grow">
              {' '}
              <AddItemProps
                name={'ingredients:'}
                label={'Add Extra Ingredients'}
                props={itemDataStates.integrediants}
                setProps={setIntegrediants}
              />
            </div>
            <button type="submit" onClick={() => router.push('/menuItems')}>
              Save
            </button>

            <ConfirmDelete
              onDelete={DeleteMenuItem}
              prop={itemDataStates}
              className="bg-red-600 text-white"
            >
              Delete Menu Item
            </ConfirmDelete>
          </div>
        </div>
      </form>
    </section>
  );
}

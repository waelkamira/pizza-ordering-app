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
import EditableImage from '../../../../components/layout/EditableImage';

export default function EditMenuItemsPage() {
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [ingredients, setIngredients] = useState([]);
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
    email: '',
  });

  useEffect(() => {
    fetchData();
    fetchCategories();
  }, []);

  //? this function to fetch categories from mongodb
  const fetchCategories = async () =>
    await fetch('/api/categories').then((res) =>
      res.json().then((res) => {
        setCategories(res);
      })
    );

  //? this function to fetch menu item data from mongodb
  const fetchData = async () =>
    await fetch('/api/menuItems').then((res) =>
      res.json().then((res) => {
        const result = res.filter((item) => item._id === id);
        setItemDataState(result[0]);
        setSizes(result[0].sizes);
        setIngredients(result[0].ingredients);
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
              ingredients: ingredients,
              category: itemDataStates.category,
              email: itemDataStates.email,
              _id: itemDataStates._id,
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

  function DeleteMenuItem(menuItem) {
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
        <div className="flex flex-col items-center sm:flex-row sm:items-start gap-4 mt-8">
          <EditableImage props={itemDataStates} routeProp={'menuItems'} />

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
                    {itemDataStates.category || (
                      <h1 className="text-sm text-nowrap">No Category</h1>
                    )}
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
              props={sizes}
              setProps={setSizes}
            />

            <div className="mt-4 grow">
              <AddItemProps
                name={'ingredients:'}
                label={'Add Extra Ingredients'}
                props={ingredients}
                setProps={setIngredients}
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

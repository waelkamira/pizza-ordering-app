'use client';
import React, { useEffect, useState } from 'react';
import MenuItem from '../../components/menu/MenuItem';
import SectionHeaders from '../../components/layout/SectionHeaders';
import toast from 'react-hot-toast';

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState(false);
  useEffect(() => {
    fetchAllCategories();
    fetchAllMenuItems();
  }, []);

  //? this function to fetch all menu items
  async function fetchAllMenuItems() {
    const createPromise = new Promise(async (resolve, reject) => {
      const response = await fetch('/api/menuItems').then((res) =>
        res.json().then((res) => {
          setMenuItems(res);
          return res;
        })
      );
      if (response?.length > 0) {
        resolve();
      } else {
        reject();
      }
    });

    toast.promise(createPromise, {
      loading: 'Loading Menu Items ...',
      success: 'Done',
      error: 'Sorry Please Reload The Page',
    });
  }

  //? this function to fetch all categories
  const fetchAllCategories = async () => {
    fetch('/api/categories').then((res) =>
      res.json().then((res) => {
        setCategories(res);
      })
    );
  };

  return (
    <section className=" mt-8">
      {categories?.map((c) => (
        <div>
          <div className="text-center mt-12">
            <SectionHeaders mainHeader={c.name} />
          </div>
          {message && (
            <div className="fixed flex items-center justify-center bg-black/30 inset-0 h-screen w-screen text-center rounded-lg p-8">
              <div className=" bg-secondary p-8 rounded-lg">
                <h1 className="text-white  text-2xl">
                  You Have To Login First To Make An Order
                </h1>
              </div>
            </div>
          )}
          <div className="flex flex-col p-8 xs:grid xs:grid-cols-2 sm:grid sm:grid-cols-3 gap-4 mt-4 mb-8">
            {menuItems
              ?.filter((item) => item.category === c.name)
              .map((item) => {
                return (
                  <MenuItem
                    key={item._id}
                    menuItem={item}
                    onSetMessage={setMessage}
                  />
                );
              })}
          </div>
        </div>
      ))}
    </section>
  );
}

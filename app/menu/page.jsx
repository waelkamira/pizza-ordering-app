'use client';
import React, { useEffect, useState } from 'react';
import MenuItem from '../../components/menu/MenuItem';
import SectionHeaders from '../../components/layout/SectionHeaders';

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchAllCategories();
    fetchAllMenuItems();
  }, []);

  //? this function to fetch all menu items
  const fetchAllMenuItems = async () => {
    fetch('/api/menuItems').then((res) =>
      res.json().then((res) => {
        // console.log(res);
        setMenuItems(res);
      })
    );
  };

  //? this function to fetch all categories
  const fetchAllCategories = async () => {
    fetch('/api/categories').then((res) =>
      res.json().then((res) => {
        // console.log(res);
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
          <div className="grid grid-cols-3 gap-4 mt-4 mb-8">
            {menuItems
              ?.filter((item) => item.category === c.name)
              .map((item) => (
                <MenuItem {...item} />
              ))}
          </div>
        </div>
      ))}
    </section>
  );
}

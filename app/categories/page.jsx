'use client';
import React, { useEffect, useState } from 'react';
import UserTabs from '../../components/layout/UserTabs';
import UseProfile from '../../components/UseProfile';
import toast from 'react-hot-toast';

export default function CategoriesPage() {
  const [editedCategory, setEditedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const { data: profileData, loading: profileLoading } = UseProfile();

  useEffect(() => {
    fetchCategories();
  }, []);

  //! this function to fetch categories from Mongodb
  const fetchCategories = async () =>
    fetch('/api/categories').then((response) =>
      response.json().then((categories) => {
        // console.log(categories);
        setCategories(categories);
      })
    );

  if (profileLoading) {
    return 'Profile Loading ...';
  }

  if (!profileData) {
    return 'You Are Not The Admin';
  }

  async function handleCategorySubmit(e) {
    e.preventDefault();

    const creationPromise = new Promise(async (resolve, reject) => {
      const data = { name: categoryName };
      if (editedCategory) {
        data._id = editedCategory._id;
      }
      const response = await fetch('/api/categories', {
        method: editedCategory ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      setCategoryName('');
      setEditedCategory(null);
      fetchCategories();

      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });

    await toast.promise(creationPromise, {
      loading: editedCategory
        ? 'Editing Your Category'
        : 'Creating Your New Category ',

      success: editedCategory ? 'Category Updated' : 'Category Created ',
      error: 'Error Sorry ...!',
    });
  }

  function handleClick(e) {
    // console.log(e.target.innerHTML);
    setCategoryName(e.target.innerHTML);
  }
  return (
    <section className="mt-8 max-w-md mx-auto">
      <UserTabs isAdmin={profileData} />
      <form className="mt-8" onSubmit={handleCategorySubmit}>
        <div className="flex items-end gap-2">
          <div className="grow">
            <label htmlFor="input">
              {editedCategory ? 'Update Category:' : 'New Category Name:'}
              {editedCategory && <>{editedCategory.name}</>}
            </label>
            <input
              type="text"
              onChange={(e) => setCategoryName(e.target.value)}
              value={categoryName}
            />
          </div>
          <div className="pb-1">
            <button type="submit">
              {editedCategory ? 'Update' : 'Create'}
            </button>
          </div>
        </div>
      </form>

      <div>
        <h2 className="mt-8 text-sm text-gray-500">Edit Category:</h2>
        {categories?.length > 0 &&
          categories?.map((c) =>
            c.name !== '' ? (
              <button
                className="bg-gray-200 rounded-xl p-2 px-4 flex gap-1 cursor-pointer mb-1"
                onClick={(e) => {
                  setEditedCategory(c);
                  setCategoryName(c.name);
                }}
              >
                <span>{c.name}</span>
              </button>
            ) : (
              ''
            )
          )}
      </div>
    </section>
  );
}

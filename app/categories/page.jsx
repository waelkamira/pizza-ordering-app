'use client';
import React, { useEffect, useState } from 'react';
import UserTabs from '../../components/layout/UserTabs';
import UseProfile from '../../components/UseProfile';
import toast from 'react-hot-toast';
import ConfirmDelete from '../../components/layout/ConfirmDelete';

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
    await fetch('/api/categories').then((res) =>
      res.json().then((res) => {
        setCategories(res);
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

  function handleDelete(indexToDelete) {
    const categoryToDelete = categories.filter(
      (item, index) => index === indexToDelete
    );

    const creationPromise = new Promise(async (resolve, reject) => {
      const response = await fetch('/api/categories', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categoryToDelete[0]),
      });
      if (response.ok) {
        resolve();
        fetchCategories();
      } else {
        reject();
      }
    });

    toast.promise(creationPromise, {
      loading: 'Deleting ...',
      success: 'Category Deleted',
      error: 'Sorry Something Went Wrong',
    });
  }

  return (
    <section className="mt-8 max-w-lg mx-auto">
      <UserTabs isAdmin={profileData} />
      <form className="mt-8" onSubmit={handleCategorySubmit}>
        <div className="flex items-end gap-2">
          <div className="grow">
            <label>
              {editedCategory ? 'Update Category:' : 'New Category Name:'}
              {editedCategory && <>{editedCategory.name}</>}
            </label>
            <input
              type="text"
              required
              onChange={(e) => setCategoryName(e.target.value)}
              value={categoryName}
            />
          </div>
          <div className="pb-1 flex gap-2">
            <button type="submit">
              {editedCategory ? 'Update' : 'Create'}
            </button>
            <button
              type="button"
              onClick={() => {
                setEditedCategory(null);
                setCategoryName('');
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>

      <div className="">
        <h2 className="mt-8 text-sm text-gray-500">Existing Categories:</h2>
        {categories?.length > 0 &&
          categories?.map((category, index) =>
            category.name !== '' ? (
              <div
                className="bg-gray-200 rounded-xl p-2 px-4 flex gap-2 cursor-pointer mb-4 items-center border-t-4 border-primary hover:shadow-sm"
                key={index}
              >
                <h1 className="grow text-2xl font-semibold hover:underline hover:text-3xl">
                  {category.name}
                </h1>
                <div>
                  <button
                    className="hover:bg-primary hover:text-white bg-white hover:border-[3px] hover:border-white"
                    onClick={(e) => {
                      setEditedCategory(category);
                      setCategoryName(category.name);
                    }}
                  >
                    Edit
                  </button>
                  <ConfirmDelete
                    onDelete={handleDelete}
                    prop={index}
                    className="bg-red-600 text-white"
                  >
                    Delete Category
                  </ConfirmDelete>
                </div>
              </div>
            ) : (
              ''
            )
          )}
      </div>
    </section>
  );
}

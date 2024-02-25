import React, { useState, useContext, useEffect } from 'react';
import { CldImage } from 'next-cloudinary';
import { CartContext } from '../ContextProvider';
import toast from 'react-hot-toast';
import MenuItemTile from './MenuItemTail';
import Fly from 'react-flying-objects';
export default function MenuItem(menuItem) {
  const {
    image,
    itemName,
    description,
    basePrice,
    sizes,
    ingredients,
    category,
  } = menuItem;

  const { addToCart } = useContext(CartContext);
  const [showPopup, setShowPopup] = useState(false);
  const [allPrice, setAllPrice] = useState(0);
  const [selectedIngredient, setSelectedIngredient] = useState([]);
  const [selectedSize, setSelectedSize] = useState([{}]);

  console.log('allPrice above', allPrice);
  console.log('selectedSize', selectedSize);
  console.log('selectedIngredient', selectedIngredient);

  function handleAddToCartButtonClick() {
    if (sizes?.length === 0 && ingredients?.length === 0) {
      addToCart(menuItem);
      toast.success('Added To Cart');
    } else {
      setShowPopup(true);
    }

    if (showPopup) {
      addToCart(menuItem, selectedSize, selectedIngredient);
      setSelectedSize({});
      setSelectedIngredient([]);
      setAllPrice(0);
      setShowPopup(false);
      toast.success('Added To Cart');
    }
  }

  function handleSelectedSizes(id, e) {
    const addSize = sizes?.filter((item) => item._id === id);
    if (addSize[0]?.name === 'small') {
      let size = {
        name: addSize[0].name,
        price: 0,
        basePrice: basePrice,
        id: id,
      };
      const num = selectedSize?.price || 0;
      const num2 = selectedSize?.basePrice || 0;
      console.log('num', num);
      setAllPrice(basePrice + allPrice + size.price - num - num2);
      setSelectedSize(size);
    } else {
      let size = {
        name: addSize[0].name,
        price: addSize[0].price,
        basePrice: basePrice,
        id: id,
      };
      const num = selectedSize?.price || 0;
      const num2 = selectedSize?.basePrice || 0;
      console.log('num', num);
      setAllPrice(basePrice + allPrice + size.price - num - num2);
      setSelectedSize(size);
    }
  }

  function handleSelectedIngredients(id, checked) {
    if (checked) {
      const addIngredient = ingredients?.filter((item) => item._id === id);
      let ing = Number(addIngredient[0].price);
      let addSelectedIngredient = [...selectedIngredient];

      addSelectedIngredient.push({
        id: id,
        name: addIngredient[0].name,
        price: ing,
      });

      setSelectedIngredient([...addSelectedIngredient]);
      setAllPrice(allPrice + ing);
    } else {
      const removeIngredient = selectedIngredient?.filter(
        (item) => item.id !== id
      );
      setSelectedIngredient(removeIngredient);
      const removeIngredientPrice = selectedIngredient?.filter(
        (item) => item.id === id
      );
      let ing = Number(removeIngredientPrice[0].price);
      setAllPrice(allPrice - ing);
    }
  }

  return (
    <>
      {showPopup && (
        <div
          className="fixed inset-0 bg-black/80 flex justify-center items-center"
          onClick={() => {
            setShowPopup(false);
            setSelectedSize({});
            setSelectedIngredient([]);
            setAllPrice(0);
            // allPrice = 0;
          }}
        >
          <div
            className=" bg-white rounded-lg p-4 h-auto max-h-[90%] overflow-y-auto  w-[50vb] "
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gray-600 p-4 rounded-lg text-center text-white ">
              <div className="text-center">
                <CldImage
                  src={image}
                  alt="pizza"
                  width={150}
                  height={200}
                  sizes="100vw"
                  className="max-h-auto block mx-auto max-h-24"
                />
                {/* <Fly objectToFly={image} /> */}
              </div>
              <h1 className="font-semibold my-3 text-xl ">{itemName}</h1>
            </div>
            <div className="flex flex-col gap-2 mt-4 justify-center">
              <h1 className="text-center">
                🍕🍕🍕 Pick {category} Size 🍕🍕🍕
              </h1>
              {sizes?.map((size) => {
                return (
                  <div className="flex flex-col gap-2 mx-4 border border-primary/40 rounded-md p-2">
                    <label className="flex items-center gap-2 font-semibold text-lg">
                      <input
                        onClick={(e) => {
                          // setIsChecked(e.target.checked);
                          handleSelectedSizes(size._id, e);
                        }}
                        className="accent-primary"
                        type="radio"
                        name="size"
                      />
                      <h6 className="">
                        {size.name === 'small'
                          ? `${size.name}  $${basePrice} `
                          : `${size.name}  $${basePrice + size.price}`}
                      </h6>
                    </label>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col gap-2 mt-4 justify-center">
              <h1 className="text-center">
                🧀🧀🧀 Pick Extra ingredients 🧀🧀🧀
              </h1>
              {ingredients?.map((ing) => {
                return (
                  <div className="flex flex-col gap-2 mx-4 border border-primary/40 p-2 rounded-md">
                    <label className="flex items-center gap-2 font-semibold text-lg">
                      <input
                        onClick={(e) => {
                          handleSelectedIngredients(ing._id, e.target.checked);
                        }}
                        className="checked size-4 accent-primary"
                        type="checkbox"
                        name={ing.name}
                      />
                      <div className="flex gap-2">
                        <h1>{ing.name}</h1>
                        <h1>+${ing.price}</h1>
                      </div>
                    </label>
                  </div>
                );
              })}
            </div>
            <div className="">
              <div className="mx-4 mt-4">
                <button
                  className="bg-primary rounded-md text-white sticky bottom-0"
                  onClick={handleAddToCartButtonClick}
                  type="button"
                >
                  Add To Cart ${allPrice}
                </button>
              </div>
              <div className="mx-4 mt-4">
                <button
                  className="bg-primary rounded-md text-white "
                  onClick={() => {
                    setShowPopup(false);
                    setSelectedSize({});
                    setSelectedIngredient([]);
                    setAllPrice(0);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <MenuItemTile onAddToCart={handleAddToCartButtonClick} {...menuItem} />
    </>
  );
}

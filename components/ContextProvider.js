'use client';
import { SessionProvider } from 'next-auth/react';
import { createContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
export const CartContext = createContext({});

export default function ContextProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);
  const ls = typeof window !== 'undefined' ? window.localStorage : null;

  let total = 0;

  for (const cartProduct of cartProducts) {
    total += finalPrice(cartProduct);
  }

  useEffect(() => {
    if (ls && ls.getItem('cartProducts')) {
      //? here we restore cartProducts after reload the page
      setCartProducts(JSON.parse(ls.getItem('cartProducts')));
    }
  }, []);

  //? this function store cartProducts in localStorage tp keep all products that user clicked after refresh
  function saveCartProductsToLocalStorage(cartProducts) {
    if (ls) {
      ls.setItem('cartProducts', JSON.stringify(cartProducts));
    }
  }

  //? this function to clear the cart
  function clearCart() {
    setCartProducts([]);
    saveCartProductsToLocalStorage([]);
  }

  //? this function to remove product from cart
  function removeCartProduct(indexToRemove) {
    const newCartProducts = cartProducts.filter(
      (v, index) => index !== indexToRemove
    );
    saveCartProductsToLocalStorage(newCartProducts);
    toast.success('Product successfully Removed');

    return newCartProducts;
  }

  //? this function to pick up all products that user clicked on to add them to the cart
  function addToCart(product, size = null, extras = []) {
    setCartProducts((prevProducts) => {
      const cartProduct = { ...product, size, extras };
      const newProducts = [...prevProducts, cartProduct];
      saveCartProductsToLocalStorage(newProducts);
      return newProducts;
    });
  }

  //? this function to calculate final price with size and extras
  function finalPrice(cartProduct) {
    let price = cartProduct?.basePrice;

    if (cartProduct?.size) {
      price += cartProduct?.size?.price;
    }

    if (cartProduct?.extras?.length > 0) {
      for (const extra of cartProduct.extras) {
        price += extra.price;
      }
    }

    return price;
  }
  return (
    <SessionProvider>
      <CartContext.Provider
        value={{
          cartProducts,
          setCartProducts,
          addToCart,
          clearCart,
          removeCartProduct,
          finalPrice,
          total,
          saveCartProductsToLocalStorage,
        }}
      >
        {children}
      </CartContext.Provider>
    </SessionProvider>
  );
}

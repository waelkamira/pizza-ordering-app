'use client';
import { SessionProvider } from 'next-auth/react';
import { createContext, useEffect, useState } from 'react';
export const CartContext = createContext({});

export default function ContextProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);
  const ls = typeof window !== 'undefined' ? window.localStorage : null;

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

  //? this function to clear to clear cart
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
    return newCartProducts;
  }

  //? this function to pick up all products that user clicked on to add them to the cart
  function addToCart(product, size = null, extras = []) {
    setCartProducts((prevProducts) => {
      const cartProduct = { ...product, size, extras };
      const newProducts = [...prevProducts, cartProduct];
      saveCartProductsToLocalStorage(newProducts);
      // console.log('newProducts', newProducts);
      return newProducts;
    });
  }

  //? this function to calculate final price with size and extras
  function finalPrice(product) {
    let price = 0;

    if (product?.extras?.length === 0 && product?.size == null) {
      price = product?.basePrice;
    } else if (product?.size?.price !== 0) {
      price = product?.size?.price;
    } else if (product?.extras?.length > 0 && product?.size?.price !== 0) {
      let prices = [];
      product?.extras.map((item) => prices.push(item.price));
      let extrasPrice = prices.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      }, 0);

      price = product?.size?.price + extrasPrice;
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
        }}
      >
        {children}
      </CartContext.Provider>
    </SessionProvider>
  );
}

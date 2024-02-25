'use client';
import React, { useContext } from 'react';
import SectionHeaders from '../../components/layout/SectionHeaders';
import { CartContext } from '../../components/ContextProvider';
import { CldImage } from 'next-cloudinary';

export default function CartPage() {
  const {
    cartProducts,
    setCartProducts,
    clearCart,
    removeCartProduct,
    finalPrice,
  } = useContext(CartContext);
  console.log(cartProducts);
  return (
    <section className="mt-8 mx-auto">
      <div className=" text-center mb-4">
        <SectionHeaders mainHeader={'Cart'} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="border">
          {cartProducts?.length === 0 && 'No Products In Your Cart'}
          {cartProducts?.length > 0 &&
            cartProducts?.map((product) => {
              return (
                <div>
                  <div className="flex items-center gap-4 border border-primary my-2 rounded-lg p-4">
                    <CldImage
                      src={product?.image}
                      width={100}
                      height={100}
                      sizes="100vb"
                      alt="product image"
                    />
                    {product?.size?.length > 0 ||
                    product?.extras?.length > 0 ? (
                      <div>
                        <h1>{product?.itemName}</h1>
                        <div>
                          <h1>
                            Size {product?.size?.name}:
                            <span className="ml-2">
                              ${product?.size?.price}
                            </span>
                          </h1>
                        </div>
                        <div>
                          <div>
                            {product?.extras.map((item) => {
                              return (
                                <div>
                                  <h1>
                                    {item.name}:
                                    <span className="ml-2">${item.price}</span>
                                  </h1>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <h1>{product?.itemName}</h1>
                        {/* <h1>${product?.basePrice}</h1> */}
                      </div>
                    )}
                    <h1> ${finalPrice(product)}</h1>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="border">right</div>
      </div>
    </section>
  );
}

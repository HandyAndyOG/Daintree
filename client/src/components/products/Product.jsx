import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Product = ({ product, addToCart }) => {
  const { loggedIn } = useContext(UserContext);
  return (
    <>
      <article className="rounded shadow-md flex flex-col bg-[#EEE9E8]">
        <h1 className="p-5 text-start font-semibold text-lg">
          {product.title}
        </h1>
        <img
          className="object-contain"
          src={product.imageUrl}
          alt={"picture of product"}
        />
        <div className="flex flex-row p-5 items-center">
          <div className="p-2">
            <h2 className="text-start">{product.description}</h2>
          </div>
          <div className="p-2">
            <p>{product.price}</p>
            <p className="whitespace-nowrap">Remaining: {product.quantity}</p>
            {loggedIn?.role !== "user" ? (
              ""
            ) : (
              <button
                className="mt-3 p-2 rounded-full bg-[#C8B8B4] text-white ease-in-out duration-300 hover:bg-white hover:text-black shadow"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </article>
    </>
  );
};

export default Product;

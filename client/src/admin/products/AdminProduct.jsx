import React, { useContext, useState } from "react";
import { UserContext } from "../../components/context/UserContext";
import { AiOutlineEdit, AiOutlineCheck } from "react-icons/ai";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const updatedProductMessage = () => {
  toast.success("Product Quantity Updated", {
    position: toast.POSITION.TOP_CENTER,
  });
};
const deletedProductMessage = () => {
  toast.success("Removed Product", {
    position: toast.POSITION.TOP_CENTER,
  });
};

const AdminProduct = ({ product }) => {
  const [update, setUpdate] = useState(false);
  const {
    loggedIn,
    token,
    setDeletedProduct,
    setUpdatedProduct,
    updatedProduct,
    deletedProduct,
  } = useContext(UserContext);
  const [updatedQuantity, setUpdatedQuantity] = useState("");

  const deleteProduct = (id) => {
    if (token && loggedIn) {
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const requestOptions = {
        method: "DELETE",
        headers: headers,
      };

      fetch(`${process.env.REACT_APP_URL}/api/product/${id}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          return result.message === "deleted"
            ? setDeletedProduct(!deletedProduct)
            : "";
        })
        .catch((error) => console.log("error", error))
        .finally(() => {
          setDeletedProduct(!deletedProduct);
          deletedProductMessage();
        });
    }
  };

  const updateQuantity = (productId) => {
    if (token && loggedIn) {
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      const requestOptions = {
        method: "PATCH",
        headers: headers,
        body: JSON.stringify({ quantity: updatedQuantity }),
      };

      fetch(`${process.env.REACT_APP_URL}/api/product/${productId}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          return result.status === "success"
            ? setUpdatedProduct(!updatedProduct)
            : "";
        })
        .catch((error) => console.log("error", error))
        .finally(() => {
          setUpdatedQuantity("");
          setUpdatedProduct(!updatedProduct);
          setUpdate(!update);
          updatedProductMessage();
        });
    }
  };

  return (
    <article className="flex flex-col shadow">
      <div className="flex flex-row justify-between p-2 m-1">
        <h1 className="text-left font-bold">{product.title}</h1>
        <button
          className="px-2 h-6 rounded-full bg-[#C8B8B4] text-white ease-in-out duration-300 hover:bg-white hover:text-black shadow"
          onClick={() => deleteProduct(product.id)}
        >
          X
        </button>
      </div>

      <img src={product.imageUrl} alt={"picture of product"} />
      <p className="p-2 text-left">{product.description}</p>
      <p className="text-left p-2">{product.price}</p>
      <div className="flex flex-row p-2 items-center">
        <p className="whitespace-nowrap font-semibold">
          Quantity: {product.quantity}
        </p>
        {update ? (
          <>
            <input
              className="border rounded shadow-inner px-1 py-1 w-1/4"
              type={"number"}
              placeholder="e.g. 1"
              value={updatedQuantity}
              onChange={(e) => setUpdatedQuantity(e.target.value)}
            />{" "}
            <AiOutlineCheck onClick={() => updateQuantity(product.id)} />
          </>
        ) : (
          <AiOutlineEdit
            onClick={() => setUpdate(!update)}
            className="text-lg cursor-pointer ml-2"
          />
        )}
      </div>
    </article>
  );
};

export default AdminProduct;

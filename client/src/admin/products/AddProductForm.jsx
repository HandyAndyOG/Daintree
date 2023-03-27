import React, { useState, useContext } from "react";
import { UserContext } from "../../components/context/UserContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const addedProductMessage = () => {
  toast.success("Product Added", {
    position: toast.POSITION.TOP_CENTER,
  });
};

const AddProductForm = () => {
  const [title, setTitle] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const { loggedIn, token, setAddedProductId } =
    useContext(UserContext);

  const addProduct = (e) => {
    e.preventDefault();
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const requestOptions = {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        title: title,
        quantity: quantity,
        price: price,
        category: category,
      }),
    };

    fetch(
      `http://localhost:8080/api/store/${loggedIn?.uniqueStoreId}/product`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        return(result.message === 'success' ? setAddedProductId(result.data.uniqueStoreId) : '');
      })
      .catch((error) => console.log("error", error))
      .finally(() => {
        addedProductMessage();
        setTitle("");
        setQuantity("");
        setPrice("");
        setCategory("");
        setAddedProductId("");
      })

  };

  return (
    <section className="flex flex-col border rounded shadow p-4 w-1/2 items-center">
      <h4 className="text-lg">Add new Product</h4>
      <form className="flex flex-col items-start justify-center">
        <label className="" htmlFor={"title_input"}>
          Title:{" "}
        </label>
        <input
          className="border rounded shadow-inner px-1 py-1"
          required
          placeholder={"Title of product"}
          id={"title_input"}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor={"quantity_input"}>Quantity: </label>
        <input
          className="border rounded shadow-inner px-1 py-1"
          required
          type={"number"}
          placeholder={1}
          id={"quantity_input"}
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <label htmlFor={"price_input"}>Price: </label>
        <input
          className="border rounded shadow-inner px-1 py-1"
          required
          type={"number"}
          id={"price_input"}
          placeholder="$2.5"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <label htmlFor={"category_input"}>Category: </label>
        <input
          className="border rounded shadow-inner px-1 py-1"
          required
          type={"text"}
          placeholder={"Category"}
          id={"category_input"}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <button
          className="self-center mt-3 p-2 rounded-full bg-[#C8B8B4] text-white ease-in-out duration-300 hover:bg-white hover:text-black shadow"
          onClick={(e) => addProduct(e)}
        >
          Add product
        </button>
      </form>
    </section>
  );
};

export default AddProductForm;

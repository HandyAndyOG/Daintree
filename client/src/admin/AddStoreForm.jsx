import React, { useState, useContext } from "react";
import { UserContext } from "../components/context/UserContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddStoreForm = () => {
  const [storeTitle, setStoreTitle] = useState("");
  const [adminId, setAdminId] = useState("");
  const { token, setAddStore, addStore } = useContext(UserContext);

  const addedStoreMessage = () => {
    toast.success("Store Added", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const handleAddStore = (e) => {
    e.preventDefault();
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const requestOptions = {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ title: storeTitle, adminId: adminId }),
    };

    fetch(`${import.meta.env.VITE_URL}/api/store`, requestOptions)
      .then((response) => response.json())
      .then((result) => {return(result.message === 'success' ? setAddStore(!addStore) : '')})
      .catch((error) => console.log("error", error))
      .finally(() => {
        setStoreTitle("");
        setAdminId("");
        addedStoreMessage()
      })
  };
  return (
    <section className="flex flex-col border rounded shadow p-4 w-3/4 sm:w-1/2 items-center self-center mt-4 mb-4 leading-7">
      <h4 className="">Add new Store</h4>
      <form className="flex flex-col items-start">
        <label htmlFor={"name_input"}>Title</label>
        <input
          className="border rounded shadow-inner px-1 py-1"
          placeholder={"Name of store"}
          id={"name_input"}
          value={storeTitle}
          onChange={(e) => setStoreTitle(e.target.value)}
        />
        <label htmlFor={"admin_input"}>Admin Id</label>
        <input
          className="border rounded shadow-inner px-1 py-1"
          type={"text"}
          id={"admin_input"}
          value={adminId}
          onChange={(e) => setAdminId(e.target.value)}
        />
        <button
          className="self-center mt-3 p-2 rounded-full bg-[#C8B8B4] text-white ease-in-out duration-300 hover:bg-white hover:text-black shadow"
          onClick={handleAddStore}
        >
          Add Store
        </button>
      </form>
    </section>
  );
};

export default AddStoreForm;

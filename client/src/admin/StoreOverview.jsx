import React, { useContext } from "react";
import { UserContext } from "../components/context/UserContext";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function StoreOverview({ storeInfo }) {
  const { token, setDeletedStoreB, deletedStoreB, setSuperId, setStoreName } = useContext(UserContext);
  const navigate = useNavigate();

  const deletedStore = () => {
    toast.success('Store Removed', {
        position: toast.POSITION.TOP_CENTER
    });
};

  const handleAdmin = (e) => {
    e.preventDefault()
    setSuperId(storeInfo.uniqueStoreId)
    setStoreName(storeInfo.name)
    navigate('/admin')
  }

  const deleteStore = (id) => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const requestOptions = {
      method: "DELETE",
      headers: headers,
      redirect: "follow",
    };

    fetch(`${import.meta.env.VITE_URL}/api/store/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {return(result.message === 'deleted' ? setDeletedStoreB(!deletedStoreB) : '' )})
      .catch((error) => console.log("error", error))
      .finally(() => {
        deletedStore();
      })
  };

  return (
    <article className="flex flex-col items-start shadow rounded bg-white p-5">
      <div className="flex flex-row justify-between w-full">
        <h3 className="text-left font-semibold">StoreName: {storeInfo.name}</h3>
        <button
          className="px-2 h-6 rounded-full bg-[#C8B8B4] text-white ease-in-out duration-300 hover:bg-white hover:text-black shadow"
          onClick={() => deleteStore(storeInfo.uniqueStoreId)}
        >
          X
        </button>
      </div>
      <div className="leading-7">
        <p>Store Id: {storeInfo.id}</p>
        <p>Admin Id: {storeInfo.adminId}</p>
      </div>
      <button onClick={handleAdmin} className="cursor-pointer underline">Go to {storeInfo.name}</button>
    </article>
  );
}

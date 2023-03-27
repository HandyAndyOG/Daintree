import React, { useContext } from "react";
import AdminProductList from "./products/AdminProductList";
import { UserContext } from "../components/context/UserContext";
import { useEffect } from "react";

const AdminPage = () => {
  const {
    loggedIn,
    token,
    storeName,
    storeProducts,
    setStoreProducts,
    addedProductId,
    setStoreName,
    deletedProduct,
    updatedProduct,
    superId,
    setSuperId
  } = useContext(UserContext);

  const fetchData = (id) => {
    if (token && loggedIn && id) {
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      const requestOptions = {
        method: "GET",
        headers: headers,
        redirect: "follow",
      };
      fetch(
        `${import.meta.env.VITE_URL}/api/store/${id}/product`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => setStoreProducts(result))
        .catch((error) => console.log("error", error))
        .finally(() => {
          setSuperId('')
        })
    }
    if (!storeName && loggedIn && id) {
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const requestOptions = {
        method: "GET",
        headers: headers,
        redirect: "follow",
      };
      fetch(
        `${import.meta.env.VITE_URL}/api/store/${id}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          setStoreName(result?.store?.name);
        })
        .catch((error) => console.log("error", error))
        .finally(() => {
          setSuperId('')
        })
    }
  }
  useEffect(() => {
    if(loggedIn?.role === 'super-admin') {
      fetchData(superId)
    } else {
      fetchData(loggedIn?.uniqueStoreId)
    }
    
  }, [token, loggedIn, addedProductId, deletedProduct, updatedProduct, superId]);

  if (storeProducts) {
    return (
      <>
        {loggedIn?.role !== "user" ? (
          <section className="flex flex-col">
            <header className="text-lg font-semibold p-2 mt-3">Welcome to the {storeName}</header>
            <AdminProductList
              products={storeProducts}
              storeName={storeName}
            />
          </section>
        ) : (
          <h1>Error: No admin found</h1>
        )}
      </>
    );
  }
  <h1>Error: No admin found</h1>;
};

export default AdminPage;

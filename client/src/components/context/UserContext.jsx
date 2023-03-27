import React from "react";
import { useEffect } from "react";
import { createContext, useState } from "react";
import { authUser } from "../authorization/authUser";
export const UserContext = createContext("");

const UserProvider = ({ children }) => {
  const [token, setToken] = useState();
  const [localstorage, setLocalstorage] = useState(
    localStorage.getItem("token")
  );
  const [product, setProduct] = useState();
  const [stores, setStores] = useState();
  const [loggedIn, setLogggedIn] = useState();
  const [storeName, setStoreName] = useState();
  const [storeProducts, setStoreProducts] = useState();
  const [addedProductId, setAddedProductId] = useState();
  const [deletedProduct, setDeletedProduct] = useState(false);
  const [deletedStoreB, setDeletedStoreB] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState(false);
  const [addStore, setAddStore] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [cart, setCart] = useState();
  const [cartId, setCartId] = useState();
  const [addCart, setAddCart] = useState(false);
  const [delCart, setDelCart] = useState(false);
  const [superId, setSuperId] = useState("");

  useEffect(() => {
    authUser;
  }, []);

  return (
    <UserContext.Provider
      value={{
        superId,
        setSuperId,
        addCart,
        setAddCart,
        delCart,
        setDelCart,
        cartId,
        setCartId,
        cart,
        setCart,
        cartCount,
        setCartCount,
        token,
        setToken,
        product,
        setProduct,
        loggedIn,
        setLogggedIn,
        storeName,
        setStoreName,
        storeProducts,
        setStoreProducts,
        addedProductId,
        setAddedProductId,
        localstorage,
        setLocalstorage,
        deletedProduct,
        setDeletedProduct,
        updatedProduct,
        setUpdatedProduct,
        stores,
        setStores,
        addStore,
        setAddStore,
        deletedStoreB, 
        setDeletedStoreB
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

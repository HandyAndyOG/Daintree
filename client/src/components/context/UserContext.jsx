import React from 'react'
import { useEffect } from 'react';
import { createContext, useState } from 'react'
import { authUser } from '../authorization/authUser';
export const UserContext = createContext('');

const UserProvider = ({children}) => {
    const [token, setToken] = useState()
    const [localstorage, setLocalstorage] = useState(localStorage.getItem("token"))
    const [product, setProduct] = useState()
    const [stores, setStores] = useState()
    const [loggedIn, setLogggedIn] = useState()
    const [storeName, setStoreName] = useState()
    const [storeProducts, setStoreProducts] = useState()
    const [addedProductId, setAddedProductId] = useState()
    const [deletedProduct, setDeletedProduct] = useState('')
    const [deletedStore, setDeletedStore] = useState('')
    const [updatedProduct, setUpdatedProduct] = useState('')
    const [addStore, setAddStore] = useState('')

    useEffect(() => {
      authUser
    }, [])

  return (
    <UserContext.Provider value={{ token, setToken, product, setProduct, loggedIn, setLogggedIn, storeName, setStoreName, storeProducts, setStoreProducts, addedProductId, setAddedProductId, localstorage, setLocalstorage, deletedProduct, setDeletedProduct, updatedProduct, setUpdatedProduct, stores, setStores, addStore, setAddStore, deletedStore, setDeletedStore }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
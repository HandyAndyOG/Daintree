import React from 'react'
import { createContext, useState } from 'react'
export const UserContext = createContext('');

const UserProvider = ({children}) => {
    const [token, setToken] = useState()
    const [product, setProduct] = useState()
    const [loggedIn, setLogggedIn] = useState()
    const [storeName, setStoreName] = useState()
    const [storeProducts, setStoreProducts] = useState()

  return (
    <UserContext.Provider value={{ token, setToken, product, setProduct, loggedIn, setLogggedIn, storeName, setStoreName, storeProducts, setStoreProducts }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
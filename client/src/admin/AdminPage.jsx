import React, { useContext } from 'react'
import AdminProductList from "./products/AdminProductList";
import { UserContext } from '../components/context/UserContext'
import { useEffect } from 'react';

const AdminPage = () => {
    const { loggedIn, token, storeName, storeProducts, setStoreProducts, addedProductId, setStoreName, deletedProduct, updatedProduct } = useContext(UserContext)


    useEffect(() => {

        if(token && loggedIn) {
            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            };
        
            const requestOptions = {
                method: 'GET',
                headers: headers,
                redirect:'follow'
            };
        
            fetch(`http://localhost:8080/api/store/${loggedIn?.uniqueStoreId}/product`, requestOptions)
                .then(response => response.json())
                .then(result => setStoreProducts(result))
                .catch(error => console.log('error', error));
        }
        if (!storeName && loggedIn) {
            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            };
        
            const requestOptions = {
                method: 'GET',
                headers: headers,
                redirect:'follow'
            };

            fetch(`http://localhost:8080/api/store/${loggedIn.uniqueStoreId}`, requestOptions)
                .then(response => response.json())
                .then(result => setStoreName(result))
                .catch(error => console.log('error', error));
        }
    }, [token, loggedIn, addedProductId, deletedProduct, updatedProduct])

    if(storeProducts) {
        return (
            <>
                {loggedIn?.role === 'admin' ? <section>
                <header>
                Welcome to the {storeName?.store.name}
                </header>
                <AdminProductList products={storeProducts} storeName={storeName?.store.name} />
                </section>
                 : <h1>Error: No admin found</h1>}
            </>
        )
    }
    <h1>Error: No admin found</h1>
}

export default AdminPage;
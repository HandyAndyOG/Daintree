import React, { useContext } from 'react'
import AdminProductList from "./products/AdminProductList";
import { UserContext } from '../components/context/UserContext'
import {fakeProducts} from '../fakedata/fakedata';
import { useEffect } from 'react';

function AdminPage() {
    const { loggedIn, token, storeName, storeProducts, setStoreProducts } = useContext(UserContext)

    useEffect(() => {
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
    
        const requestOptions = {
            method: 'GET',
            headers: headers,
            redirect:'follow'
        };
    
        fetch(`http://localhost:8080/api/store/${loggedIn.uniqueStoreId}/product`, requestOptions)
            .then(response => response.json())
            .then(result => setStoreProducts(result))
            .catch(error => console.log('error', error));
    }, [])

    return (
        <>
            {loggedIn?.role === 'admin' ? <section>
            <header>
            Welcome to the {storeName.store.name}
            </header>
            <AdminProductList products={storeProducts} storeName={storeName.store.name} />
            </section>
             : <h1>Error: No admin found</h1>}
        </>
    )
}

export default AdminPage;
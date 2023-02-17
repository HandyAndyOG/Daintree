import StoreOverview from "./StoreOverview";
import React, { useContext, useEffect } from 'react'
import AddStoreForm from "./AddStoreForm";
import { UserContext } from '../components/context/UserContext'

function SuperAdminPage() {
    const { stores, addStore, setStores, token, deletedStore } = useContext(UserContext)
    const currentUser = "Best Admin of all";

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
    
        fetch(`http://localhost:8080/api/store`, requestOptions)
            .then(response => response.json())
            .then(result => setStores(result.data))
            .catch(error => console.log('error', error));
    }, [addStore, deletedStore])

    if(stores) {
        return (
            <>
                <header>
                    Welcome Almighty SuperAdmin {currentUser}
                </header>
                <AddStoreForm/>
                {
                    stores.map(s => {
                        return <StoreOverview key={s.uniqueStoreId} storeInfo={s}/>
                    })
                }
    
            </>
        )
    }
}

export default SuperAdminPage;
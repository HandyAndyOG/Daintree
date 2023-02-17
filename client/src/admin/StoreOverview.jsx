import {Link} from "react-router-dom";
import React, { useContext } from 'react'
import { UserContext } from '../components/context/UserContext'

export default function StoreOverview({storeInfo}) {
    const { token, setDeletedStore } = useContext(UserContext)

    const deleteStore = (id) => {
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
    
        const requestOptions = {
            method: 'DELETE',
            headers: headers,
            redirect:'follow'
        };
    
        fetch(`http://localhost:8080/api/store/${id}`, requestOptions)
            .then(response => response.json())
            .then(result => setDeletedStore(result.message))
            .catch(error => console.log('error', error));
        setDeletedStore('')
    }
    return (
        <>
            <h3>StoreName: {storeInfo.name}</h3>
            <p>StoreId: {storeInfo.id}</p>
            <h3>AdminId: {storeInfo.adminId}</h3>
            <Link to={"/admin"}>Go to {storeInfo.name}</Link>
            <button onClick={() => deleteStore(storeInfo.uniqueStoreId)}>Delete Store</button>
        </>
    )
}
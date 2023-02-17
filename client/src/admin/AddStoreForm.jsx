import React, { useState, useContext } from 'react'
import { UserContext } from '../components/context/UserContext'



const AddStoreForm = () => {
    const [storeTitle, setStoreTitle] = useState('')
    const [adminId, setAdminId] = useState('')
    const { token, setAddStore } = useContext(UserContext)

    const addStore = (e) => {
        e.preventDefault();
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
    
        const requestOptions = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({ title: storeTitle, adminId: adminId })
        };
    
        fetch(`http://localhost:8080/api/store`, requestOptions)
            .then(response => response.json())
            .then(result => setAddStore(result.message))
            .catch(error => console.log('error', error));
        setStoreTitle('')
        setAdminId('')
    }
    return (
        <>
            <h4>Add new Store</h4>
            <form className={"add_store_form"}>
                <label htmlFor={"name_input"}>Title</label>
                <input placeholder={"Name of store"} id={"name_input"} value={storeTitle} onChange={(e) => setStoreTitle(e.target.value)}/>
                <br/>
                <label htmlFor={"admin_input"}>Admin Id</label>
                <input type={"text"} id={"admin_input"} value={adminId} onChange={(e) => setAdminId(e.target.value)}/>
                <br/>
                <button onClick={addStore}>Add Store</button>
            </form>
        </>
    )
}

export default AddStoreForm;
import React, { useContext } from 'react'
import { useState } from 'react'
import { UserContext } from '../../components/context/UserContext'

const AdminProduct = ({ product }) => {
    const { loggedIn, token, setDeletedProduct, setUpdatedProduct } = useContext(UserContext)
    const [ updatedQuantity, setUpdatedQuantity] = useState('')

    const deleteProduct = (id) => {
        if(token && loggedIn) {
            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            };
        
            const requestOptions = {
                method: 'DELETE',
                headers: headers
            };
        
            fetch(`http://localhost:8080/api/product/${id}`, requestOptions)
                .then(response => response.json())
                .then(result => setDeletedProduct(result.message))
                .catch(error => console.log('error', error));
            setDeletedProduct('')
        }
    }   

    const updateQuantity = (productId) => {
        if(token && loggedIn) {
            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            };
        
            const requestOptions = {
                method: 'PATCH',
                headers: headers,
                body: JSON.stringify({quantity: updatedQuantity})
            };
        
            fetch(`http://localhost:8080/api/product/${productId}`, requestOptions)
                .then(response => response.json())
                .then(result => setUpdatedProduct(result.message))
                .catch(error => console.log('error', error));
            setUpdatedQuantity('')
            setUpdatedProduct('')
        }
    }
    return (
        <>
            <h1>
                {product.title}
            </h1>
            <h2>
                {product.description}
            </h2>
            <img src={product.imageUrl} alt={"picture of product"}/>
            <p>Quantity: {product.quantity}</p>
            <input type={"number"} placeholder='e.g. 1' value={updatedQuantity} onChange={(e) => setUpdatedQuantity(e.target.value)}/>
            <button onClick={() => updateQuantity(product.id)}>Update Quantity</button>
            <button onClick={() => deleteProduct(product.id)}>Delete</button>
        </>
    )
}

export default AdminProduct;
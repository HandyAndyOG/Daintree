import React, { useState, useContext } from 'react'
import { UserContext } from '../../components/context/UserContext'


const AddProductForm = () => {
    const [title, setTitle] = useState('')
    const [quantity, setQuantity] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const { loggedIn, token, setAddedProductId, localStorage } = useContext(UserContext)


    const addProduct = (e) => {
        e.preventDefault();
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
    
        const requestOptions = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({ title: title, quantity: quantity, price: price,
                category: category })
        };
    
        fetch(`http://localhost:8080/api/store/${loggedIn?.uniqueStoreId}/product`, requestOptions)
            .then(response => response.json())
            .then(result => {console.log(result),setAddedProductId(result.data.uniqueStoreId)})
            .catch(error => console.log('error', error));

        setTitle('')
        setQuantity('')
        setPrice('')
        setCategory('')
        setAddedProductId('')
    }

    return (
        <>
            <h4>Add new Product</h4>
            <form className={"add_product_form"}>
                <label htmlFor={"title_input"}>Title</label>
                <input required placeholder={"title of product"} id={"title_input"} value={title} onChange={(e) => setTitle(e.target.value)}/>
                <br/>
                <label htmlFor={"quantity_input"}>Quantity</label>
                <input required type={"number"} placeholder={1} id={"quantity_input"} value={quantity} onChange={(e) => setQuantity(e.target.value)}/>
                <br/>
                <label htmlFor={"price_input"}>Price</label>
                <input required type={"number"} id={"price_input"} value={price} onChange={(e) => setPrice(e.target.value)}/>
                <br/>
                <label htmlFor={"category_input"}>Category</label>
                <input required type={"text"} placeholder={"category"} id={"category_input"} value={category} onChange={(e) => setCategory(e.target.value)}/>
                <br/>
                <button onClick={(e) => addProduct(e)}>Add product</button>
            </form>
        </>
    )
}

export default AddProductForm;
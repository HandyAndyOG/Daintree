import './Product.css'
import React, { useState, useContext } from 'react'
import { useEffect } from 'react'


const Product = ({product, addToCart }) => {

    return (
        <>
            <article className={"product_item"}>
                <section className={"text_section"}>
                    <h1>
                        {product.title}
                    </h1>
                    <h2>
                        {product.description}
                    </h2>
                    <p>{product.price}</p>
                    <p>Quantity: {product.quantity}</p>
                </section>
                <img src={product.imageUrl} alt={"picture of product"}/>
                <button onClick={() => addToCart(product.id)}>Add to Cart</button>
            </article>
        </>
    )
}

export default Product;
import './App.css';
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from './components/context/UserContext'

import {
    BrowserRouter as Router,
    Routes,
    Route,
} from 'react-router-dom';
import { authToken } from './components/authorization/authToken'
import {fakeProducts} from './fakedata/Fakedata.js';
import {fakecart} from './fakedata/fakecart.js';
import NavBar from './components/Navbar.jsx';
import Cart from './components/checkout/Cart.jsx';
import AdminPage from "./admin/AdminPage.jsx";
import ProfileBar from "./components/ProfileBar.jsx";
import ProductList from './components/products/ProductList.jsx';
import LoginForm from './components/login/LoginForm.jsx';
import NewUserForm from './components/login/NewUserForm.jsx';
import SuperAdminPage from "./admin/SuperAdminPage.jsx";

function addToCart(productId) {
    console.log("Add " + productId + " From the App")
    //add item to the current Cart
}

function removeFromCart(productId) {
    console.log("Remove " + productId + " From the App")
    //remove item from the current Cart
}

function getCurrentCart() {
    return fakecart;
    //update to get from localstorage
}


function App() {
    const [currentCart, setCurrentCart] = useState(getCurrentCart());
    const { token, product, setProduct, localstorage, setToken, setLogggedIn, deletedProduct, updatedProduct, addedProductId} = useContext(UserContext)

    useEffect(() => {
        if(!token && localstorage) {
            setToken(localstorage)
        }
        if(token) {
            authToken(token, setLogggedIn)
            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            };
        
            const requestOptions = {
                method: 'GET',
                headers: headers,
                redirect:'follow'
            };
        
            fetch('http://localhost:8080/api/product', requestOptions)
                .then(response => response.json())
                .then(result => setProduct(result.body.data))
                .catch(error => console.log('error', error));
        }


    },[token, deletedProduct, updatedProduct, addedProductId])

    return (
        <div className="App">
            <Router>
                <header className={"top_header"}>
                    <ProfileBar/>
                    <NavBar/>
                </header>
                <Routes>
                    <Route exact path='/create-new-user' element={< NewUserForm/>}></Route>
                    <Route exact path='/login' element={< LoginForm/>}></Route>
                    <Route exact path='/'
                           element={< ProductList products={product ? product : fakeProducts} addToCart={addToCart}/>}></Route>
                    <Route exact path='/cart'
                           element={< Cart products={currentCart} removeFromCart={removeFromCart}/>}></Route>
                    <Route exact path='/admin' element={< AdminPage/>}></Route>
                    <Route exact path='/admin/super' element={< SuperAdminPage/>}></Route>
                </Routes>
            </Router>
        </div>
    )
}

export default App;

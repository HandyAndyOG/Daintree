import "./App.css";
import React, { useContext, useEffect } from "react";
import { UserContext } from "./components/context/UserContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { authToken } from "./components/authorization/authToken";
import NavBar from "./components/Navbar.jsx";
import Cart from "./components/checkout/Cart.jsx";
import AdminPage from "./admin/AdminPage.jsx";
import ProductList from "./components/products/ProductList.jsx";
import LoginForm from "./components/login/LoginForm.jsx";
import NewUserForm from "./components/login/NewUserForm.jsx";
import SuperAdminPage from "./admin/SuperAdminPage.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const {
    loggedIn,
    addCart,
    setAddCart,
    delCart,
    setDelCart,
    cartId,
    setCartId,
    token,
    product,
    setProduct,
    localstorage,
    setToken,
    setLogggedIn,
    deletedProduct,
    deletedStoreB,
    updatedProduct,
    addedProductId,
    cart,
    setCart,
    setCartCount,
    currentPage,
    setCurrentPage,
  } = useContext(UserContext);

  const addedToCartMessage = () => {
    toast.success("Added To Cart", {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  const deletedFromCartMessage = () => {
    toast.success("Removed", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  function removeFromCart(itemId) {
    if (itemId && token) {
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      const requestOptions = {
        method: "DELETE",
        headers: headers,
        body: JSON.stringify({ id: itemId }),
      };
      fetch(
        `${import.meta.env.VITE_URL}/api/user/cart/${cartId}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          return data.message === "deleted" ? setDelCart(!delCart) : "";
        })
        .catch((err) => console.log(err))
        .finally(() => {
          deletedFromCartMessage();
        });
    }
  }

  function addToCart(product) {
    const addProduct = {
      item: {
        amount: 1,
        id: product.id,
        title: product.title,
        description: product.description,
        imageUrl: product.imageUrl,
        price: product.price,
      },
    };
    if (addProduct && token) {
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const requestOptions = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(addProduct),
      };
      fetch(
        `${import.meta.env.VITE_URL}/api/user/cart/${cartId}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          return data.message === "success" ? setAddCart(!addCart) : "";
        })
        .catch((err) => console.log(err))
        .finally(() => {
          addedToCartMessage();
        });
    }
  }

  useEffect(() => {
    if (!token && localstorage) {
      setToken(localstorage);
    }
    if (loggedIn?.role === "user" && token) {
      authToken(token, setLogggedIn);
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const requestOptions = {
        method: "GET",
        headers: headers,
        redirect: "follow",
      };

      fetch(`${import.meta.env.VITE_URL}/api/user/cart/`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          result.body.data.items !== "[]"
            ? (setCart(JSON.parse(result.body.data.items)),
              setCartCount(JSON.parse(result.body.data.items).length),
              setCartId(result.body.data.id))
            : (setCart([]), setCartCount(0), setCartId(result.body.data.id));
        })
        .catch((error) => console.log("error", error));
    }
  }, [
    token,
    deletedProduct,
    updatedProduct,
    addedProductId,
    addCart,
    delCart,
    deletedStoreB,
  ]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_URL}/api/product/page/${currentPage}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((result) => {setProduct(result.body)})
      .catch((error) => console.log("error", error));
  }, [currentPage]);

  return (
    <div className="App">
      <Router>
        <header>
          <NavBar />
          <ToastContainer />
        </header>
        <Routes>
          <Route
            exact
            path="/create-new-user"
            element={<NewUserForm />}
          ></Route>
          <Route exact path="/login" element={<LoginForm />}></Route>
          <Route
            exact
            path="/"
            element={<ProductList products={product} addToCart={addToCart} />}
          ></Route>
          <Route
            exact
            path="/cart"
            element={<Cart products={cart} removeFromCart={removeFromCart} />}
          ></Route>
          <Route exact path="/admin" element={<AdminPage />}></Route>
          <Route exact path="/admin/super" element={<SuperAdminPage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

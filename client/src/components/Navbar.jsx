import React, { useContext, useEffect } from "react";
import { UserContext } from "./context/UserContext";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import ProfileBar from "./ProfileBar";
import { useNavigate, useLocation } from "react-router-dom";
import LoginForm from "./login/LoginForm";

function NavBar() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const {
    setToken,
    token,
    loggedIn,
    setLogggedIn,
    setLocalstorage,
    cartCount,
    cart,
    setCart,
  } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken();
    setLogggedIn(!loggedIn);
    setLocalstorage();
    localStorage.clear();
    navigate("/");
  };

  return (
    <section className="flex flex-col border-b shadow bg-[#dfcdc9] h-auto">
      <nav className="flex flex-row p-5 ">
        <Link to={"/"} className="text-left text-xl p-3 font-semibold w-2/3">
          Daintree Store
        </Link>
        <div className="flex flex-col items-end justify-start w-1/3">
          <div className="flex flex-row items-center">
            {loggedIn ? (
              <button
                className="ml-3 mr-3 align-middle p-1 h-8 w-20 rounded-full bg-[#C8B8B4] text-white ease-in-out duration-300 hover:bg-white hover:text-black shadow"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  className="ml-3 mr-3 align-middle p-1 h-8 w-20 rounded-full bg-white text-black ease-in-out duration-300 hover:bg-[#C8B8B4] hover:text-white shadow"
                  to={"/login"}
                >
                  Login
                </Link>
                <Link
                  className="ml-3 mr-3 align-middle p-1 h-8 w-20 rounded-full bg-[#C8B8B4] text-white ease-in-out duration-300 hover:bg-white hover:text-black shadow"
                  to={"/create-new-user"}
                >
                  Register
                </Link>
              </>
            )}
            {loggedIn?.role !== "user" ? (
              ""
            ) : (
              <div className="relative block overflow-hidden py-1 px-4">
                {cartCount > 0 ? (
                  <span className="animate-bounce absolute left-8 top-7 bg-indigo-600 text-white text-center w-4 h-4 rounded-full border-transparent text-[10px] z-20">
                    {cartCount}
                  </span>
                ) : (
                  ""
                )}
                <Link className="ml-3 mr-3" to={"/cart"}>
                  <FaShoppingCart className="relative top-1 text-2xl z-10" />
                </Link>
              </div>
            )}
          </div>
          <ProfileBar />
        </div>
      </nav>
      {isHomePage ? <div className="flex flex-col ml-20 pb-8">
        <h3 className="self-start p-4 text-xl">It's time to spoil yourself</h3>
        <h1 className="self-start p-4 text-5xl leading-5">Get whatever</h1>
        <h2 className="self-start p-4 text-5xl leading-5">
          your heart desires.
        </h2>
      </div> : '' }
      
    </section>
  );
}

export default NavBar;

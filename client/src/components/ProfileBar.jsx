import React, { useContext } from "react";
import { UserContext } from "./context/UserContext";
import { useNavigate } from "react-router-dom";

const ProfileBar = () => {
  const { token, loggedIn, setStoreName } = useContext(UserContext);
  const navigate = useNavigate();

  const viewStore = () => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const requestOptions = {
      method: "GET",
      headers: headers,
      redirect: "follow",
    };

    fetch(
      `${import.meta.env.VITE_URL}/api/store/${loggedIn.uniqueStoreId}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setStoreName(result.store.name))
      .catch((error) => console.log("error", error));
    navigate("/admin");
  };

  const viewStores = () => {
    navigate("/admin/super");
  };

  return (
    <>
      <div className="flex flex-col p-3">
        <h1 className="italic text-slate-500 p-3">
          Logged in as {loggedIn?.role}
        </h1>
        {loggedIn?.role === "admin" ? (
          <button
            className="ml-1 mr-1 sm:ml-3 sm:mr-3 align-middle p-1 rounded-full bg-white text-black ease-in-out duration-300 hover:bg-[#C8B8B4] hover:text-white shadow"
            onClick={viewStore}
          >
            View Store
          </button>
        ) : (
          ""
        )}
        {loggedIn?.role === "super-admin" ? (
          <button
            className="ml-1 mr-1 sm:ml-3 sm:mr-3 align-middle p-1 rounded-full bg-[#C8B8B4] text-white ease-in-out duration-300 hover:bg-white hover:text-black shadow"
            onClick={viewStores}
          >
            View All Stores
          </button>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default ProfileBar;

import StoreOverview from "./StoreOverview";
import React, { useContext, useEffect } from "react";
import AddStoreForm from "./AddStoreForm";
import { UserContext } from "../components/context/UserContext";

function SuperAdminPage() {
  const { stores, addStore, setStores, token, deletedStoreB } =
    useContext(UserContext);
  const currentUser = "Best Admin of all";

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const requestOptions = {
      method: "GET",
      headers: headers,
      redirect: "follow",
    };

    fetch(`${import.meta.env.VITE_URL}/api/store`, requestOptions)
      .then((response) => response.json())
      .then((result) => setStores(result.data))
      .catch((error) => console.log("error", error));
  }, [addStore, deletedStoreB]);

  if (stores) {
    return (
      <>
        <header className="p-5 text-xl font-semibold">
          Welcome Almighty SuperAdmin {currentUser}
        </header>
        <AddStoreForm />
        <section className="grid  sm:grid-cols-4 mt-5 gap-4 px-4 py-4 bg-[#faf0e6] pt-5">
          {stores.map((s) => {
            return <StoreOverview key={s.uniqueStoreId} storeInfo={s} />;
          })}
        </section>
      </>
    );
  }
}

export default SuperAdminPage;

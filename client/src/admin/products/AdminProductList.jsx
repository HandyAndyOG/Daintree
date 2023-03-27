import AdminProduct from "./AdminProduct";
import AddProductForm from "./AddProductForm";

function AdminProductList({ products, storeName }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <header className="mb-3">The items in {storeName}</header>
      <AddProductForm />
      <section className="grid grid-cols-4 mt-5 ml-4 mr-4 gap-4">
        {products.map((p) => {
          return <AdminProduct key={p.id} product={p} />;
        })}
      </section>
    </div>
  );
}

export default AdminProductList;

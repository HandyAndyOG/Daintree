import CartItem from "./CartItem.jsx";
import { v4 as uuidv4 } from 'uuid';

let sumOfItems = 0;
function Cart({ products, removeFromCart }) {

  if (products?.length === 0) {
    return <h3>No items in cart, why not add some?</h3>;
  }
  return (
    <section className="flex flex-col sm:flex-row justify-center">
      <div className="flex flex-col items-center">
        {products?.map((p) => {
          sumOfItems += Number(p?.price.replace(/\$/gm, "")) * p.amount;
          return (
            <CartItem key={uuidv4()} product={p} removeFromCart={removeFromCart} />
          );
        })}
      </div>
      <div className="flex flex-col rounded shadow items-center p-4 mt-3">
        <h3 className="font-semibold mb-5">
          Total price for items: ${sumOfItems}
        </h3>
        <button className="mt-3 p-2 w-1/2 rounded-full bg-[#C8B8B4] text-white ease-in-out duration-300 hover:bg-white hover:text-black shadow">
          Checkout
        </button>
      </div>
    </section>
  );
}

export default Cart;

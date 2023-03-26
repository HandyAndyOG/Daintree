import './Cart.css';
function CartItem({product, removeFromCart}) {
  return (
      <article className='flex flex-row justify-between shadow rounded w-[300px] p-3 mt-3'>
        <section className='flex flex-col items-start leading-6 p-2'>
          <h2 className='font-semibold justify-self-start mb-2'>
            {product.title}
          </h2>
        <img className='mb-2' src={product.imageUrl} alt={"picture of product"}/>
          <h3>Quantity: {product.amount}</h3>
          <h3>Price: {product.price}</h3>
        </section>
        <button className='self-start justify-self-end px-2 rounded-full bg-[#C8B8B4] text-white ease-in-out duration-300 hover:bg-white hover:text-black shadow' onClick={() => removeFromCart(product.id)}>X</button>
      </article>
  )
}

export default CartItem;
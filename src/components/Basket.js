import {
  getCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../util/cart";
import { useState, useEffect } from "react";
import Router from "next/router";
function Basket() {
  const [cartItems, setCartItems] = useState([]);
  const handleClearCart = () => {
    clearCart();
    setCartItems([]);
  };
  useEffect(() => {
    setCartItems(getCart());
    const updateCart = () => {
      setCartItems(getCart());
    };
    window.addEventListener("storage", updateCart);

    return () => {
      window.removeEventListener("storage", updateCart);
    };
  }, []);

  const handleRemove = (productId) => {
    removeFromCart(productId);
    setCartItems(getCart());
  };

  const handleQuantityChange = (productId, event) => {
    updateQuantity(productId, Number(event.target.value));
    setCartItems(getCart());
  };

  return (
    <main className="bg-gray-100 min-h-screen p-5">
      <h2 className="text-center text-3xl mb-6">Your Cart</h2>

      {cartItems.length > 0 && (
        <div className="flex gap-2">
          <button
            className="bg-green-200 p-2 rounded"
            onClick={handleClearCart}
          >
            Clear Cart
          </button>
          <button
            className="bg-blue-500 p-2 rounded"
            onClick={() => Router.push("/checkout")}
          >
            Proceed to checkout
          </button>
        </div>
      )}
      {cartItems && cartItems.length > 0 ? (
        cartItems.map((item, index) => (
          <div
            className="bg-white p-4 my-2 rounded shadow-md text-gray-700"
            key={index}
          >
            <h3 className="font-semibold text-xl mb-2">{item.fields.title}</h3>
            <div className="flex items-center">
              <input
                className="border p-2 w-16"
                type="number"
                value={item.quantity}
                onChange={(e) => handleQuantityChange(item.sys.id, e)}
              />
              <button
                className="bg-red-500 text-white ml-4 px-4 py-2 rounded hover:bg-red-600 transition"
                onClick={() => handleRemove(item.sys.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-xl mt-5">Your cart is empty.</p>
      )}
    </main>
  );
}

export default Basket;

import {
  getCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  getCartTotal,
} from "../util/cart";
import { FaShoppingCart, FaTrashAlt, FaArrowRight } from "react-icons/fa";

import { useState, useEffect } from "react";
import Router from "next/router";
function Basket() {
  const [cartItems, setCartItems] = useState([]);
  const totalPrice = getCartTotal();
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
      <h2 className="text-center text-3xl mb-6">
        <FaShoppingCart className="inline-block mr-2" /> Your Cart
      </h2>

      {cartItems.length > 0 && (
        <div className="flex gap-2">
          <button
            className="flex items-center bg-green-200 p-2 rounded"
            onClick={handleClearCart}
          >
            Clear Cart
          </button>
          <button
            className="flex items-center bg-blue-500 p-2 rounded text-white"
            onClick={() => Router.push("/checkout")}
          >
            Proceed to checkout <FaArrowRight className="ml-2" />
          </button>
        </div>
      )}

      {cartItems.length > 0 && (
        <h3 className="text-center text-2xl mb-6">
          Total: £{totalPrice.toFixed(2)}
        </h3>
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
                className="flex items-center bg-red-500 text-white ml-4 px-4 py-2 rounded hover:bg-red-600 transition"
                onClick={() => handleRemove(item.sys.id)}
              >
                <FaTrashAlt className="mr-2" /> Remove
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-xl mt-5">
          <FaShoppingCart className="text-gray-400 mr-2" size={24} /> Your cart
          is empty.
        </p>
      )}
    </main>
  );
}

export default Basket;

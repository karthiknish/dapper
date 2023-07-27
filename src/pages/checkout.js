import { getCart, clearCart } from "../util/cart";
import { useState, useEffect } from "react";
import Router from "next/router";
function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState({});
  const [formAddress, setFormAddress] = useState({});
  const [authenticated, setAuthenticated] = useState(false);
  useEffect(() => {
    const email = localStorage.getItem("email");
    if (!email) {
      Router.push("/auth");
      return;
    }
    setAuthenticated(true);

    const userCart = getCart();
    if (userCart.length === 0) {
      Router.push("/");
      return;
    }
    setCartItems(userCart);

    fetch("/api/address", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.address) {
          setAddress(data.address);
        }
      })
      .catch((error) => {
        console.error("Error fetching address:", error);
      });
  }, []);
  const handleClearCart = () => {
    clearCart();
    setCartItems([]);
  };
  const autofillAddress = () => {
    setFormAddress(address);
  };

  const handleOrderSubmission = async (e) => {
    e.preventDefault();

    const { target } = e;
    const email = localStorage.getItem("email");

    const order = {
      name: target[0].value,
      addressLine1: target[1].value,
      addressLine2: target[2].value || null,
      city: target[3].value,
      state: target[4].value,
      zip: target[5].value,
      phone: target[6].value,
      cartItems: cartItems,
      email,
    };

    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, order }),
      });
      const data = await response.json();
      console.log(data);
      if (data.message === "Order submitted successfully") {
        handleClearCart();
        alert("Order successfully submitted!");
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("There was an error submitting the order:", error);
      alert("There was an error submitting your order. Please try again.");
    }
  };
  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Checkout</h1>
      {cartItems.length > 0 &&
        cartItems.map((item, index) => (
          <div
            className="bg-white p-4 my-2 flex items-center justify-between rounded shadow-md text-gray-700"
            key={index}
          >
            <h3 className="font-semibold text-xl mb-2">{item.fields.title}</h3>
            <div className="flex items-center">
              <p className="border p-2 w-16">{item.quantity}</p>
            </div>
          </div>
        ))}
      {console.log(address)}
      {address && address.addressLine1 && (
        <div
          className="bg-blue-100 p-4 my-4 rounded shadow-md cursor-pointer hover:bg-blue-200"
          onClick={autofillAddress}
        >
          <p>
            <strong>Saved Address:</strong>
          </p>
          <p>{address.name}</p>
          <p>{address.addressLine1}</p>
          {address.addressLine2 && <p>{address.addressLine2}</p>}
          <p>{address.city}</p>
          <p>{address.state}</p>
          <p>{address.zip}</p>
          <p>{address.phone}</p>
          <p className="text-sm italic">Click to autofill</p>
        </div>
      )}
      <form onSubmit={handleOrderSubmission}>
        <input
          type="text"
          placeholder="Full Name"
          value={formAddress.name || ""}
          onChange={(e) =>
            setFormAddress({ ...formAddress, name: e.target.value })
          }
          className="border rounded p-2 my-2 w-full"
          required
        />
        <input
          type="text"
          placeholder="Address Line 1"
          value={formAddress.addressLine1 || ""}
          onChange={(e) =>
            setFormAddress({ ...formAddress, addressLine1: e.target.value })
          }
          className="border rounded p-2 my-2 w-full"
          required
        />
        <input
          type="text"
          placeholder="Address Line 2"
          value={formAddress.addressLine2 || ""}
          onChange={(e) =>
            setFormAddress({ ...formAddress, addressLine2: e.target.value })
          }
          className="border rounded p-2 my-2 w-full"
        />
        <input
          type="text"
          placeholder="City"
          value={formAddress.city || ""}
          onChange={(e) =>
            setFormAddress({ ...formAddress, city: e.target.value })
          }
          className="border rounded p-2 my-2 w-full"
          required
        />
        <input
          type="text"
          placeholder="State"
          value={formAddress.state || ""}
          onChange={(e) =>
            setFormAddress({ ...formAddress, state: e.target.value })
          }
          className="border rounded p-2 my-2 w-full"
          required
        />
        <input
          type="text"
          placeholder="Zip Code"
          value={formAddress.zip || ""}
          onChange={(e) =>
            setFormAddress({ ...formAddress, zip: e.target.value })
          }
          className="border rounded p-2 my-2 w-full"
          required
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={formAddress.phone || ""}
          onChange={(e) =>
            setFormAddress({ ...formAddress, phone: e.target.value })
          }
          className="border rounded p-2 my-2 w-full"
          required
        />
        <button
          type="submit"
          className="mt-6 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Confirm Order
        </button>
      </form>
    </div>
  );
}

export default Checkout;

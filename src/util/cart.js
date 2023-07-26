export function getCart() {
  if (typeof window !== "undefined") {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
  }
}

export function addToCart(product) {
  const cart = getCart();

  const existingProduct = cart.find((item) => item.sys.id === product.sys.id);
  console.log(existingProduct);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    product.quantity = 1;
    cart.push(product);
  }

  if (typeof window !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
}

export function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter((item) => item.sys.id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function clearCart() {
  localStorage.removeItem("cart");
}

export function updateQuantity(productId, quantity) {
  const cart = getCart();
  const product = cart.find((item) => item.sys.id === productId);
  if (product) {
    product.quantity = quantity;
    localStorage.setItem("cart", JSON.stringify(cart));
  }
}

let cart = [];

// Add item to cart
function addToCart(item) {
  const existingItem = cart.find((cartItem) => cartItem.id === item.id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }
  renderCart();
}

// Remove item from cart
function removeFromCart(itemId) {
  cart = cart.filter((item) => item.id !== itemId);
  renderCart();
}

// Update item quantity
function updateQuantity(itemId, quantity) {
  cart = cart.map((item) =>
    item.id === itemId ? { ...item, quantity: Math.max(1, quantity) } : item
  );
  renderCart();
}

// Calculate total price
function calculateTotal() {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

// Render cart
function renderCart() {
  const cartContainer = document.getElementById("cart-container");
  const totalPrice = document.getElementById("total-price");

  cartContainer.innerHTML = ""; // Clear previous content
  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    totalPrice.textContent = "0";
    return;
  }

  cart.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";

    cartItem.innerHTML = `
      <div>
        <h3>${item.name}</h3>
        <p>$${item.price}</p>
      </div>
      <div class="quantity-control">
        <button onclick="updateQuantity('${item.id}', ${item.quantity - 1})">-</button>
        <span>${item.quantity}</span>
        <button onclick="updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
      </div>
      <button class="remove-btn" onclick="removeFromCart('${item.id}')">Remove</button>
    `;

    cartContainer.appendChild(cartItem);
  });

  totalPrice.textContent = calculateTotal();
}

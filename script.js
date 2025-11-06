const products = [
  { id: 1, name: "Koszulka DominikShop", price: 79.99 },
  { id: 2, name: "Kubek DominikShop", price: 39.99 },
  { id: 3, name: "Czapka DominikShop", price: 59.99 },
];

const productList = document.getElementById("products");
const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const closeCart = document.getElementById("close-cart");
const cartItems = document.getElementById("cart-items");
const totalDisplay = document.getElementById("total");
const cartCount = document.getElementById("cart-count");
const checkoutBtn = document.getElementById("checkout-btn");

let cart = [];

function renderProducts() {
  productList.innerHTML = "";
  products.forEach((p) => {
    const item = document.createElement("div");
    item.className = "product";
    item.innerHTML = `
      <h3>${p.name}</h3>
      <p>${p.price.toFixed(2)} PLN</p>
      <button onclick="addToCart(${p.id})">Dodaj do koszyka</button>
    `;
    productList.appendChild(item);
  });
}

function addToCart(id) {
  const product = products.find((p) => p.id === id);
  cart.push(product);
  updateCart();
}

function updateCart() {
  cartItems.innerHTML = "";
  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - ${item.price.toFixed(2)} PLN`;
    cartItems.appendChild(li);
  });

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  totalDisplay.textContent = total.toFixed(2);
  cartCount.textContent = cart.length;
}

cartBtn.addEventListener("click", () => cartModal.classList.remove("hidden"));
closeCart.addEventListener("click", () => cartModal.classList.add("hidden"));

checkoutBtn.addEventListener("click", async () => {
  const response = await fetch("https://YOUR-BACKEND-URL/create-checkout-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items: cart }),
  });
  const data = await response.json();
  window.location.href = data.url;
});

renderProducts();

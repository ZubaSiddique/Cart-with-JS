// ---------- LOAD CART ----------
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ---------- ADD TO CART ----------
function addToCart(name, price) {
  let item = cart.find(p => p.name === name);

  if (item) {
    item.qty++;
  } else {
    cart.push({ name, price, qty: 1 });
  }

  saveCart();
  updateCartCount();
}

// ---------- SAVE CART ----------
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// ---------- UPDATE CART ICON COUNT ----------
function updateCartCount() {
  let count = cart.reduce((sum, item) => sum + item.qty, 0);
  let el = document.getElementById("cartCount");
  if (el) el.innerText = count;
}

// ---------- INCREASE QTY ----------
function increaseQty(name) {
  let item = cart.find(p => p.name === name);
  item.qty++;
  saveCart();
  renderCartPage();
}

// ---------- DECREASE QTY ----------
function decreaseQty(name) {
  let item = cart.find(p => p.name === name);
  if (item.qty > 1) {
    item.qty--;
  }
  saveCart();
  renderCartPage();
}

// ---------- REMOVE ITEM ----------
function removeItem(name) {
  cart = cart.filter(item => item.name !== name);
  saveCart();
  renderCartPage();
}

// ---------- RENDER CART PAGE ----------
function renderCartPage() {
  let container = document.getElementById("cartItems");
  let total = 0;
  container.innerHTML = "";

  cart.forEach(item => {
    total += item.price * item.qty;

   container.innerHTML += `
  <div class="cart-item">

    <div class="item-info">
      <strong>${item.name}</strong>
      <span>${item.price} × ${item.qty}</span>
    </div>

    <div class="jsbuttons">
      <div class="box">
        <button class="qty-btn" onclick="decreaseQty('${item.name}')">-</button>
        ${item.qty}
        <button class="qty-btn" onclick="increaseQty('${item.name}')">+</button>
      </div>

      <button class="remove" onclick="removeItem('${item.name}')">Remove</button>
    </div>

  </div>
`;

  });

  document.getElementById("total").innerText = total;
}

updateCartCount();

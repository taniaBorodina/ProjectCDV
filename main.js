document.addEventListener("DOMContentLoaded", function () {
  const search = document.querySelector("#search-input");
  if (search) {
    search.addEventListener("input", function () {
      const searchTerm = search.value.toLowerCase();
      const cars = document.querySelectorAll(".product-title");
      cars.forEach(function (car) {
        const carTitle = car.innerText.toLowerCase();
        if (carTitle.includes(searchTerm)) {
          car.closest(".box").style.display = "block";
        } else {
          car.closest(".box").style.display = "none";
        }
      });
    });
  }

  // Hide Menu and Search box on Scroll
  window.onscroll = () => {
    if (search) {
      search.classList.remove("active");
    }
  };
});

const search = document.querySelector(".search-box");
if (search) {
  document.querySelector("#search-icon").onclick = () => {
    search.classList.toggle("active");
  };
}
// Hide Menu and Search box on Scroll
window.onscroll = () => {
  search.classList.remove("active");
};

// header

const header = document.querySelector("header");
window.addEventListener("scroll", () => {
  header.classList.toggle("shadow", window.scrollY > 0);
});
const sr = ScrollReveal({
  distance: "60px",
  duration: 2500,
  delay: 400,
  reset: true,
});
sr.reveal(".home-text", { delay: 200, origin: "top" });

// Cart Open Close

const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#close-cart");

// Open Cart
cartIcon.onclick = () => {
  cart.classList.add("active");
};

// Close Cart
closeCart.onclick = () => {
  cart.classList.remove("active");
};

// Add to cart

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  // remove Item from Cart
  const removeCartButtons = document.getElementsByClassName("cart-remove");
  for (let i = 0; i < removeCartButtons.length; i++) {
    const button = removeCartButtons[i];
    button.addEventListener("click", removeCartItem);
  }
  // Quantity Change
  const quantityInputs = document.getElementsByClassName("cart-quantity");
  for (let i = 0; i < quantityInputs.length; i++) {
    const input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }

  // Add to cart
  const addCart = document.getElementsByClassName("btn");
  for (let i = 0; i < addCart.length; i++) {
    const button = addCart[i];
    button.addEventListener("click", addCartClicked);
  }
  loadCartItems();
}
// remove Cart Item
function removeCartItem(event) {
  const buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  updateTotal();
  saveCartItems();
}
// Quantity Change
function quantityChanged(event) {
  const input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateTotal();
  saveCartItems();
  updateCartIcon();
}

// Add cart Function

function addCartClicked(event) {
  const button = event.target;
  const buyCar = button.parentElement;
  const title = buyCar.getElementsByClassName("product-title")[0].innerText;
  const price = buyCar.getElementsByClassName("price")[0].innerText;
  const carImg = buyCar.getElementsByClassName("car-img")[0].src;

  // Sprawdzenie, czy produkt już istnieje w koszyku
  if (isProductInCart(title)) {
    return;
  }
  addProductToCart(title, price, carImg);
  updateTotal();
  saveCartItems();
  updateCartIcon();
}
function addProductToCart(title, price, carImg) {
  const cartShopBox = document.createElement("div");
  cartShopBox.classList.add("cart-box");
  const cartItems = document.getElementsByClassName("cart-content")[0];
  const cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
  for (let i = 0; i < cartItemsNames.length; i++) {
    if (cartItemsNames[i].innerText == title) {
      return;
    }
  }
  const cartBoxContent = `<img src="${carImg}" alt="" class="cart-img" />
  <div class="detail-box">
    <div class="cart-product-title">${title}</div>
    <div class="cart-price">${price}</div>
    <input
      type="number"
      name=""
      id=""
      value ="1"
      class="cart-quantity"
    />
  </div>
  <i class="bx bx-trash-alt cart-remove"></i>`;
  cartShopBox.innerHTML = cartBoxContent;
  cartItems.append(cartShopBox);
  cartShopBox
    .getElementsByClassName("cart-remove")[0]
    .addEventListener("click", removeCartItem);
  cartShopBox
    .getElementsByClassName("cart-quantity")[0]
    .addEventListener("change", quantityChanged);
  saveCartItems();
  updateCartIcon();
}

// Total
function updateTotal() {
  const cartContent = document.getElementsByClassName("cart-content")[0];
  const cartBoxes = cartContent.getElementsByClassName("cart-box");
  let total = 0;
  for (let i = 0; i < cartBoxes.length; i++) {
    const cartBox = cartBoxes[i];
    const priceElement = cartBox.getElementsByClassName("cart-price")[0];
    const quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
    const price = parseFloat(priceElement.innerText.replace("$", ""));
    const quantity = quantityElement.value;
    total += price * quantity;
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("total-price")[0].innerText = "$" + total;
  // Save total to local storage

  localStorage.setItem("cartTotal", total);
}

// Keep Item after page refresh/ local storage
function saveCartItems() {
  const cartContent = document.getElementsByClassName("cart-content")[0];
  const cartBoxes = cartContent.getElementsByClassName("cart-box");
  const cartItems = [];

  for (let i = 0; i < cartBoxes.length; i++) {
    const cartBox = cartBoxes[i];
    const titleElement =
      cartBox.getElementsByClassName("cart-product-title")[0];
    const priceElement = cartBox.getElementsByClassName("cart-price")[0];
    const quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
    const carImg = cartBox.getElementsByClassName("cart-img")[0].src;

    const item = {
      title: titleElement.innerText,
      price: priceElement.innerText,
      quantity: quantityElement.value,
      carImg,
    };
    cartItems.push(item);
  }
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

// Loads In Cart

function loadCartItems() {
  let cartItems = localStorage.getItem("cartItems");
  if (cartItems) {
    cartItems = JSON.parse(cartItems);

    for (let i = 0; i < cartItems.length; i++) {
      const item = cartItems[i];
      addProductToCart(item.title, item.price, item.carImg);

      const cartBoxes = document.getElementsByClassName("cart-box");
      const cartBox = cartBoxes[cartBoxes.length - 1];
      const quantityElement =
        cartBox.getElementsByClassName("cart-quantity")[0];
      quantityElement.value = item.quantity;
    }
  }
  const cartTotal = localStorage.getItem("cartTotal");
  if (cartTotal) {
    document.getElementsByClassName("total-price")[0].innerText =
      "$" + cartTotal;
  }
  updateCartIcon();
}

// Quantity In Cart Icon
function updateCartIcon() {
  const cartBoxes = document.getElementsByClassName("cart-box");
  let quantity = 0;
  for (let i = 0; i < cartBoxes.length; i++) {
    const cartBox = cartBoxes[i];
    const quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
    quantity += parseInt(quantityElement.value);
  }
  const cartIcon = document.querySelector("#cart-icon");
  cartIcon.setAttribute("data-quantity", quantity);
}

// Check if the product is already in the cart
function isProductInCart (title) {
  const cartItems = document.querySelectorAll('.cart-product-title')
  for (let i = 0; i < cartItems.length; i++) {
    if (cartItems[i].innerText === title) {
      return true
    }
  }
  return false
}

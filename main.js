document.addEventListener("DOMContentLoaded", function () {
  let search = document.querySelector("#search-input");
  if (search) {
    search.addEventListener("input", function () {
      let searchTerm = search.value.toLowerCase();
      let cars = document.querySelectorAll(".product-title");
      cars.forEach(function (car) {
        let carTitle = car.innerText.toLowerCase();
        if (carTitle.includes(searchTerm)) {
          car.closest(".box").style.display = "block";
        } else {
          car.closest(".box").style.display = "none";
        }
      });
    });
  }

  //Hide Menu and Search box on Scroll
  window.onscroll = () => {
    if (search) {
      search.classList.remove("active");
    }
  };



});

let search = document.querySelector(".search-box");
if (search) {

document.querySelector("#search-icon").onclick = () => {
  search.classList.toggle("active");
};
}
//Hide Menu and Search box on Scroll
window.onscroll = () => {
  search.classList.remove("active");
};


// header

let header = document.querySelector("header");
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

let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

//Open Cart
cartIcon.onclick = () => {
  cart.classList.add("active");
};

//Close Cart
closeCart.onclick = () => {
  cart.classList.remove("active");
};

//Add to cart

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  //remove Item from Cart
  let removeCartButtons = document.getElementsByClassName("cart-remove");
  for (let i = 0; i < removeCartButtons.length; i++) {
    let button = removeCartButtons[i];
    button.addEventListener("click", removeCartItem);
  }
  //Quantity Change
  let quantityInputs = document.getElementsByClassName("cart-quantity");
  for (let i = 0; i < quantityInputs.length; i++) {
    let input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }

  //Add to cart
  let AddCart = document.getElementsByClassName("btn");
  for (let i = 0; i < AddCart.length; i++) {
    let button = AddCart[i];
    button.addEventListener("click", AddCartClicked);
  }
  loadCartItems();
}
//remove Cart Item
function removeCartItem(event) {
  let buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  updatetotal();
  saveCartItems();
}
//Quantity Change
function quantityChanged(event) {
  let input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updatetotal();
  saveCartItems();
  updateCartIcon();
}

//Add cart Function

function AddCartClicked(event) {
  let button = event.target;
  let buyCar = button.parentElement;
  let title = buyCar.getElementsByClassName("product-title")[0].innerText;
  let price = buyCar.getElementsByClassName("price")[0].innerText;
  let carImg = buyCar.getElementsByClassName("car-img")[0].src;
  addProductToCart(title, price, carImg);
  updatetotal();
  saveCartItems();
  updateCartIcon();
}
function addProductToCart(title, price, carImg) {
  let cartShopBox = document.createElement("div");
  cartShopBox.classList.add("cart-box");
  let cartItems = document.getElementsByClassName("cart-content")[0];
  let cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
  for (let i = 0; i < cartItemsNames.length; i++) {
    if (cartItemsNames[i].innerText == title) {
      alert("You have already added this item to cart!");
      return;
    }
  }
  let cartBoxContent = `<img src="${carImg}" alt="" class="cart-img" />
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

//Total
function updatetotal() {
  let cartContent = document.getElementsByClassName("cart-content")[0];
  let cartBoxes = cartContent.getElementsByClassName("cart-box");
  let total = 0;
  for (let i = 0; i < cartBoxes.length; i++) {
    let cartBox = cartBoxes[i];
    let priceElement = cartBox.getElementsByClassName("cart-price")[0];
    let quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
    let price = parseFloat(priceElement.innerText.replace("$", ""));
    let quantity = quantityElement.value;
    total += price * quantity;
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("total-price")[0].innerText = "$" + total;
  // Save total to local storage

  localStorage.setItem("cartTotal", total);
}

// Keep Item after page refresh/ local storage

function saveCartItems() {
  let cartContent = document.getElementsByClassName("cart-content")[0];
  let cartBoxes = cartContent.getElementsByClassName("cart-box");
  let cartItems = [];

  for (let i = 0; i < cartBoxes.length; i++) {
    cartBox = cartBoxes[i];
    let titleElement = cartBox.getElementsByClassName("cart-product-title")[0];
    let priceElement = cart.getElementsByClassName("cart-price")[0];
    let quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
    let carImg = cartBox.getElementsByClassName("cart-img")[0].src;

    let item = {
      title: titleElement.innerText,
      price: priceElement.innerText,
      quantity: quantityElement.value,
      carImg: carImg,
    };
    cartItems.push(item);
  }
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

//Loads In Cart

function loadCartItems() {
  let cartItems = localStorage.getItem("cartItems");
  if (cartItems) {
    cartItems = JSON.parse(cartItems);

    for (let i = 0; i < cartItems.length; i++) {
      let item = cartItems[i];
      addProductToCart(item.title, item.price, item.carImg);

      let cartBoxes = document.getElementsByClassName("cart-box");
      let cartBox = cartBoxes[cartBoxes.length - 1];
      let quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
      quantityElement.value = item.quantity;
    }
  }
  let cartTotal = localStorage.getItem("cartTotal");
  if (cartTotal) {
    document.getElementsByClassName("total-price")[0].innerText =
      "$" + cartTotal;
  }
  updateCartIcon();
}

// Quantity In Cart Icon
function updateCartIcon() {
  let cartBoxes = document.getElementsByClassName("cart-box");
  let quantity = 0;
  for (let i = 0; i < cartBoxes.length; i++) {
    let cartBox = cartBoxes[i];
    let quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
    quantity += parseInt(quantityElement.value);
  }
  let cartIcon = document.querySelector("#cart-icon");
  cartIcon.setAttribute("data-quantity", quantity);
}



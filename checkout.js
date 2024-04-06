document.addEventListener("DOMContentLoaded", function () {
  const $sumBtn = document.getElementById("btn_Sum");
  const closeCartIcon = document.getElementById("close_cart");
  const checkoutBtn = document.querySelector(".checkout-btn");
  const errorMessage = document.querySelector(".error-message");

  if ($sumBtn) {
    $sumBtn.addEventListener("click", () => {
      if (!ifCartEmpty()) {
        window.location.href = "checkout.html";
      } else {
        alert("Your cart is empty");
      }
    });
  }

  if (closeCartIcon) {
    closeCartIcon.addEventListener("click", () => {
      window.location.href = "index.html";
    });
  }

  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", function (event) {
      event.preventDefault();

      const nameInput = document.getElementById("name").value;
      const addressInput = document.getElementById("address").value;
      const deliveryDateInput = document.getElementById("delivery-date");
      const paymentMethod = document.querySelector(
        'input[name="payment"]:checked'
      );

      if (!paymentMethod || !deliveryDateInput.value) {
        errorMessage.innerText = "Please fill out all fields.";
        errorMessage.style.display = "block";
        return;
      }

      const nameParts = nameInput.match(/\S+/g);
      if (!nameParts || nameParts.length !== 2) {
        errorMessage.innerText =
          "Please enter your first and last name separated by a space.";
        errorMessage.style.display = "block";
        return;
      }

      if (
        nameInput.trim() !== "" &&
        addressInput.trim() !== "" &&
        paymentMethod
      ) {
        errorMessage.style.display = "none";
        saveFormData(
          nameInput,
          addressInput,
          deliveryDateInput.value,
          paymentMethod.value
        );
        window.location.href = "success.html";
      } else {
        errorMessage.style.display = "block";
        errorMessage.innerText = "Please fill out all fields.";
      }
    });
  }

  function ifCartEmpty() {
    const totalItems = document.querySelectorAll(".cart-box").length;
    return totalItems === 0;
  }

  function saveFormData(name, address, deliveryDate, payment) {
    localStorage.setItem(
      "formData",
      JSON.stringify({ name, address, deliveryDate, payment })
    );
  }

  const nameInput = document.getElementById("name");
  const addressInput = document.getElementById("address");
  const deliveryDateInput = document.getElementById("delivery-date");
  const paymentMethodInput = document.querySelector('input[name="payment"]');

  const storedName = localStorage.getItem("name");
  const storedAddress = localStorage.getItem("address");
  const storedDeliveryDate = localStorage.getItem("deliveryDate");
  const storedPaymentMethod = localStorage.getItem("paymentMethod");

  if (storedName) {
    nameInput.value = storedName;
  }
  if (storedAddress) {
    addressInput.value = storedAddress;
  }
  if (storedDeliveryDate) {
    deliveryDateInput.value = storedDeliveryDate;
  }
  if (storedPaymentMethod) {
    const selectedPaymentMethod = document.getElementById(storedPaymentMethod);
    if (selectedPaymentMethod) {
      selectedPaymentMethod.checked = true;
    }
  }

  const checkoutButton = document.getElementById("checkoutButton");
  if (checkoutButton) {
    checkoutButton.addEventListener("click", function () {
      const nameInputValue = nameInput.value.trim();
      const addressInputValue = addressInput.value.trim();
      const paymentMethodChecked = document.querySelector(
        'input[name="payment"]:checked'
      );

      if (
        nameInputValue !== "" &&
        addressInputValue !== "" &&
        paymentMethodChecked
      ) {
        nameInput.value = "";
        addressInput.value = "";
        deliveryDateInput.value = "";
        paymentMethodInput.checked = false;
        localStorage.removeItem("name");
        localStorage.removeItem("address");
        localStorage.removeItem("deliveryDate");
        localStorage.removeItem("paymentMethod");
        localStorage.removeItem("cartTotal");
      } else {
        errorMessage.style.display = "block";
        errorMessage.innerText =
          "Please fill out all fields and select a payment method.";
      }
    });
  }

  nameInput.addEventListener("input", function () {
    localStorage.setItem("name", nameInput.value);
  });

  addressInput.addEventListener("input", function () {
    localStorage.setItem("address", addressInput.value);
  });
  deliveryDateInput.addEventListener("input", function () {
    localStorage.setItem("deliveryDate", deliveryDateInput.value);
  });
  paymentMethodInput.addEventListener("change", function () {
    if (paymentMethodInput.checked) {
      localStorage.setItem("paymentMethod", paymentMethodInput.id);
    }
  });
});

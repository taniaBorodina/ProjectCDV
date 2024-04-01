document.addEventListener("DOMContentLoaded", function () {
  const $checkout_btn = document.getElementById("btn_Sum");
  const closeCartIcon = document.getElementById("close_cart");
  const checkoutBtn = document.querySelector(".checkout-btn");
  const errorMessage = document.querySelector(".error-message");
  const backToHome = document.querySelector(".sc-btn");

  if ($checkout_btn) {
    $checkout_btn.addEventListener("click", () => {
      if (!ifCartEmpty()) {
        window.location.href = "checkout.html"; // Przekierowanie na stronę podsumowania
      } else {
        alert("Your cart is empty");
      }
    });
  }

  if (closeCartIcon) {
    closeCartIcon.addEventListener("click", () => {
      window.location.href = "index.html"; // Przekierowanie do koszyka
    });
  }

  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", function (event) {
      event.preventDefault(); // Zapobieganie domyślnej akcji przycisku

      // Pobieranie wartości pól z formularza
      const nameInput = document.getElementById("name").value;
      const addressInput = document.getElementById("address").value;
      const paymentMethod = document.querySelector(
        'input[name="payment"]:checked'
      );
      // Walidacja imienia i nazwiska
      const nameParts = nameInput.split(" ");
      if (nameParts.length !== 2) {
        errorMessage.innerText =
          "Please enter your first and last name separated by a space.";
        errorMessage.style.display = "block";
        return;
      }

      // Sprawdzanie czy pola są wypełnione
      if (
        nameInput.trim() !== "" &&
        addressInput.trim() !== "" &&
        paymentMethod
      ) {
        // Ukrywanie komunikatu o błędzie
        errorMessage.style.display = "none";
        // Zapisanie danych w localStorage
        saveFormData(nameInput, addressInput, paymentMethod.value);
        window.location.href = "success.html";
      } else {
        // Wyświetlanie komunikatu o błędzie
        errorMessage.style.display = "block";
      }
    });
  }

  function ifCartEmpty() {
    const totalItems = document.querySelectorAll(".cart-box").length;
    return totalItems === 0;
  }

  // Zapisywanie danych formularza do localStorage
  function saveFormData(name, address, payment) {
    localStorage.setItem(
      "formData",
      JSON.stringify({ name, address, payment })
    );
  }

  // Wczytywanie danych formularza z localStorage
  function loadFormData() {
    const formData = JSON.parse(localStorage.getItem("formData"));
    if (formData) {
      document.getElementById("name").value = formData.name;
      document.getElementById("address").value = formData.address;
      const paymentMethod = document.querySelector(
        `input[value="${formData.payment}"]`
      );
      if (paymentMethod) {
        paymentMethod.checked = true;
      }
    }
  }

  // Wczytywanie danych z localStorage po załadowaniu strony
  loadFormData();
});


// Nasłuchiwanie dla przycisku backToHome 
const backToHome = document.querySelector(".sc-btn");
if (backToHome) {
  backToHome.addEventListener("click", () => {
    window.location.href = "index.html";
  });
}

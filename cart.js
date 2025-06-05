document.addEventListener("DOMContentLoaded", function () {
  let cartBody = document.getElementById("cartBody");
  let subtotalElem = document.getElementById("subtotal");
  let taxElem = document.getElementById("tax");
  let shippingElem = document.getElementById("shipping");
  let grandTotalElem = document.getElementById("grandTotal");
  let taxRateInput = document.getElementById("taxRate");
  let shippingThresholdInput = document.getElementById("shippingThreshold");
  let clearCartBtn = document.getElementById("clearCart");

  let cartData = [...cart]; // clone cart from data.js

  function calculateTotal(quantity, price) {
    return quantity * price;
  }

  function outputCartRow(item, total, index) {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${item.product}</td>
      <td>${item.price.toFixed(2)}</td>
      <td>${item.quantity}</td>
      <td>${total.toFixed(2)}</td>
      <td><button class="removeBtn" data-index="${index}">Remove</button></td>
    `;
    cartBody.appendChild(row);
  }

  function updateCart() {
    cartBody.innerHTML = "";
    let subtotal = 0;

    cartData.forEach((item, index) => {
      const total = calculateTotal(item.quantity, item.price);
      subtotal += total;
      outputCartRow(item, total, index);
    });

    let taxRate = parseFloat(taxRateInput.value) || 0;
    let threshold = parseFloat(shippingThresholdInput.value) || 0;

    let tax = subtotal * (taxRate / 100);
    let shipping = subtotal < threshold ? 40 : 0;
    let grandTotal = subtotal + tax + shipping;

    subtotalElem.textContent = subtotal.toFixed(2);
    taxElem.textContent = tax.toFixed(2);
    shippingElem.textContent = shipping.toFixed(2);
    grandTotalElem.textContent = grandTotal.toFixed(2);

    document.querySelectorAll(".removeBtn").forEach(button => {
      button.addEventListener("click", function () {
        const index = parseInt(this.getAttribute("data-index"));
        cartData.splice(index, 1);
        updateCart();
      });
    });
  }

  taxRateInput.addEventListener("input", updateCart);
  shippingThresholdInput.addEventListener("input", updateCart);

  clearCartBtn.addEventListener("click", () => {
    cartData = [];
    updateCart();
  });

  updateCart();
});
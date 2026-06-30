const decreaseBtn = document.getElementById("decrease");
const increaseBtn = document.getElementById("increase");

const quantityInput = document.getElementById("quantity");

decreaseBtn.addEventListener("click", () => {
  if (parseInt(quantityInput.value, 10) > 0) {
    quantityInput.stepDown();
  }
});

increaseBtn.addEventListener("click", () => {
  quantityInput.stepUp();
});

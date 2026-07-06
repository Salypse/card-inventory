const title = document.getElementById("password-title");
const form = document.getElementById("password-form");
const container = document.getElementById("password-check");
const passwordCloseBtn = document.getElementById("password-close");

//Elements that cant be foccusble when password check is enabled
const nav = document.querySelector("nav");
const filter = document.getElementById("filter") || "";
const inventoryCards = document.getElementById("inventory-cards") || "";
const searchBar = document.getElementById("search-bar") || "";

function openPasswordCheck(type, id, name) {
  nav.inert = true;
  filter.inert = true;
  inventoryCards.inert = true;
  searchBar.inert = true;

  //Remove previously generated inputs before new ones are added
  form.querySelectorAll(".generated-hidden-input").forEach((input) => {
    input.remove();
  });

  //Use edit form details in type === Edit password check forms
  if (type === "Edit") {
    const editForm = document.getElementById("edit-form");
    const formData = new FormData(editForm);

    formData.forEach((value, key) => {
      const hiddenInput = document.createElement("input");
      hiddenInput.type = "hidden";
      hiddenInput.value = value;
      hiddenInput.name = key;
      hiddenInput.classList.add("generated-hidden-input");

      form.append(hiddenInput);
    });
  } else {
    //Create required cardId hidden input for actions that dont have a visible form (e.g. Delete)

    const idHiddenInput = document.createElement("input");
    idHiddenInput.type = "hidden";
    idHiddenInput.value = id;
    idHiddenInput.name = "cardId";
    idHiddenInput.classList.add("generated-hidden-input");
    document.body.style.overflow = "hidden";

    form.append(idHiddenInput);
  }
  //Update form details to match clicked card
  title.textContent = `${type} ${name}`;
  form.action = `/${id}/${type.toLowerCase()}`;
  container.style.display = "flex";
}
passwordCloseBtn.addEventListener("click", () => {
  nav.inert = false;
  filter.inert = false;
  inventoryCards.inert = false;
  searchBar.inert = false;

  container.style.display = "none";
  document.body.style.overflow = "visible";
});

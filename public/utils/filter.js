const toggleFilterOnBtn = document.getElementById("toggle-filter-on");
const toggleFilterOffBtn = document.getElementById("toggle-filter-off");

const filter = document.getElementById("filter") || "";

const inventory = document.getElementById("inventory-cards");
const inventorySearch = document.getElementById("inventory-search");
//Open or close filter on button press
toggleFilterOnBtn.addEventListener("click", () => {
  filter.style.top = `${nav.offsetHeight}px`;
  filter.style.display = filter.style.display === "flex" ? "none" : "flex";

  //Make background elements not focussable
  inventory.inert = true;
  inventorySearch.inert = true;
});

toggleFilterOffBtn.addEventListener("click", () => {
  filter.style.display = filter.style.display === "flex" ? "none" : "flex";

  //Reenable foccusable inventory elements
  inventory.inert = false;
  inventorySearch.inert = false;
});

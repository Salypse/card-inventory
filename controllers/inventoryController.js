const db = require("../db/queries");
const { createSqlQuery } = require("../public/utils/createSqlQuery");

const inputFields = {
  games: ["Pokemon", "Lorcana", "Magic"],
  conditions: [
    "Mint",
    "Near Mint",
    "Lightly Played",
    "Moderatly Played",
    "Heavily Played",
    "Damaged",
  ],
  sortOptions: [
    { value: "nameAsc", text: "Name (A-Z)" },
    { value: "nameDesc", text: "Name (Z-A)" },
    { value: "quantityAsc", text: "Quantity (Low-High)" },
    { value: "quantityDesc", text: "Quantity (High-Low)" },
  ],
};

async function inventoryPageGet(req, res, next) {
  const { sqlQuery, values } = createSqlQuery(req.query || {});

  const cards = await db.searchInventory(sqlQuery, values);
  res.render("inventory", {
    cards: cards,
    filter: req.query,
    inputFields: inputFields,
  });
}

async function inventoryPost(req, res, next) {
  const data = req.body;
  await db.insertNewInventory(data);
  res.redirect("/");
}

async function deleteInventory(req, res, next) {
  const { cardId, password } = req.body;

  if (password !== process.env.ADMIN_PASSWORD) {
    const cards = await db.getAllInventory();

    return res.render("inventory", {
      error: {
        type: "password",
        text: "Card was not deleted.",
      },
      filter: {},
      cards: cards,
      inputFields: inputFields,
    });
  } else {
    await db.deleteInventory(Number(cardId));
    return res.redirect("/");
  }
}

async function editPageGet(req, res, next) {
  const { id } = req.params;
  const card = await db.getSingleCard(id);
  res.render("edit", { card: card });
}

async function editCardPost(req, res, next) {
  const { cardId, password } = req.body;

  if (password !== process.env.ADMIN_PASSWORD) {
    const card = await db.getSingleCard(cardId);

    return res.render("edit", {
      card: card,
      error: { type: "password", text: "Card was not edited." },
    });
  } else {
    await db.editCard(req.body);
    return res.redirect("/");
  }

  //make password check form submit data for delete and updated data for edit form
}

module.exports = {
  inventoryPageGet,
  inventoryPost,
  deleteInventory,
  editPageGet,
  editCardPost,
};

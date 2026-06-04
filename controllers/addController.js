const cardsService = require("../services/cardService");

async function addGet(req, res, next) {
  const { searchName, searchGame } = req.query;
  let cards = [];

  if (searchName && searchGame) {
    cards = await cardsService.searchCards(searchName, searchGame);
  }

  res.render("add", { cards });
}

module.exports = {
  addGet,
};

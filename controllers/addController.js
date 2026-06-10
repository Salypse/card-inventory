const cardsService = require("../services/cardService");

async function addGet(req, res, next) {
  const { searchName, searchGame } = req.query;

  if (searchName && searchGame) {
    const result = await cardsService.searchCards(searchName, searchGame);

    //Check if error occured during api call
    if (result.success) {
      return res.render("add", { cards: result.cards, error: null });
    } else if (!result.success) {
      return res.render("add", { cards: null, error: result.error });
    }
  }

  res.render("add", { cards: null, error: null });
}

function addInventoryFormGet(req, res, next) {
  const card = req.body;
  res.render("addInventoryForm", { card: card });
}

module.exports = {
  addGet,
  addInventoryFormGet,
};

const lorcanaService = require("./lorcanaService");
const pokemonService = require("./pokemonService");
const magicService = require("./magicService");

const services = {
  lorcana: lorcanaService,
  pokemon: pokemonService,
  magic: magicService,
};

async function searchCards(name, game) {
  const service = services[game];

  return service.searchCards(name);
}

module.exports = { searchCards };

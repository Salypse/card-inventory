async function searchCards(name) {
  try {
    const response = await fetch(
      `https://api.lorcana-api.com/cards/fetch?search%3Dname~${name}`,
    );
    const result = await response.json();

    //Format each card to universal key names
    let cards = [];
    for (const card of result) {
      cards.push({
        name: card.Name,
        game: "lorcana",
        set: card.Set_Name,
        type: card.Type,
        element: card.Color,
        rarity: card.Rarity,
        num: card.Card_Num,
        image: card.Image,
      });
    }
    return cards;
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = { searchCards };

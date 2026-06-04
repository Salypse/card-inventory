async function searchCards(name) {
  try {
    const response = await fetch(
      `https://api.scryfall.com/cards/search?q=name=${name}`,
    );
    const result = await response.json();

    //Format each card to universal key names
    let cards = [];
    for (const card of result.data) {
      if (card.card_faces) {
        //Gets front face of double sided card
        const multifacedCardFront = card.card_faces[0];
        cards.push({
          name: multifacedCardFront.name,
          game: "magic",
          set: card.set_name,
          type: multifacedCardFront.type_line,
          element: multifacedCardFront.colors,
          rarity: card.rarity,
          num: card.collector_number,
          image: multifacedCardFront.image_uris.normal,
        });
      } else {
        cards.push({
          name: card.name,
          game: "magic",
          set: card.set_name,
          type: card.type_line,
          element: card.colors,
          rarity: card.rarity,
          num: card.collector_number,
          image: card.image_uris.normal,
        });
      }
    }
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = { searchCards };

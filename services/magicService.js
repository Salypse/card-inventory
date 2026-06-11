async function searchCards(name) {
  try {
    const response = await fetch(
      `https://api.scryfall.com/cards/search?q=name=${name}`,
    );
    const result = await response.json();

    if (!response.ok || result.object === "error") {
      //Avoid magic throwing error for no cards found
      if (result.code === "not_found") {
        return {
          success: true,
          cards: [],
        };
      }
      return {
        success: false,
        error: `Error ${result.status}: ${result.details}`,
      };
    }

    //Format each card to universal key names
    let cards = [];
    for (const card of result.data) {
      if (card.card_faces) {
        //Gets front face of double sided card
        const multifacedCardFront = card.card_faces[0];
        cards.push({
          name: multifacedCardFront.name,
          game: "Magic",
          set: card.set_name,
          type: multifacedCardFront.type_line,
          element: multifacedCardFront.colors,
          rarity: capitalizeRarity(card.rarity),
          num: card.collector_number,
          image: multifacedCardFront.image_uris !== undefined ? multifacedCardFront.image_uris.normal : card.image_uris.normal,
        });
      } else {
        cards.push({
          name: card.name,
          game: "Magic",
          set: card.set_name,
          type: card.type_line,
          element: card.colors,
          rarity: capitalizeRarity(card.rarity),
          num: card.collector_number,
          image: card.image_uris.normal,
        });
      }
    }

    return {
      success: true,
      cards: cards,
    };
  } catch (error) {
    console.error(`Magic API Failed: ${error}`);

    return {
      success: false,
      error: "Error: Unable to contact card database.",
    };
  }
}

function capitalizeRarity(str) {
  return str[0].toUpperCase() + str.slice(1);
}

module.exports = { searchCards };

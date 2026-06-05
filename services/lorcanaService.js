async function searchCards(name) {
  try {
    const response = await fetch(
      `https://api.lorcana-api.com/cards/fetch?search=name~${name}`,
    );
    const result = await response.json();

    if (!response.ok || result.object === "error") {
      return {
        success: false,
        error: `Error ${result.status}: ${result.details}`,
      };
    }

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

    return {
      success: true,
      cards: cards,
    };
  } catch (error) {
    console.error(`Lorcana API Failed: ${error}`);

    return {
      success: false,
      error: "Error: Unable to contact card database.",
    };
  }
}

module.exports = { searchCards };

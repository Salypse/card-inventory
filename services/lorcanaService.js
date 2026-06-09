async function searchCards(name) {
  try {
    const response = await fetch(
      `https://api.lorcast.com/v0/cards/search?q=${name}`,
    );
    const result = await response.json();

    if (!response.ok || result.error) {
      return {
        success: false,
        error: `Error: ${result.error}`,
      };
    }

    //Format each card to universal key names
    let cards = [];
    for (const card of result.results) {
      cards.push({
        name: `${card.name}${card.version ? ` ${card.version}` : ""}`,
        game: "lorcana",
        set: card.set.name,
        type: card.type[0],
        element: card.inks,
        rarity: card.rarity,
        num: card.collector_number,
        image: card.image_uris.digital.normal,
        card_id: card.id,
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

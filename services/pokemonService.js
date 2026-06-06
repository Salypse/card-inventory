async function searchCards(name) {
  try {
    const response = await fetch(
      `https://api.pokemontcg.io/v2/cards?q=name:"${name}"`,
    );
    const result = await response.json();

    if (!response.ok || result.error) {
      return {
        success: false,
        error: `Error ${result.error.code}: ${result.error.message}`,
      };
    }

    //Format each card to universal key names
    let cards = [];
    for (const card of result.data) {
      cards.push({
        name: card.name,
        game: "pokemon",
        set: card.set.name,
        type: card.supertype,
        element: card.types || "",
        rarity: card.rarity || "",
        num: card.number,
        image: card.images.small,
      });
    }

    return {
      success: true,
      cards: cards,
    };
  } catch (error) {
    console.error(`Pokemon API Failed: ${error}`);

    return {
      success: false,
      error: "Error: Unable to contact card database.",
    };
  }
}

module.exports = { searchCards };

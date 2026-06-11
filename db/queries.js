const pool = require("./pool");

async function insertNewInventory(data) {
    await pool.query(
        "INSERT INTO inventory (name, game, image, card_condition, is_foil, quantity) VALUES ($1, $2, $3, $4, $5, $6)", 
        [data.cardName, data.cardGame, data.image, data.condition, data.isFoil !== undefined ? true : false, data.quantity ])
}

async function searchInventory(name) {
    const result =  await pool.query("SELECT * FROM inventory WHERE name ILIKE $1", [`%${name}%`])
    return result.rows
}

module.exports = { insertNewInventory, searchInventory }

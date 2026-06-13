const pool = require("./pool");

async function insertNewInventory(data) {
    await pool.query(
        "INSERT INTO inventory (name, game, image, condition, is_foil, quantity) VALUES ($1, $2, $3, $4, $5, $6)", 
        [data.cardName, data.cardGame, data.image, data.condition, data.isFoil !== undefined ? true : false, data.quantity ])
}

async function searchInventory(query, params) {
    const result =  await pool.query(query, params)
    return result.rows
}

async function getSingleCard(id) {
    const result = await pool.query("SELECT * FROM inventory WHERE id = $1", [id])
    return result.rows[0]
}



async function deleteInventory(id) {
    await pool.query("DELETE FROM inventory WHERE id = $1",  [id])
}

async function editCard(data) {
    await pool.query(
        "UPDATE inventory SET name = $1, game = $2, image = $3, condition = $4, is_foil = $5, quantity = $6 WHERE id = $7",
        [data.cardName, data.cardGame, data.image, data.condition, data.isFoil !== undefined ? true : false, data.quantity, data.id])
}

module.exports = { 
    insertNewInventory,
    searchInventory, 
    deleteInventory,
    getSingleCard,
    editCard }

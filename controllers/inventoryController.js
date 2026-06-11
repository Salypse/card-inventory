const db = require("../db/queries")

async function inventoryPageGet(req, res, next) {
    res.render("inventory")
}

async function inventoryPost(req,res,next){
    const data = req.body
    await db.insertNewInventory(data)
    res.redirect("/inventory")
}

async function inventorySearch(req,res,next) {
    const { cardName} = req.query
    const cards = await db.searchInventory(cardName)
    res.render("inventory", {cards: cards})
}

module.exports = { inventoryPageGet, inventoryPost, inventorySearch }
const db = require("../db/queries")

async function inventoryPageGet(req, res, next) {
    let cards = []
    const { searchName } = req.query

    if (searchName) {
        cards = await db.searchInventory(searchName)
    } else {
        cards = await db.getAllCards()
    }

    res.render("inventory", { cards: cards})
}

async function inventoryPost(req,res,next){
    const data = req.body
    await db.insertNewInventory(data)
    res.redirect("/")
}

async function deleteInventory(req, res, next) {   
    const { id } = req.params
    await db.deleteInventory(id)
    res.redirect("/")
}

async function editPageGet(req,res,next) {
    const { id } = req.params
    const card = await db.getSingleCard(id)
    res.render("edit", { card: card})
}

async function editCardPost(req,res,next) {
    const data = req.body
    await db.editCard(data)
    res.redirect("/")
}

module.exports = { inventoryPageGet, inventoryPost, deleteInventory, editPageGet, editCardPost }
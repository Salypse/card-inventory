const db = require("../db/queries")
const { createSqlQuery } = require("../public/utils/createSqlQuery")

async function inventoryPageGet(req, res, next) {
    const {sqlQuery, values} = createSqlQuery(req.query)

    const cards = await db.searchInventory(sqlQuery, values)
    res.render("inventory", { 
        cards: cards, 
        filter: req.query, 
        inputFields: inputFields = {
            games: ["Pokemon", "Lorcana", "Magic"],
            conditions: ["Mint", "Near Mint", "Lightly Played", "Moderatly Played", "Heavily Played", "Damaged"],
            sortOptions: [
                {value: "nameAsc", text: "Name (A-Z)"},
                {value: "nameDesc", text: "Name (Z-A)"},
                {value: "quantityAsc", text: "Quantity (Low-High)"},
                {value: "quantityDesc", text: "Quantity (High-Low)"}
            ]
        }
    })
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
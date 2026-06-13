const db = require("../db/queries")

async function inventoryPageGet(req, res, next) {
    let sqlQuery = "SELECT * FROM inventory "
    const whereConditions = []
    const params = []

    const filter = req.query
    
    //Check if any conditions are added
    if (filter.searchName) {
        params.push(`%${filter.searchName}%`)
        whereConditions.push(`name ILIKE $${params.length}`)
    }

    if (filter.game) {
        params.push(`%${filter.game}%`)
        whereConditions.push(`game ILIKE $${params.length}`)
    }

    //Add conditions to sqlQuery
    if (whereConditions.length >= 1) {
        sqlQuery += "WHERE " + whereConditions.join(" AND ")
    }

    const cards = await db.searchInventory(sqlQuery, params)
    res.render("inventory", { cards: cards, filter: filter})
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
const db = require("../db/queries")

async function inventoryPost(req,res,next){
    const data = req.body
    await db.insertNewInventory(data)
    res.redirect("/")
}

module.exports = { inventoryPost }
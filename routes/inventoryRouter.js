const express = require("express")
const inventoryRouter = express.Router()
const inventoryController = require("../controllers/inventoryController")

inventoryRouter.get("/", inventoryController.inventoryPageGet)
inventoryRouter.post("/", inventoryController.inventoryPost)

inventoryRouter.get("/search", inventoryController.inventorySearch)

inventoryRouter.get("/:id/delete", inventoryController.deleteInventory)


module.exports = inventoryRouter
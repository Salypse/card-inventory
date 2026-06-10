const express = require("express")
const inventoryRouter = express.Router()
const inventoryController = require("../controllers/inventoryController")

inventoryRouter.post("/", inventoryController.inventoryPost)

module.exports = inventoryRouter
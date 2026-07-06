const express = require("express");
const inventoryRouter = express.Router();
const inventoryController = require("../controllers/inventoryController");

inventoryRouter.get("/", inventoryController.inventoryPageGet);
inventoryRouter.post("/", inventoryController.inventoryPost);

inventoryRouter.post("/:id/delete", inventoryController.deleteInventory);

inventoryRouter.get("/:id/edit", inventoryController.editPageGet);
inventoryRouter.post("/:id/edit", inventoryController.editCardPost);

module.exports = inventoryRouter;

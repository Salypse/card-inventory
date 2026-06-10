const express = require("express");
const addRouter = express.Router();
const addController = require("../controllers/addController");

addRouter.get("/", addController.addGet);
addRouter.post("/form", addController.addInventoryFormGet);

module.exports = addRouter;

const express = require("express");
const Menu = require("../models/menu");
const menuController = require("../controllers/menuControllers");
const router = express.Router();

// get all menu items
router.get("/", menuController.getAllMenuItems);
router.post("/", menuController.postMenuItem);
router.delete('/:id', menuController.deleteMenuItem);
router.get('/:id', menuController.singleMenuItem);
router.patch('/:id', menuController.updateMenuItem)

module.exports = router;

const express = require("express");
const Carts = require("../models/carts");
const cartController = require("../controllers/cartControllers");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken")

// get all cart items
router.get("/",verifyToken, cartController.getCartByEmail);
router.post("/", cartController.addToCart);
router.delete("/:id", cartController.deleteCart);
router.put("/:id", cartController.updateCart);
router.get("/:id", cartController.getSingleCart);

module.exports = router;

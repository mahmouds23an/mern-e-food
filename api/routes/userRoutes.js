const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControllers");
const verifyToken = require("../middleware/verifyToken");
const verifyAdmin = require("../middleware/verifyAdmin");

router.get("/", verifyToken, verifyAdmin, userController.getAllUsers);
router.post("/", userController.createUser);
router.delete("/:id", userController.deleteUser);
router.put("/:id", userController.updateUser);
router.get("/admin/:email", verifyToken, userController.getAdmin);
router.patch("/admin/:id", verifyToken, userController.makeAdmin);

module.exports = router;
 
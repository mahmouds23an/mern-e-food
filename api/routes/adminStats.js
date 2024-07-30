const express = require("express");
const router = express.Router();

// import models
const User = require("../models/users");
const Menu = require("../models/menu");
const Payment = require("../models/payments");

// middleware
const verifyToken = require("../middleware/verifyToken");
const verifyAdmin = require("../middleware/verifyAdmin");

// get all orders, users, payments and menu items length
router.get("/", async (req, res) => {
  try {
    const users = await User.countDocuments();
    const menuItems = await Menu.countDocuments();
    const orders = await Payment.countDocuments();
    const result = await Payment.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$price",
          },
        },
      },
    ]);
    const revenue = result.length > 0 ? result[0].totalRevenue : 0;
    res.status(200).json({
      users,
      menuItems,
      orders,
      revenue,
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;

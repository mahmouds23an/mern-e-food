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
    const result = await Payment.aggregate([
      {
        $unwind: "$menuItems",
      },
      {
        $lookup: {
          from: "menus",
          localField: "menuItems",
          foreignField: "_id",
          as: "menuItemDetails",
        },
      },
      {
        $unwind: "$menuItemDetails",
      },
      {
        $group: {
          _id: "$menuItemDetails.category",
          quantity: {
            $sum: "$quantity",
          },
          revenue: { $sum: "$price" },
        },
      },
      {
        $project: {
          _id: 0,
          category: "$_id",
          quantity: "$quantity",
          revenue: "$revenue",
        },
      },
    ]);
    const revenue = result.length > 0 ? result[0].totalRevenue : 0;
    res.json(result);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;

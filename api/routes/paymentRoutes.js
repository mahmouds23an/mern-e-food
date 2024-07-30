const express = require("express");
const mongoose = require("mongoose");
const Payment = require("../models/payments");
const Cart = require("../models/carts");
const ObjectId = mongoose.Types.ObjectId;
const router = express.Router();

// token
const verifyToken = require("../middleware/verifyToken");

// all payment processes
router.post("/", verifyToken, async (req, res) => {
  const payment = req.body;
  try {
    const paymentRequest = await Payment.create(payment);
    // delete items from cart after success of payment
    const cartIds = payment.cartItems.map((id) => new ObjectId(id));
    const deletedCartRequest = await Cart.deleteMany({ _id: { $in: cartIds } });
    res.status(200).json({ paymentRequest, deletedCartRequest });
  } catch (err) {
    console.log(err.message);
  }
});

router.get("/", verifyToken, async (req, res) => {
  const email = req.query.email;
  const query = { email: email };
  try {
    const decodedEmail = req.decoded.email;
    if (email !== decodedEmail) {
      res.status(403).json("Forbidden access");
    }
    const result = await Payment.find(query).sort({ createdAt: -1 }).exec();
    res.status(200).json(result);
  } catch (err) {
    console.log(err.message);
  }
});

// get all payments
router.get("/all", async (req, res) => {
  try {
    const payments = await Payment.find({}).sort({ createdAt: -1 }).exec();
    res.status(200).json(payments);
  } catch (err) {
    console.log(err.message);
  }
});

// confirm payments status
router.patch("/:id", async (req, res) => {
  const payId = req.params.id;
  const { status } = req.body;
  try {
    updatedStatus = await Payment.findByIdAndUpdate(
      payId,
      { status: "confirmed" },
      { new: true, runValidators: true }
    );
    if (!updatedStatus) {
      return res.status(404).json("Payment not found");
    }
    res.status(200).json(updatedStatus);
  } catch (err) {
    console.log(err.message);
  }
});

// delete a payment process
router.delete("/:id", async (req, res) => {
  const payId = req.params.id;
  const { status } = req.body;
  try {
    deletedPay = await Payment.findByIdAndDelete(
      payId,
      {
        status: "confirmed",
      },
      { new: true, runValidators: true }
    );
    if (!deletedPay) {
      return res.status(404).json("Pay not found");
    }
    res.status(200).json("Pay deleted successfully");
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;

const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const port = process.env.PORT || 6001;
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Middleware
app.use(cors());
app.use(express.json());

// Mongodb 
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@mern-e-shop.dgydqw0.mongodb.net/mern-e-shop?retryWrites=true&w=majority&appName=mern-e-shop`
  )
  .then(console.log("Connected successfully to mongodb"))
  .catch((err) => console.log(err));

// jwt authentication
app.post("/jwt", async (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1hr",
  });
  res.send({ token });
});

// Import routes
const menuRoutes = require("./routes/menuRoutes");
app.use("/menu", menuRoutes);

const cartRoutes = require("./routes/cartRoutes");
app.use("/carts", cartRoutes);

const userRoutes = require("./routes/userRoutes");
app.use("/users", userRoutes);

const paymentRoutes = require("./routes/paymentRoutes");
app.use("/payments", paymentRoutes);

const adminStats = require("./routes/adminStats");
app.use("/adminStats", adminStats);

const orderStats = require("./routes/orderStats");
app.use("/orderStats", orderStats);

// Server connection
app.listen(port, () => {
  console.log("Server connected successfully");
});

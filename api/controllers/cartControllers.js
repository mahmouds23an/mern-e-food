const Carts = require("../models/carts");

// get cards using email
const getCartByEmail = async (req, res) => {
  try {
    const email = req.query.email;
    const filter = { email: email };
    const result = await Carts.find(filter).exec();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// post a cart when add to cart button clicked
const addToCart = async (req, res) => {
  const { menuItemId, name, recipe, image, price, quantity, email } = req.body;
  try {
    const existingCartItem = await Carts.findOne({ menuItemId });
    if (existingCartItem) {
      return res.status(400).json("Product already exist in the card");
    }
    const cartItem = await Carts.create({
      menuItemId,
      name,
      recipe,
      image,
      price,
      quantity,
      email,
    });
    res.status(201).json(cartItem);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// delete a item from the card
const deleteCart = async (req, res) => {
  const cartId = req.params.id;
  try {
    const deletedCart = await Carts.findByIdAndDelete(cartId);
    if (!deletedCart) {
      return res.status(404).json("Item not found in the card");
    }
    res.status(200).json("Item deleted successfully from the card");
  } catch (err) {
    res.status(500).json(err.message);
  }
};
 
// update items in the card
const updateCart = async (req, res) => {
  const cartId = req.params.id;
  const { menuItemId, name, recipe, image, price, quantity, email } = req.body;
  try {
    const updatedCart = await Carts.findByIdAndUpdate(
      cartId,
      {
        menuItemId,
        name,
        recipe,
        image,
        price,
        quantity,
        email,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedCart) {
      return res.status(404).json("Item is not found in the card");
    }
    res.status(200).json("Updated successfully");
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// get single card
const getSingleCart = async (req, res) => {
  const cartId = req.params.id;
  try {
    const cartItem = await Carts.findById(cartId);
    if (!cartItem) {
      return res.status(404).json("Not found");
    }
    res.status(200).json(cartItem);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

module.exports = { 
  getCartByEmail,
  addToCart,
  deleteCart,
  updateCart,
  getSingleCart,
};

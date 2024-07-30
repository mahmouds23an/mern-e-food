const User = require("../models/users");

// get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// create a new user
const createUser = async (req, res) => {
  const user = req.body;
  const query = { email: user.email };
  try {
    const existingUser = await User.findOne(query);
    if (existingUser) {
      return res.status(302).json("User already exist");
    }
    const result = await User.create(user);
    res.status(200).json("User created successfully");
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// delete a user
const deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json("User not found");
    }
    res.status(200).json("User deleted successfully");
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// update user
const updateUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const updatedUser = await User.findByIdAndUpdate(userId);
    if (!updatedUser) {
      return res.status(404).json("User not found");
    }
    res.status(200).json("User deleted successfully");
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// get admin
const getAdmin = async (req, res) => {
  const email = req.params.email;
  const query = { email: email };
  try {
    const user = await User.findOne(query);
    if (email !== req.decoded.email) {
      return res.status(403).json("Forbidden access");
    }
    let admin = false;
    if (user) {
      admin = user?.role === "admin";
    }
    res.status(200).json({ admin });
  } catch (err) {
    res.status(500).json(err.message);
  }
}; 

// make an user as an admin
const makeAdmin = async (req, res) => {
  const userId = req.params.id;
  const { name, email, photoURL, role } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { role: "admin" },
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return res.status(404).json("User not found");
    }
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

module.exports = {
  getAllUsers,
  createUser,
  deleteUser,
  updateUser,
  getAdmin,
  makeAdmin,
};

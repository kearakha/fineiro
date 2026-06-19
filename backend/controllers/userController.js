// controllers/userController.js
const { User } = require("../models");

// GET semua user
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] } // jangan kirim password
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET user by id
const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ["password"] }
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE user
const updateUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.name = name || user.name;
    user.email = email || user.email;
    await user.save();

    res.json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE user
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.destroy();
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};

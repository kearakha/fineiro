const jwt = require("jsonwebtoken");
const { User } = require("../models");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // cek email sudah dipakai?
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email sudah terdaftar" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // simpan user baru
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User berhasil diregistrasi",
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    //cek user
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    //cek password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    //generate token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
    );

    res.json({ message: "Login success", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

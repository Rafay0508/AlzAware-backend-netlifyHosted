const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { fullName, contact, email, password } = req.body;

    if (fullName && contact && email && password) {
      const existingUser = await User.findOne({ email });
      console.log({ fullName, contact, email, password });
      if (existingUser) {
        return res.status(400).json({ message: "user already exists" });
      }

      const newUser = new User({ fullName, contact, email, password });
      await newUser.save();
      res.status(201).json({ message: "User registered successfully" });
    } else {
      res.status(500).json({ message: "All field required" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Your existing login logic
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, "ABDULRAFAY", {
      expiresIn: "1h",
    });

    // Send user details along with the token
    const userDetails = {
      _id: user._id,
      fullName: user.fullName,
      contact: user.contact,
      email: user.email,
      // Add other user details as needed
    };
    console.log("login", userDetails);
    res.json({ message: "Login successful", token, user: userDetails });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const verifyToken = async (req, res, next) => {
  const token = req.body.token;
  console.log("ssssss", token);

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    // console.log("token", token);
    const decoded = jwt.verify(token, "ABDULRAFAY");
    // console.log("sss", decoded);
    const userId = decoded.userId;

    // Check if the user exists in the database
    const user = await User.findById(userId);

    // Send user details along with the token
    const userDetails = {
      _id: user._id,
      fullName: user.fullName,
      contact: user.contact,
      email: user.email,
      // Add other user details as needed
    };
    // console.log(userDetails);
    res.json({ message: "Verification successful", token, user: userDetails });
  } catch (error) {
    console.log("ss");
    res.status(400).json({ message: "Invalid token." });
  }
};

module.exports = { register, login, verifyToken };

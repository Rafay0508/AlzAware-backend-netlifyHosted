const Message = require("../models/message");
const authMiddleware = require("../middleware/authMiddleware");

// Create a new message
const createMessage = async (req, res) => {
  // Use the verifyToken middleware before handling the request
  authMiddleware(req, res, async () => {
    try {
      const { content } = req.body;

      // Get user information from the decoded token
      const decodedToken = req.user; // Change from req.token to req.user
      console.log(decodedToken);
      const userId = decodedToken.userId;

      if (!userId || !content) {
        return res
          .status(400)
          .json({ message: "User and content are required" });
      }

      const newMessage = new Message({ user: userId, content });
      await newMessage.save();

      res.status(201).json({ message: "Message created successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
};

// Get all messages
const getAllMessages = async (req, res) => {
  // Use the verifyToken middleware before handling the request
  authMiddleware(req, res, async () => {
    try {
      const messages = await Message.find();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
};

module.exports = { createMessage, getAllMessages };

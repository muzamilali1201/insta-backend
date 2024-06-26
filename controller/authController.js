const Auth = require("../model/Auth");
const customError = require("../utils/error");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authController = {
  signupUser: async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      throw new customError(422, "All fields are required");
    }
    const existingUser = await Auth.findOne({ email });
    const hashedPassword = await bcrypt.hash(password, 10);
    if (existingUser) {
      throw new customError(409, "User already exists");
    }
    let newUser = await Auth.create({
      username,
      email,
      password: hashedPassword,
    });
    newUser = newUser.toObject();
    delete newUser.password;
    return res.status(200).json({
      success: true,
      message: "User registered successfully",
      data: newUser,
    });
  },
  loginUser: async (req, res) => {
    const { email, password } = req.body;
    let existingUser = await Auth.findOne({ email });
    if (!existingUser) {
      throw new customError(404, "User not found!");
    }
    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    if (!passwordMatch) {
      throw new customError(401, "Invalid credentials");
    }
    existingUser = existingUser.toObject();
    delete existingUser.password;
    const token = jwt.sign(existingUser, process.env.SECRET_KEY, {
      expiresIn: "2d",
    });
    return res.status(200).json({
      success: true,
      message: "User login successfully!",
      data: existingUser,
      token: token,
    });
  },
};

module.exports = authController;

const Auth = require("../model/Auth");
const Token = require("../model/Token");
const customError = require("../utils/error");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const emailSender = require("../utils/emailSender");

const authController = {
  signupUser: async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      throw new customError(422, "All fields are required");
    }
    const existingUser = await Auth.findOne({ email: email });
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
    res.status(200).json({
      success: true,
      message: "User registered successfully",
      data: newUser,
    });
  },
  loginUser: async (req, res) => {
    const { email, password } = req.body;
    let existingUser = await Auth.findOne({ email: email });
    if (!existingUser) {
      throw new customError(404, "User not found!");
    }
    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    if (!passwordMatch) {
      throw new customError(401, "Invalid credentials");
    }
    existingUser = existingUser.toObject();
    delete existingUser.password;
    const token = await jwt.sign(existingUser, process.env.SECRET_KEY, {
      expiresIn: "2d",
    });
    res.status(200).json({
      success: true,
      message: "User login successfully!",
      data: existingUser,
      token: token,
    });
  },
  sendPasswordResetLink: async (req, res) => {
    const { email } = req.body;
    const existingUser = await Auth.findOne({ email: email });
    if (!existingUser) {
      throw new customError(404, "User not exist");
    }
    const newToken = await Token.create({
      userId: existingUser._id,
      token: crypto.randomBytes(32).toString("hex"),
    });
    const link = `http://localhost:3000/api/v1/user/password-reset/?token=${newToken.token}`;
    await emailSender(email, existingUser.username, link);
    res.status(200).json({
      success: true,
      message: "Password reset mail successfully send to the user",
      data: {},
    });
  },
  resetPassword: async (req, res) => {
    const { token } = req.query;
    const { password } = req.body;
    const verifiedToken = await Token.findOne({
      token: token,
    });
    if (!verifiedToken) {
      throw new customError(401, "unauthorized user");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    let user = await Auth.findOne({ _id: verifiedToken.userId });
    user.password = hashedPassword;
    await user.save();
    user = user.toObject();
    delete user.password;
    await Token.findOneAndDelete({ token: token });
    res.status(200).json({
      success: true,
      message: "Password has changed successfully",
      data: user,
    });
  },
};

module.exports = authController;

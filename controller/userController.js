const crypto = require("crypto");
const emailSender = require("../utils/emailSender");
const Profile = require("../model/Profile");
const Auth = require("../model/Auth");
const bcrypt = require("bcrypt");
const Follower = require("../model/Follower");
const Following = require("../model/Following");
const customError = require("../utils/error");

const userController = {
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
  getFollowersOfUser: async (req, res) => {
    const { userId } = req.params;

    const userProfile = await Profile.findOne({ userId: userId }).populate({
      path: "followers",
      model: "Auth",
      select: "-password",
    });

    if (userProfile.profile == "private") {
      throw new customError(401, "User's profile is private");
    }

    res.status(200).json({
      success: true,
      message: "Followers fetched successfully",
      data: userProfile.followers,
    });
  },
  getFollowingsOfUser: async (req, res) => {
    const { userId } = req.params;

    const userProfile = await Profile.findOne({ userId: userId }).populate({
      path: "following",
      model: "Auth",
      select: "-password",
    });
    if (userProfile.profile == "private") {
      throw new customError(401, "User's profile is private");
    }

    res.status(200).json({
      success: true,
      message: "Followers fetched successfully",
      data: userProfile.following,
    });
  },
  followUser: async (req, res) => {
    const { userId } = req.params;
    const { userData } = req;
    if (userId == userData._id.toString()) {
      throw new customError(400, "You can't follow yourself");
    }
    const Followers = await Follower.findOne({ user: userId });

    const userProfile = await Profile.findOne({ userId: userId });
    const myProfile = await Profile.findOne({ userId: userData._id });
    if (!userProfile) {
      throw new customError(404, "Profile not exist");
    }
    if (Followers && Followers.follower == userData._id) {
      const unFollowUser = await Follower.findOneAndDelete({
        follower: userData._id,
      });
      const removeFollowing = await Following.findOneAndDelete({
        following: userProfile.userId,
      });
      userProfile.followers -= 1;
      myProfile.following -= 1;
      await userProfile.save();
      await myProfile.save();
      return res.status(200).json({
        success: true,
        message: "Unfollowed successfully",
        data: userProfile,
      });
    }

    const newFollower = await Follower.create({
      user: userProfile.userId,
      follower: userData._id,
    });
    const newFollowing = await Following.create({
      user: userData._id,
      following: userProfile.userId,
    });
    userProfile.followers += 1;
    myProfile.following += 1;
    await userProfile.save();
    await myProfile.save();
    return res.status(200).json({
      success: true,
      message: "Followed successfully",
      data: userProfile,
    });
  },
};

module.exports = userController;

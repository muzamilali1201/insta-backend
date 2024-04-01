const Auth = require("../model/Auth");
const Post = require("../model/Post");
const Profile = require("../model/Profile");
const customError = require("../utils/error");

const postController = {
  create: async (req, res) => {
    const { url, caption } = req.body;
    const { userData } = req;
    let mediaType = url.split(".");
    mediaType = mediaType[mediaType.length - 1];
    const currentUserProfile = await Profile.findOne({
      userId: userData._id.toString(),
    });
    if (!currentUserProfile) {
      throw new customError(404, "Profile not exist");
    }

    let newPost = await Post.create({
      user: userData._id,
      caption,
      media: mediaType == "jpeg" || mediaType == "png" ? "image" : "video",
      url,
    });
    return res.status(200).json({
      success: true,
      message: "Post created successfully",
      data: newPost,
    });
  },
  getAll: async (req, res) => {
    const { userData } = req;
    const userExist = await Auth.findOne({ _id: userData._id });
    if (!userExist) {
      throw new customError(404, "User not exist");
    }
    const myPosts = await Post.find({ user: userExist._id });
    return res.status(200).json({
      success: true,
      message: "Posts fetched successfully",
      data: myPosts,
    });
  },
  getSpecificPost: async (req, res) => {
    const { userId } = req.params;
    const postExist = await Post.findOne({ user: userId });
    if (!postExist) {
      throw new customError(404, "Post not exist");
    }
    return res.status(200).json({
      success: true,
      message: "Post fetched successfully",
      data: postExist,
    });
  },
};
module.exports = postController;

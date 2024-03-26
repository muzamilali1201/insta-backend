const Auth = require("../model/Auth");
const Like = require("../model/Like");
const Post = require("../model/Post");
const customError = require("../utils/error");

const likeController = {
  likePost: async (req, res) => {
    const { postId } = req.params;
    const { userData } = req;
    const userPost = await Post.findOne({ _id: postId });
    if (!userPost) {
      throw new customError(404, "Post not found");
    }
    const alreadyLiked = await Like.findOne({ user: userData._id }).populate({
      path: "user",
      model: "Auth",
      select: "-password",
    });
    if (alreadyLiked) {
      userPost.likes -= 1;
      await userPost.save();
      await Like.findOneAndDelete({ user: userData._id });
      return res.status(200).json({
        success: true,
        message: "Successfully unliked the post",
        data: userPost,
      });
    }
    userPost.likes += 1;
    await userPost.save();
    const newLike = await Like.create({
      post: userPost._id,
      user: userData._id,
    });
    return res.status(200).json({
      success: true,
      message: "Successfully liked the post",
      data: userPost,
    });
  },
};
module.exports = likeController;

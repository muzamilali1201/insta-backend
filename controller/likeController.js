const Auth = require("../model/Auth");
const Like = require("../model/Like");
const Post = require("../model/Post");
const customError = require("../utils/error");

const likeController = {
  likePost: async (req, res) => {
    const { postId } = req.params;
    const { userData } = req;
    const targetPost = await Post.findOne({ _id: postId });
    if (!targetPost) {
      throw new customError(404, "Post not found");
    }
    const likedEntry = await Like.findOne({ user: userData._id }).populate({
      path: "user",
      model: "Auth",
      select: "-password",
    });
    if (likedEntry) {
      targetPost.likes -= 1;
      targetPost.score -= 1;
      await targetPost.save();
      await Like.findOneAndDelete({ user: userData._id });
      return res.status(200).json({
        success: true,
        message: "Successfully unliked the post",
        data: targetPost,
      });
    }
    targetPost.likes += 1;
    targetPost.score += 1;
    await targetPost.save();
    const newLike = await Like.create({
      post: targetPost._id,
      user: userData._id,
    });
    return res.status(200).json({
      success: true,
      message: "Successfully liked the post",
      data: targetPost,
    });
  },
};
module.exports = likeController;

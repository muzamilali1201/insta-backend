const Auth = require("../model/Auth");
const Post = require("../model/Post");
const customError = require("../utils/error");

const likeController = {
  likePost: async (req, res) => {
    const { postId } = req.params;
    const { userData } = req;
    const userExist = await Auth.findOne({ _id: userData._id });
    if (!userExist) {
      throw new customError(404, "User not exist");
    }
    const userPost = await Post.findOne({ _id: postId });
    if (!userPost) {
      throw new customError(404, "Post not found");
    }
    const alreadyLiked = userPost.likes.some(
      (like) => like.toString() == userData._id
    );
    if (alreadyLiked) {
      userPost.likesCount -= 1;
      userPost.likes.splice(userData._id, 1);
      await userPost.save();
      return res.status(200).json({
        success: true,
        message: "Successfully unliked the post",
        data: userPost,
      });
    }
    userPost.likesCount += 1;
    userPost.likes.push(userData._id);
    await userPost.save();
    return res.status(200).json({
      success: true,
      message: "Successfully liked the post",
      data: userPost,
    });
  },
};
module.exports = likeController;

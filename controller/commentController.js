const Post = require("../model/Post");
const Comment = require("../model/Comment");
const customError = require("../utils/error");

const commentController = {
  addComment: async (req, res) => {
    const { postId } = req.params;
    const { userData } = req;
    const { text } = req.body;
    const { commentId } = req.params;
    const userPost = await Post.findOne({ _id: postId });
    if (!userPost) {
      throw new customError(404, "Post not found");
    }
    const newComment = Comment.create({
      postId,
      text,
      user: userData._id,
      repliedTo: commentId ? commentId : null,
    });
    userPost.comments += 1;
    await userPost.save();
    return res.status(200).json({
      success: true,
      message: "Commented successfully",
      data: userPost,
    });
  },
  addReply: async (req, res) => {
    const { postId, commentId } = req.params;
    const { text } = req.body;
    const { userData } = req;
    const userPost = await Post.findOne({ _id: postId });
    if (!userPost) {
      throw new customError(404, "Post not found");
    }
    const newComment = Comment.create({
      postId,
      text,
      user: userData._id,
      repliedTo: commentId,
    });
    userPost.comments += 1;
    await userPost.save();
    return res.status(200).json({
      success: true,
      message: "Replied successfully",
      data: userPost,
    });
  },
};

module.exports = commentController;

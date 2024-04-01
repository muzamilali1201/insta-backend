const Post = require("../model/Post");
const Comment = require("../model/Comment");
const customError = require("../utils/error");

const commentController = {
  addComment: async (req, res) => {
    const { postId } = req.params;
    const { userData } = req;
    const { text } = req.body;
    const targetPost = await Post.findOne({ _id: postId });
    if (!targetPost) {
      throw new customError(404, "Post not found");
    }
    const newComment = Comment.create({
      postId,
      text,
      user: userData._id,
      repliedTo: null,
    });
    targetPost.comments += 1;
    targetPost.score += 1;
    await targetPost.save();
    return res.status(200).json({
      success: true,
      message: "Commented successfully",
      data: targetPost,
    });
  },
  addReply: async (req, res) => {
    const { postId, commentId } = req.params;
    const { text } = req.body;
    const { userData } = req;
    const targetPost = await Post.findOne({ _id: postId });
    if (!targetPost) {
      throw new customError(404, "Post not found");
    }
    const newComment = Comment.create({
      postId,
      text,
      user: userData._id,
      repliedTo: commentId,
    });
    targetPost.comments += 1;
    targetPost.score += 1;
    await targetPost.save();
    return res.status(200).json({
      success: true,
      message: "Replied successfully",
      data: targetPost,
    });
  },
};

module.exports = commentController;

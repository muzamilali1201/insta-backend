const Follower = require("../model/Follower");
const Post = require("../model/Post");
const Profile = require("../model/Profile");
const customError = require("../utils/error");

const checkProfilePrivacy = async (req, res, next) => {
  if (req.params.userId) {
    const { userId } = req.params;
    const { userData } = req;
    const profileExist = await Profile.findOne({ userId });
    if (!profileExist) {
      throw new customError(404, "Profile not found");
    }
    const targetFollower = await Follower.findOne({
      user: userId,
      follower: userData._id,
    });
    if (profileExist.profileType == "private" && !targetFollower) {
      throw new customError(403, "User's profile is private");
    }
    next();
  } else {
    const { postId } = req.params;
    const { userData } = req;
    const postExist = await Post.findOne({ _id: postId });
    if (!postExist) {
      throw new customError(404, "Post not exist");
    }
    const targetProfile = await Profile.findOne({ user: postExist.userId });
    if (!targetProfile) {
      throw new customError(404, "Profile not exist");
    }
    const targetFollower = await Follower.findOne({
      user: postExist.user,
      follower: userData._id,
    });
    if (targetProfile.profileType == "private" && !targetFollower) {
      throw new customError(403, "User's profile is private");
    }
    next();
  }
};

module.exports = checkProfilePrivacy;

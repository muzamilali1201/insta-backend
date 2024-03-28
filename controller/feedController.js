const Follower = require("../model/Follower");
const Like = require("../model/Like");
const Post = require("../model/Post");
const Profile = require("../model/Profile");

const feedController = {
  getFeed: async (req, res) => {
    const { userData } = req;
    const { page } = req.query.page || 1;
    const { pageSize } = req.query.pageSize || 10;
    const followedUsers = await Follower.find({ follower: userData._id });
    const followedUserIds = followedUsers.map((user) => user.user);

    let postsByFollowedUsers = await Post.find({
      user: { $in: followedUserIds },
    })
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    let postsLikedByFollowedUsers = await Like.find({
      user: { $in: followedUserIds },
    })
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    const likedPosts = postsLikedByFollowedUsers.map((post) => post.post);

    postsLikedByFollowedUsers = await Post.find({
      _id: { $in: likedPosts },
    });
    const users = postsLikedByFollowedUsers.map((post) => post.user);
    const userProfile = await Profile.find({ userId: { $in: users } });
    const publicUsers = userProfile.filter(
      (profile) => profile.profileType !== "private"
    );

    const postsByPublicUsers = await Post.find({ user: { $in: publicUsers } });

    postsByFollowedUsers = postsByFollowedUsers.concat(postsByPublicUsers);

    const uniqueIds = new Set();
    postsByFollowedUsers = postsByFollowedUsers.filter((obj) => {
      const id = obj._id.toString();
      if (uniqueIds.has(id)) {
        return false;
      }
      uniqueIds.add(id);
      return true;
    });

    postsByFollowedUsers.sort((a, b) => b.score - a.score);

    return res.status(200).json({
      success: true,
      message: "Feed fetched successfully",
      data: postsByFollowedUsers,
    });
  },
};

module.exports = feedController;

const Profile = require("../model/Profile");
const customError = require("../utils/error");

const followController = {
  followUser: async (req, res) => {
    const { userId } = req.params;
    const { userData } = req;
    if (userId == userData._id.toString()) {
      throw new customError(400, "You can't follow yourself");
    }
    const myProfile = await Profile.findOne({ userId: userData._id });
    const userProfile = await Profile.findOne({ userId: userId });
    const alreadyFollow = userProfile.followers.some(
      (follower) => follower.toString() == userData._id
    );

    if (alreadyFollow) {
      userProfile.followersCount -= 1;
      myProfile.followingCount -= 1;
      userProfile.followers.splice(userData._id, 1);
      await userProfile.save();
      await myProfile.save();
      return res.status(200).json({
        success: true,
        message: "Unfollowed successfully",
        data: userProfile,
      });
    }

    if (!userProfile) {
      throw new customError(404, "User not exist");
    }
    userProfile.followers.push(userData._id);
    userProfile.followersCount += 1;
    myProfile.followingCount += 1;
    await userProfile.save();
    await myProfile.save();
    return res.status(200).json({
      success: true,
      message: "Followed successfully",
      data: userProfile,
    });
  },
};

module.exports = followController;

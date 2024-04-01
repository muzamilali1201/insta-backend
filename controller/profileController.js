const Profile = require("../model/Profile");
const customError = require("../utils/error");

const profileController = {
  createProfile: async (req, res) => {
    const {
      name,
      bio,
      gender,
      location,
      interests,
      contact,
      image,
      profileType,
    } = req.body;
    const { userData } = req;
    const existingProfile = await Profile.findOne({ userId: userData._id });
    if (existingProfile) {
      throw new customError(409, "Profile already exists");
    }
    const newProfile = await Profile.create({
      userId: userData._id,
      name,
      bio,
      gender,
      location,
      interests,
      contact,
      profileType,
      profilePicture: image ? image : null,
    });
    return res.status(200).json({
      success: true,
      message: "Profile created successfully",
      data: newProfile,
    });
  },
  updateProfile: async (req, res) => {
    const { name, bio, location, interests, gender, contact, image } = req.body;
    const { userData } = req;
    const updatedProfile = await Profile.findOneAndUpdate(
      { userId: userData._id },
      {
        name: name,
        bio: bio,
        location: location,
        interests: interests,
        gender: gender,
        contact: contact,
        profilePicture: image ? image : null,
      },
      {
        new: true,
      }
    );
    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedProfile,
    });
  },
};

module.exports = profileController;

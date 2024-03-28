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
      file,
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
      profilePicture: file ? file : null,
    });
    res.status(200).json({
      success: true,
      message: "Profile created successfully",
      data: newProfile,
    });
  },
  updateProfile: async (req, res) => {
    const { name, bio, location, interests, gender, contact, file } = req.body;
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
        profilePicture: file ? file : null,
      },
      {
        new: true,
      }
    );
    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedProfile,
    });
  },
};

module.exports = profileController;

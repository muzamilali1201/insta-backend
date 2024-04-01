const Upload = require("../model/Upload");
const customError = require("../utils/error");

const uploadController = {
  uploadFile: async (req, res) => {
    if (!req.file) {
      throw new customError(422, "Please select file");
    }
    const file = req.file;
    const { userData } = req;
    const url = `localhost:3000/public/uploads/${file.filename}`;
    const newFile = await Upload.create({
      userId: userData._id,
      fileName: file.filename,
      url,
      type: file.mimetype,
    });
    return res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      data: newFile,
    });
  },
};
module.exports = uploadController;

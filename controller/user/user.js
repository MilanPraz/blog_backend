import userModel from "../../models/userModel.js";

export const editProfile = async (req, res) => {
  try {
    console.log("req.file hai", req.file.filename);

    if (req.file) {
      const newPic = req.file.filename;
      const updatedUser = await userModel.findByIdAndUpdate(
        {
          username: req.body.username,
          image: newPic,
        },
        { new: true }
      );

      console.log("updated user here", updatedUser);
      return res.status(200).send(updatedUser);
    } else {
      return res.status(400).send({ msg: "No file uploaded" });
    }
  } catch (err) {
    console.log(err);
  }
};

import userModel from "../../models/userModel.js";
import bcrypt from "bcrypt";

export const userRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log("hit hereerre");
    //check if  user exist
    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(400).send({ msg: "User already exist" });
    }

    //hash the password
    const hasedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      username,
      email,
      password: hasedPassword,
    });
    newUser.save();
    return res.status(200).send({ msg: "User Created Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: err });
  }
};

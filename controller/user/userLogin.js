import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import userModel from "../../models/userModel.js";

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const user = await userModel.findOne({ email });
    //check if user exist
    if (!user) res.status(400).send({ msg: "User Doesn't exist" });
    console.log(password);
    console.log(user.password);
    console.log(user);

    const comparePw = await bcrypt.compare(password, user.password);
    if (!comparePw) {
      return res.status(400).send({ msg: "Password Incorrect" });
    }

    //now create jwt token
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    const userDetail = {
      id: user._id,
      username: user.username,
      image: user.image,
    };

    return res.status(200).send({ msg: "Login Successful", token, userDetail });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

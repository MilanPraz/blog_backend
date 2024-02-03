import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
  try {
    console.log("auth haii");
    const token = req?.headers?.authorization.split(" ")[1];
    console.log(token);
    if (!token) {
      return res.status(400).send({ msg: "Unauthorized access" });
    }

    const userDetail = jwt.verify(token, process.env.JWT_SECRET);
    console.log(userDetail);
    req.user = userDetail;
    console.log("this is  end");
    next();
  } catch (err) {
    console.log("token ko erorrrrrrrr", err);
    return res.status(500).send({ msg: err });
  }
};

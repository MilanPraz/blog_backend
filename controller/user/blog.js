//create a blog

import blogModel from "../../models/blogModel.js";
import userModel from "../../models/userModel.js";

export const createBlog = async (req, res) => {
  try {
    const d = new Date();
    let year = d.getFullYear();
    let month = d.getMonth();
    let day = d.getDate();

    let month_names = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    console.log("hitedddddd");
    const user = await userModel.findById(req.user.id);
    console.log("req body", req.body);
    console.log("req.user hai", req.user.id);
    console.log("req.file haii", req.file);
    const post = new blogModel({
      ...req.body,
      image: req.file.filename,
      blogDate: `${month_names[month]} ${day} ,${year}`,
      creatorPic: user.image,
      creatorName: user.username,
      creator: req.user.id,
    });
    post.save();

    return res.status(200).send(post);
  } catch (err) {
    console.log(err);
  }
};

export const getBlogs = async (req, res) => {
  try {
    console.log("hello");
    console.log("category haiii", req.query.category);
    console.log("search haiii", req.query.search);
    let search = req.query.search || "";
    let category = req.query.category || "";

    const page = Number(req.query.page) || 1;
    const perPage = Number(req.query.perPage) || 6;

    let skip = perPage * (page - 1);
    let limit = perPage;

    const blogs = await blogModel.aggregate([
      {
        $match: {
          title: RegExp(search, "i"),
          category: RegExp(category, "i"),
        },
      },
      {
        $facet: {
          metadata: [{ $count: "count" }],
          data: [{ $skip: skip }, { $limit: limit }],
        },
      },
    ]);
    console.log("SAbai blogs haru hai", blogs);

    return res.status(200).send(blogs);
  } catch (err) {
    console.log(err);
  }
};

export const deleteBlog = async (req, res) => {
  try {
    console.log(req.params.id);

    let blog = await blogModel.findById(req.params.id);
    if (!blog) res.status(404).send({ msg: "blog not found" });

    console.log("req.user.id haiiiii", req.user.id);
    console.log("blog.creator haiii", blog.creator);
    if (req.user.id !== blog.creator) {
      return res.status(401).send({ msg: "Access Denied!" });
    }

    let deletedBlog = await blogModel.findByIdAndDelete(req.params.id);
    console.log("Deleted blog", deletedBlog);
    return res.status(200).send("Sucessfully deleted");
  } catch (err) {
    console.log(err);
  }
};

export const getBlogById = async (req, res, next) => {
  try {
    console.log("params ko id hai", req.params.id);
    console.log(typeof req.params.id);
    const blog = await blogModel.findById(req.params.id);
    console.log(blog);
    return res.status(200).send(blog);
  } catch (err) {
    console.log(err);
  }
};

export const getRecentBlog = async (req, res, next) => {
  try {
    let blogs = await blogModel.find().sort({ _id: -1 }).limit(3);

    res.status(200).send(blogs);
  } catch (err) {
    console.log(err);
  }
};

export const getUserBlogs = async (req, res) => {
  try {
    console.log(req.user.id);
    let blogs = await blogModel.find({ creator: req.user.id });
    return res.send(blogs);
  } catch (err) {
    console.log(err);
  }
};

export const editBlog = async (req, res) => {
  try {
    let blog = await blogModel.findById(req.params.id);

    if (!blog) {
      return res.status(400).send({ msg: "Blog not found" });
    }

    if (req.user.id !== blog.creator) {
      return res.status(400).send({ msg: "This blog is not created by you" });
    }
    console.log("re.body haii", req.body);
    let updatedBlog = await blogModel.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        image: req.file?.filename,
      },
      { new: true }
    );

    return res.status(200).send(updatedBlog);
  } catch (err) {
    console.log(err);
  }
};

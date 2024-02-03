import mongoose from "mongoose";

const schema = mongoose.Schema;
const objectid = schema.ObjectId;

const blogSchema = new schema({
  title: {
    type: String,
    required: [true, "please provide a title"],
  },
  description: {
    type: String,
    required: [true, "please provide the description"],
  },
  category: {
    type: String,
    required: [true, "please provide the category"],
  },
  image: {
    type: String,
    required: [true, "please provide a image"],
  },
  blogDate: {
    type: String,
  },
  creator: {
    type: String,
  },
  creatorPic: {
    type: String,
  },
  creatorName: {
    type: String,
  },
});

const blogModel = mongoose.model.blogs || mongoose.model("blogs", blogSchema);
export default blogModel;

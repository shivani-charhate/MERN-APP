const blogModel = require("../Model/blogModel");
const userModel = require("../Model/userModel");
const mongoose = require("mongoose");

exports.addBlogController = async (req, res) => {
  try {
    const { title, descrption, image, user } = req.body;
    if (!title || !descrption || !image || !user) {
      return res.status(404).send({ message: "Provide all fields" });
    }
    const existingUser = await userModel.findById(user);
    if (!existingUser) {
      return res.status(404).send({ message: "User not found" });
    }

    const newBlog = new blogModel({ title, descrption, image, user });
    // used mongoose session to add data in user model while creating
    const session = await mongoose.startSession();
    session.startTransaction();
    await newBlog.save({ session });
    existingUser.blogs.push(newBlog);
    await existingUser.save({ session });
    await session.commitTransaction();

    await newBlog.save();
    res
      .status(200)
      .send({ sucess: true, message: "New blog created", newBlog });
  } catch (error) {
    res.status(500).send({ sucess: false, message: "Error while add blog" });
  }
};

exports.getAllBlogController = async (req, res) => {
  try {
    const blogs = await blogModel.find({}).populate("user");
    if (!blogs) {
      return res.status(404).send({ message: "No blogs Found" });
    }
    return res.status(200).send({
      sucess: true,
      message: "All blogs",
      blogCount: blogs.length,
      blogs,
    });
  } catch (error) {
    res.status(500).send({ sucess: false, message: "Error while geAll blog" });
  }
};
exports.updateBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image } = req.body;

    const updateBlog = await blogModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    return res
      .status(200)
      .send({ sucess: true, message: "Blog updated", updateBlog });
  } catch (error) {
    res.status(500).send({ sucess: false, message: "Error while update blog" });
  }
};
exports.deleteBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteBlog = await blogModel.findByIdAndDelete(id).populate("user");
    // await deleteBlog.user.blogs.pull(blog);
    // await deleteBlog.user.save();
    return res.status(200).send({ sucess: true, message: "Blog Deleted " });
  } catch (error) {
    res.status(500).send({ sucess: false, message: "Error while delete blog" });
  }
};
exports.singleBlogController = async (req, res) => {
  try {
    const singleBlog = await blogModel.findById(req.params.id).populate("user");
    if (!singleBlog) {
      return res.status(404).send({ message: "Blog Not Found" });
    }
    return res.status(200).send({
      sucess: true,
      message: "Single Blog Fatch",
      singleBlog,
    });
  } catch (error) {
    res
      .status(500)
      .send({ sucess: false, message: "Error while fatch single blog" });
  }
};

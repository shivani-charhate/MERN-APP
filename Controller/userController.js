const userModel = require("../Model/userModel");
const blogModel = require("../Model/blogModel");
const bcrypt = require("bcrypt");

exports.registerController = async (req, res) => {
  try {
    const { userName, email, password, blogs } = req.body;
    if (!userName || !email || !password) {
      return res.status(400).send({ message: "Fill all the fields" });
    }
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(404).send({ message: "User already exit" });
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const user = new userModel({
      userName,
      email,
      password: hashPassword,
      blogs,
    });
    await user.save();
    return res
      .status(200)
      .send({ sucess: true, message: "New User Register", user });
  } catch (error) {
    res
      .status(500)
      .send({ sucess: false, message: `Something went wrong ${error}` });
  }
};
exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).send({ message: "Provide all fields" });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "User Not Found" });
    }
    const ismatch = await bcrypt.compare(password, user.password);
    if (!ismatch) {
      return res.status(404).send({
        message: "Invalid email & Password",
      });
    }
    return res
      .status(200)
      .send({ sucess: true, message: "Login Sucessfully", user });
  } catch (error) {
    res
      .status(500)
      .json({ sucess: false, message: "Something went wrong", error });
  }
};

exports.getAllController = async (req, res) => {
  try {
    const users = await userModel.find({});
    return res
      .status(200)
      .send({ sucess: true, message: "All Users List", users });
  } catch (error) {
    res
      .status(500)
      .json({ sucess: false, message: "Something went wrong", error });
  }
};
// blog based on userId
exports.userBlogController = async (req, res) => {
  try {
    const blog = await userModel.findById(req.params.id).populate("blogs");
    if (!blog) {
      return res.statsu(404).send({ message: "User Not Found" });
    }
    return res.status(200).json({
      sucess: true,
      message: "Blogs Against user",
      count: blog.length,

      blog,
    });
  } catch (error) {
    res
      .status(500)
      .send({ sucess: false, message: "Error while fatch User blog" });
  }
};

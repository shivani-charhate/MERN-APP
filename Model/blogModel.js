const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    descrption: { type: String, required: true },
    image: { type: String, required: true },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "user Id is required"],
    },
  },
  { timestamps: true }
);
const blogModel = mongoose.model("Blog", blogSchema);

module.exports = blogModel;

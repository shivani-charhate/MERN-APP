const express = require("express");
const router = express.Router();
const {
  addBlogController,
  getAllBlogController,
  updateBlogController,
  deleteBlogController,
  singleBlogController,
} = require("../Controller/blogController");

router.post("/create-blog", addBlogController);
router.get("/getAll-blog", getAllBlogController);
router.put("/update-blog/:id", updateBlogController);
router.delete("/delete-blog/:id", deleteBlogController);
router.get("/get-blog/:id", singleBlogController);

module.exports = router;

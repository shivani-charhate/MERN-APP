const express = require("express");

// router-object
const router = express.Router();
const {
  registerController,
  loginController,
  getAllController,
  userBlogController,
} = require("../Controller/userController");

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/all", getAllController);
router.get("/user-blog/:id", userBlogController);

module.exports = router;

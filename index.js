const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const app = express();

// config env file
dotenv.config();

const userRoutes = require("./Routes/userRoute");
const blogRoutes = require("./Routes/blogRoute");

// database connection
connectDB();

// middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// define route
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blog", blogRoutes);
// routes
app.get("/", (req, res) => {
  console.log("Hello Node");
});
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server Running on ${process.env.DEV_MODE}, ${PORT}`);
});

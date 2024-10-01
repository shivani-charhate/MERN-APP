import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get("/api/v1/blog/getAll-blog");
      if (data?.sucess) {
        setBlogs(data?.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllBlogs();
  }, []);
  return (
    <div>
      {blogs &&
        blogs.map((blog) => (
          <BlogCard
            title={blog.title}
            description={blog.description}
            image={blog.image}
            user={blog.user}
          />
        ))}
    </div>
  );
};

export default Blogs;

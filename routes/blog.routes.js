const express = require('express');
const { 
    showBlogPage,
    addBlog,
    editBlog,
    updateBlog,
    deleteBlog

} = require('../controller/blog.controller');
const blogRoutes = express.Router();
const { verifyToken } = require('../helpers/tokenVerify');

blogRoutes.get("/",verifyToken, showBlogPage);
blogRoutes.post("/",verifyToken, addBlog);
blogRoutes.get("/:id/edit", editBlog);
blogRoutes.post("/:id/edit", updateBlog);
blogRoutes.post("/:id", deleteBlog);


module.exports = blogRoutes;
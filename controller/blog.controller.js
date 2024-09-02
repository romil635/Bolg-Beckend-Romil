const Blog = require('../model/blog.model');

exports.showBlogPage = async (req, res) => {
    try {
        let blogs = await Blog.find();
        res.render("blog.ejs", { blogs });
    } catch (error) {
        console.log(error);
        res.json({ messag: "Server error" });
    }
};

exports.addBlog = async (req, res) => {
    try {
        let blog = await Blog.findOne({ title: req.body.title });
        if (blog) {
            res.json({ message: 'Already added' });
        }
        blog = await Blog.create({
            title: req.body.title,
            content: req.body.content,
        });
        res.redirect("/api/blog/")
    } catch (error) {
        console.log(error);
        res.json({ messag: "Server error" });
    }
};


// Show edit blog page
exports.editBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.render("editBlog.ejs", { blog });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Update a blog
exports.updateBlog = async (req, res) => {
    try {
        const { title, content } = req.body;
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        blog.title = title;
        blog.content = content;
        
        await blog.save();
        res.redirect("/api/blog/");
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Delete a blog
exports.deleteBlog = async (req, res) => {
    try {
        await Blog.findByIdAndDelete(req.params.id);
        res.redirect("/api/blog/");
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
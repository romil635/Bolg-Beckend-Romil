require("dotenv").config()
const express = require('express');
const ejs = require('ejs');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const port = process.env.PORT;
const server = express();

// View Engine configuration
server.set("view engine", "ejs");

// in-built middleware
server.use(morgan("dev"));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());

server.get("/", (req, res) => {
    res.render('login.ejs');
});

// User routes
const userRoutes = require("./routes/user.routes");
const blogRoutes= require("./routes/blog.routes");

server.use("/api/users", userRoutes);
server.use("/api/blog", blogRoutes);

server.listen(port, () => {
    // Database connection
    mongoose
        .connect(process.env.MONGO_URL)
        .then(() => console.log(`Database connected in My Profile`))
        .catch(err => console.log(err))
    console.log(`server start http://localhost:${port}`);
})
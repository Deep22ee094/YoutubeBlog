require("dotenv").config();
const path = require("path");
const express = require("express");
const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");
  const Blog=require("./models/blog")

const mongoose=require("mongoose");
const cookieparser=require("cookie-parser");
const { checkForAuthenticationCookie } = require("./middleware/authentication");

const app = express();
const PORT = process.env.PORT || 8000;

mongoose
.connect(process.env.MONGO_URL)
.then(e=>console.log("MongoDB Connected"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
app.use(cookieparser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));
// Home route
app.get("/", async(req, res) => {
    const allBlogs=await Blog.find({});
    res.render("home",{
    user:req.user,
    blogs:allBlogs,
    })
});

// Mounting user routes at /user
app.use("/user", userRoute);
app.use("/blog", blogRoute);

app.listen(PORT, () => {
    console.log(`Server started at PORT: ${PORT}`);
});

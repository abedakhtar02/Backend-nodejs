require("dotenv").config();

const express = require("express");
const path = require("path");
const { mongoose } = require("mongoose");
const cookieParser = require("cookie-parser");

const userRoute = require("./routes/user");
const blogRouter = require("./routes/blog");

const Blog = require("./models/blog");

const app = express();
const PORT = process.env.PORT || 8000;

const {
  checkForAuthenticationCookie,
} = require("./middlewares/authentication");

mongoose.connect(process.env.MONGO_URL).then((e) => {
  console.log("MongoDb connected!");
});

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use("/user", userRoute);
app.use("/blog", blogRouter);

app.get("/", async (req, res) => {
  const blogs = await Blog.find({});
  res.render("home", { user: req.user, blogs: blogs });
});

app.listen(PORT, () => console.log(`Server started at port:${PORT}`));

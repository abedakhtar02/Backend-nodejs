const path = require("path");
const express = require("express");

const PORT = 8000;
const app = express();

const userRoute = require("./routes/user");
const { mongoose } = require("mongoose");
const token = require("./services/authentication");
const cookieParser = require("cookie-parser");

const {
  checkForAuthenticationCookie,
} = require("./middlewares/authentication");

mongoose.connect("mongodb://127.0.0.1:27017/blogSphere").then((e) => {
  console.log("MongoDb connected!");
});

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));

app.get("/", (req, res) => {
  res.render("home", { user: req.user });
});

app.use("/user", userRoute);

app.listen(PORT, () => console.log(`Server started at port:${PORT}`));

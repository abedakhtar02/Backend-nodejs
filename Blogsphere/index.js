const path = require("path");
const express = require("express");

const PORT = 8000;
const app = express();

const userRoute = require("./routes/user");
const {mongoose } = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/blogSphere").then((e)=>{console.log("MongoDb connected!");
})

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({extended:false}))

app.get('/', (req,res)=>{
    res.render("home");
})

app.use("/user", userRoute)

app.listen(PORT, () => console.log(`Server started at port:${PORT}`));

const express = require("express");
const { connectMongoDb } = require("./connection");
//here-> setup middlewares.
const userRouter = require("./routes/user");
const app = express();
const PORT = 8080;
connectMongoDb("mongodb://127.0.0.1:27017/app-1").then(()=> console.log("MongoDB connected!"));

app.use(express.urlencoded({ extended: false }));
app.use("/api/users", userRouter);

app.listen(PORT, () => {
  console.log("Server Started on port 8080! http://localhost:8080");
});

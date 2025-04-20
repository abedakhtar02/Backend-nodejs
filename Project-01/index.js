const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");

const users = require("./MOCK_DATA.json");
const { type } = require("os");
const { log } = require("console");

const app = express();
const PORT = 8080;

mongoose
  .connect("mongodb://127.0.0.1:27017/app-1")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Mongo error", err));

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  jobTitle: {
    type: String,
  },
  gender: {
    type: String,
  },
});

const User = mongoose.model("user", userSchema);

//Middleware
app.use(express.urlencoded({ extended: false }));

app.get("/users", async (req, res) => {
  const allDBUsers = await User.find({});
  const html = `
    <ul>
    ${allDBUsers
      .map((user) => `<li>${user.firstName} - ${user.email}</li>`)
      .join("")}
    </ul>
    `;
  res.send(html);
});

//REST API
app.get("/api/users", async (req, res) => {
  const allDBUsers = await User.find({});
  return res.json(allDBUsers);
});

app
  .route("/api/users/:id")
  .get(async(req, res) => {
  const user = await User.findById(req.params.id);

    // const id = Number(req.params.id);
    // const user = users.find((user) => user.id === id);
    return res.json(user);
  })

  .patch(async(req, res) => {
    await User.findByIdAndUpdate(req.params.id, {lastName:"changed"})
    return res.json({ status: "Success" });
  })

  .delete(async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    return res.json({ status: "Success" });
  });

app.post("/api/users", async (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({ msg: "All fields required" });
  }

  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title,
  });
  console.log("result:", result);
  return res.status(201).json({ msg: "Successfully created" });
});

app.listen(PORT, () => {
  console.log("Server Started on port 8080! http://localhost:8080");
});

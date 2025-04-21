const User = require("../models/user")

async function handleAllUsers(req, res) {
  const allDBUsers = await User.find({});
  return res.json(allDBUsers);
}

async function handleUsersById(req, res) {
  const user = await User.findById(req.params.id);
  return res.json(user);
}

async function handleUpdateById(req, res) {
  await User.findByIdAndUpdate(req.params.id, { lastName: "updated" });
  return res.json({ status: "Success" });
}

async function handleDeleteById(req, res) {
  await User.findByIdAndDelete(req.params.id);
  return res.json({ status: "Success" });
}

async function handlePostUser(req, res) {
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
}

module.exports = {
  handleAllUsers,
  handleUsersById,
  handleUpdateById,
  handleDeleteById,
  handlePostUser
};

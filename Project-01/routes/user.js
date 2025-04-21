const express = require("express");
const router = express.Router();

const {
  handleAllUsers,
  handleUsersById,
  handleUpdateById,
  handleDeleteById,
  handlePostUser,
} = require("../controllers/user");

router.route("/").get(handleAllUsers).post(handlePostUser);

router
  .route("/:id")
  .get(handleUsersById)
  .patch(handleUpdateById)
  .delete(handleDeleteById);

module.exports = router;

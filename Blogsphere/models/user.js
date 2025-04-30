const { Schema, model } = require("mongoose");
const { createHmac, randomBytes } = require("crypto");
const userSchema = Schema(
  {
    fullName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
      //   required: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    profileImageUrl: {
      type: String,
      default: "/images/default.png",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) return;

  //a salt was generated(secret-key) using the randomBytes.
  const salt = randomBytes(16).toString();

  //the salt was used to hash the password using sha256 algorithm then password was updated and was given back in a "hex" format.
  const hashPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

  this.salt = salt;
  this.password = hashPassword;

  next();
});

userSchema.static("matchPassword", async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) throw new Error("User not Found!");

  const salt = user.salt;
  const hashPassword = user.password;

  const userProvidedHashPass = createHmac("sha256", salt)
    .update(password)
    .digest("hex");

    if(hashPassword!==userProvidedHashPass) throw new Error("Incorrect password");
    

  return user;
});

const User = model("user", userSchema);

module.exports = User;

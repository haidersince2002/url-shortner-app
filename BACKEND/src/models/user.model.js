import mongoose, { mongo } from "mongoose";
import crypto from "crypto";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: function () {
      return getGravatarUrl(this.email);
    },
  },
});

const getGravatarUrl = (email) => {
  const hash = crypto
    .createHash("md5")
    .update(email.trim().toLowerCase())
    .digest("hex");
  return `https://www.gravatar.com/avatar/${hash}?d=mp`;
};

export const User = mongoose.model("User", userSchema);

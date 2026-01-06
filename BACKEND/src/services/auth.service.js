import jsonwebtoken from "jsonwebtoken";
import { createUser, findUserByEmail, findUserById } from "../dao/user.dao.js";
import { signToken } from "../utils/helper.js";
import { ConflictError } from "../utils/errorHandler.js";

export const registerUser = async (name, email, password) => {
  const user = await findUserByEmail(email);
  if (user) throw new ConflictError("User Already Exist");
  const newUser = await createUser(name, email, password);

  const token = signToken({ id: newUser._id });
  return token;
};

export const loginUser = async (email, password) => {
  const user = await findUserByEmail(email); // Fix: was findUserById

  if (!user || user.password !== password) {
    throw new Error("Invalid email or password");
  }

  const token = signToken({ id: user._id });
  return token;
};

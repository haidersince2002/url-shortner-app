import { cookieOptions } from "../config/config.js";
import { loginUser, registerUser } from "../services/auth.service.js";
import { verifyToken } from "../utils/helper.js";
import wrapAsyncHandler from "../utils/wrapAsyncHandler.js";

export const register = wrapAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const token = await registerUser(name, email, password);

  res.cookie("accessToken", token, cookieOptions);
  res.status(200).json({ message: "Register Success", token });
});

export const login = wrapAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const token = await loginUser(email, password);

  const verify = verifyToken(token);

  res.status(200).json({ message: "Login Successful" });
});

import { verifyToken } from "../utils/helper";

export const authMiddleware = async (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = verifyToken(token);
  } catch (error) {}
};

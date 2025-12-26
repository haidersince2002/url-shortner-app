import shortUrlModel from "../models/shorturl.model.js";
import { ConflictError } from "../utils/errorHandler.js";

export const saveShortUrl = async (shortUrl, fullUrl, userId) => {
  try {
    const newUrl = new shortUrlModel({
      fullUrl: fullUrl,
      shortUrl: shortUrl,
    });

    if (userId) {
      newUrl.user_id = userId;
    }

    await newUrl.save();
  } catch (error) {
    console.log(error);
    if (error.code == 11000) throw new ConflictError(error);
    throw new Error(error);
  }
};

export const getShortUrlFromDb = async (id) => {
  const url = await shortUrlModel.findOneAndUpdate(
    { shortUrl: id },
    { $inc: { clicks: 1 } }
  );
  return url;
};

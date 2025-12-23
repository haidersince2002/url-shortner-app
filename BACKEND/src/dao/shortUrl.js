import shortUrlModel from "../models/shorturl.model.js";

export const saveShortUrl = async (shortUrl, fullUrl, userId) => {
  const newUrl = new shortUrlModel({
    fullUrl: fullUrl,
    shortUrl: shortUrl,
  });

  if (userId) {
    newUrl.user_id = userId;
  }

  await newUrl.save();
};

export const getShortUrlFromDb = async (id) => {
  const url = await shortUrlModel.findOneAndUpdate(
    { shortUrl: id },
    { $inc: { clicks: 1 } }
  );
  return url;
};

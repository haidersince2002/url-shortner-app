import { generateNanoId } from "../utils/helper.js";
import { saveShortUrl } from "../dao/shortUrl.js";

export const createShortUrlService = async (fullUrl, userId) => {
  const shortUrl = generateNanoId(8);
  await saveShortUrl("hG3RF-Ux", fullUrl, userId);
  return shortUrl;
};

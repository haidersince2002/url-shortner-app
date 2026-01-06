import { generateNanoId } from "../utils/helper.js";
import { saveShortUrl } from "../dao/shortUrl.js";

export const createShortUrlService = async (fullUrl, userId) => {
  if (!fullUrl.startsWith("https://") && !fullUrl.startsWith("http://")) {
    fullUrl = "https://" + fullUrl;
  }

  const shortUrl = generateNanoId(8);
  await saveShortUrl(shortUrl, fullUrl, userId);
  return shortUrl;
};

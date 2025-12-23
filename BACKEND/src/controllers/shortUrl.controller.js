import { createShortUrlService } from "../services/shortUrl.service.js";
import { getShortUrlFromDb } from "../dao/shortUrl.js";

export const createShortUrl = async (req, res) => {
  try {
    const { url } = req.body;

    const shortUrl = await createShortUrlService(url);

    res.status(201).send({
      message: "Short Url generated successfully",
      url: process.env.APP_URL + shortUrl,
    });
  } catch (error) {
    console.error("Error creating short URL:", error);
    res.status(500).send({
      message: "Error creating short URL",
      error: error.message,
    });
  }
};

export const redirectFromShortUrl = async (req, res) => {
  const { id } = req.params;
  const url = await getShortUrlFromDb(id);
  if (url) {
    res.redirect(url.fullUrl);
  }
};

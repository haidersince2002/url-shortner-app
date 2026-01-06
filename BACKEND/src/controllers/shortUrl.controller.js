import { createShortUrlService } from "../services/shortUrl.service.js";
import { getShortUrlFromDb } from "../dao/shortUrl.js";
import wrapAsyncHandler from "../utils/wrapAsyncHandler.js";

export const createShortUrl = wrapAsyncHandler(async (req, res, next) => {
  const { url } = req.body;

  if (!url || url.trim() === "") {
    return res.status(400).send({
      message: "URL is required",
    });
  }

  const shortUrl = await createShortUrlService(url);

  res.status(201).send({
    message: "Short Url generated successfully",
    url: process.env.APP_URL + shortUrl,
  });
});

export const redirectFromShortUrl = wrapAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const url = await getShortUrlFromDb(id);

  if (!url) {
    return res.status(404).send({
      message: "Short URL not found",
    });
  }

  res.redirect(url.fullUrl);
});

// import { createShortUrlService } from "../services/shortUrl.service.js";
// import { getShortUrlFromDb } from "../dao/shortUrl.js";

// export const createShortUrl = async (req, res, next) => {
//   try {
//     const { url } = req.body;

//     const shortUrl = await createShortUrlService(url);

//     res.status(201).send({
//       message: "Short Url generated successfully",
//       url: process.env.APP_URL + shortUrl,
//     });
//   } catch (error) {
//     // console.error("Error creating short URL:", error);
//     // res.status(500).send({
//     //   message: "Error creating short URL",
//     //   error: error.message,
//     // });
//     next(error);
//   }
// };

// export const redirectFromShortUrl = async (req, res) => {
//   const { id } = req.params;
//   const url = await getShortUrlFromDb(id);
//   if (url) {
//     res.redirect(url.fullUrl);
//   } else {
//     throw new Error(error);
//   }
// };

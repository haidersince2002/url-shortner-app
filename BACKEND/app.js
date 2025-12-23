import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/db/db.js";
import shortUrlRoute from "./src/routes/shortUrl.route.js";
import { redirectFromShortUrl } from "./src/controllers/shortUrl.controller.js";

const app = express();
dotenv.config("./.env");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/create", shortUrlRoute);
app.get("/:id", redirectFromShortUrl);

const port = 3000;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log("Server is listening at http://localhost:3000");
    });
  })
  .catch((err) => {
    console.error("Can't connect to the MONGODB", err);
  });

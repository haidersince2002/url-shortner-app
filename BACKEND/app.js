import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/db/db.js";
import shortUrlRoute from "./src/routes/shortUrl.route.js";
import authRoute from "./src/routes/user.route.js";
import { redirectFromShortUrl } from "./src/controllers/shortUrl.controller.js";
import { errorHandler } from "./src/utils/errorHandler.js";
import cors from "cors";

const app = express();
dotenv.config("./.env");

// const corsOptions = {
//   origin: process.env.APP_URL || "http://localhost:5173",
//   credentials: true,
// };

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoute);
app.use("/api/create", shortUrlRoute);
app.get("/:id", redirectFromShortUrl);

app.use(errorHandler);

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

/* error level */
// app.js
// services, dao
// controller

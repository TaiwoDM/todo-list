import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({ path: "./config.env" });
import app from "./app.js";

// connect db
mongoose
  .connect(process.env.DB_CONNECTION_STR, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB CONNECTED"));

//   start express app server
const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`APP STARTED`);
});

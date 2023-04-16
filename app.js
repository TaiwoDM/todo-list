import { signup, signin } from "./controllers/auth.js";

import express from "express";

const app = express();

app.use(express.json());

app.post("/api/auth/signup", signup);
app.post("/api/auth/signin", signin);

// unknown routes handler
app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: "route not found",
  });
});

// global error handler
app.use((err, req, res, next) => {
  if (err.code && err.code == 11000) {
    return res.status(400).json({
      status: "fail",
      message: "Provided email has already been used",
    });
  }
  return res.status(500).json({ status: "error", error: err });
});

export default app;

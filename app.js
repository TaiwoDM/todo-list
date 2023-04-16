import User from "./models/User.js";

import express from "express";

const app = express();

app.use(express.json());

app.get("/api/users/", (req, res, next) => {
  return res.status(200).json({});
});

app.post("/api/auth/signup", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ status: "fail", message: "provide mail and password" });
    }

    const user = await User.create({ email, password });

    return res.status(201).json({
      message: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    return next(err);
  }
});

app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: "route not found",
  });
});

export default app;

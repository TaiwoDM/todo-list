import express from "express";

const app = express();

app.use(express.json());

app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: "route not found",
  });
});

export default app;

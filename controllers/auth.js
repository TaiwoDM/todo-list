import User from "../models/User.js";

const signup = async (req, res, next) => {
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
};

export { signup };

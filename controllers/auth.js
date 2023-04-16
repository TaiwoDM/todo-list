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

const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // if email or password is not provided in request body
    if (!email || !password) {
      return res
        .status(400)
        .json({ status: "fail", message: "provide mail and password" });
    }

    const user = await User.findOne({ email }).select("+password");

    // if no user in the db is found with provided email
    if (!user) {
      return res.status(400).json({
        status: "fail",
        message: "no user with provided mail, please signup",
      });
    }

    // if the password of the found user is not correct
    if (!(await user.comparePasswords(password, user.password))) {
      return res.status(400).json({
        status: "fail",
        message: "incorrect password, try again",
      });
    }

    return res.status(200).json({
      status: "success",
    });
  } catch (err) {
    return next(err);
  }
};

export { signup, signin };

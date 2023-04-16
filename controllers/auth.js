import User from "../models/User.js";

import { promisify } from "util";
import jwt from "jsonwebtoken";

// User signup
const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // if email or password is not provided
    if (!email || !password) {
      return res
        .status(400)
        .json({ status: "fail", message: "provide mail and password" });
    }

    const user = await User.create({ email, password });
    user.password = undefined;

    //  sign token and send token in cookie for session //
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.cookie("jwt", token, {
      expiresIn: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
    });
    //  // // // // // // // // // // // // // // // // //

    return res.status(201).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    return next(err);
  }
};

// User signin
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

    //x  sign token and send token in cookie for session //
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.cookie("jwt", token, {
      expiresIn: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
    });
    //  // // // // // // // // // // // // // // // // //

    return res.status(200).json({
      status: "success",
      data: { user },
    });
  } catch (err) {
    return next(err);
  }
};

export { signup, signin };

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  emmail: {
    type: String,
    require: [true, "Provide all required info to create user"],
    trim: true,
  },

  password: {
    type: String,
    require: [true, "Provide all required info to create user"],
    select: false,
  },
});

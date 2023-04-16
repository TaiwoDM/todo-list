import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    unique: true,
  },

  password: {
    type: String,
    select: false,
  },
});

// hash passwordd before saving to db
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
});

const User = mongoose.model("User", userSchema);

export default User;

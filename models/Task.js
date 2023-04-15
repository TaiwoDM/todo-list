import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
  title: {
    type: String,
    minLength: [3, "A task must have at least 3 characters"],
    maxLength: [20, "A task cannot have more than 20 characters"],
    required: [true, "Provide all required information"],
  },

  comment: {
    type: String,
    minLength: [3, "A task must have at least 3 characters"],
    maxLength: [100, "A task cannot have more than 100 characters"],
    required: [true, "Provide all required information"],
  },

  dateCreated: {
    type: Date,
    default: Date.now(),
    required: [true, "Provide all required information"],
  },

  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Task must belong to a user"],
  },
});

const Task = mongoose.model("Task", taskSchema);

export default Task;

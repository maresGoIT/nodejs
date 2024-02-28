import { Schema, model } from "mongoose";

const taskSchema = new Schema({
  name: String,
  isCompleted: Boolean,
  dueDate: Date,
});

const Task = model("Task", taskSchema);

export default Task;

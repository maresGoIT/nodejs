import mongoose from "mongoose";
import dotenv from "dotenv";
import Task from "./model/tasks.js";

dotenv.config();

const getTasks = async () => {
  const result = await Task.find().exec();
  console.log(result);
};

try {
  const dbConnection = await mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Connected to database...");
} catch (error) {
  console.error("An error has occured.");
}

getTasks();

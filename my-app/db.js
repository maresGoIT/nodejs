const { default: mongoose } = require("mongoose");

require("dotenv").config();

// Database connect
const connectToDb = async () => {
  try {
    const dbConnection = await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

exports.connectToDb = connectToDb;

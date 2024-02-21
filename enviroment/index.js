// const env = process.env.NODE_ENV || "development";
// import config from "./config/config.js";

// const database = config[env].DB_NAME;

// console.log(`Baza de date folosita este: ${database}`);
import "dotenv/config";
// console.log(process.env);

const logLevel = process.env.LOG_LEVEL || "info";
console.log(logLevel);

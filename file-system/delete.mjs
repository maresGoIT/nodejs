import fs from "fs";

// Deleting a file
fs.unlink("example.txt", (err) => {
  if (err) {
    console.error("Error deleting file:", err);
    return;
  }
  console.log("File deleted successfully");
});

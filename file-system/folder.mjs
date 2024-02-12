import fs from "fs";

fs.mkdir("nodejs", (err) => {
  if (err) {
    console.error("Error creating directory:", err);
    return;
  }

  console.log("Directory created successfully");
});

// Deleting a directory
// fs.rmdir("nodejs", (err) => {
//   if (err) {
//     console.error("Error removing directory:", err);
//     return;
//   }
//   console.log("Directory removed successfully");
// });

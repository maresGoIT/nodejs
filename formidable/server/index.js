const express = require("express");
const cors = require("cors");
const { IncomingForm } = require("formidable");
const app = express();

app.use(cors());
app.get("/", (req, res) => {
  res.status(200).send("Serverul functioneaza...");
});

app.post("/profile", function (req, res, next) {
  const customOptions = {
    uploadDir: "upload",
    keepExtensions: true,
    allowEmptyFiles: false,
    maxFileSize: 5 * 1024 * 1024 * 1024,
    multiples: true,
  };

  const form = new IncomingForm(customOptions);

  form.parse(req, (err, field, file) => {
    console.log(file);
    if (err) throw err;

    if (!file.myfiles)
      return res.status(400).json({ message: "No file Selected" });
    file.myfiles.forEach((file) => {
      const newFilepath = `${uploadDir}/${file.originalFilename}`;
      fs.rename(file.filepath, newFilepath, (err) => err);
    });

    return res.status(200).json({ message: " File Uploaded " });
  });
});

console.log("Listening on port 3000...");
app.listen(3000);

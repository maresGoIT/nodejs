const express = require("express");
const multer = require("multer");
const cors = require("cors");
const upload = multer({ dest: "uploads/" }).single("avatar");

const app = express();

app.use(cors());
app.get("/", (res) => {
  res.render("index", { title: "Express" });
});

app.post("/profile", function (req, res) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.error(error);
      res.status(500).send("A aparut o eroare");
    } else if (err) {
      console.error(error);
      res.status(500).send("A aparut o eroare");
    }

    res.status(200).send("Fisierul a fost incarcat");
    console.dir(req.body);
    // I can save Avatar:req.file, Name: req.body.name, Email: req.body.email
    // Everything went fine.
  });
});

console.log("Listening on port 3000...");
app.listen(3000);

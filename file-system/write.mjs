import fs from "fs";

// Writing to a file
fs.writeFile("culori.txt", "Rosu,Albastru,Verde,Galben", (err) => {
  if (err) {
    console.error("A aparut o eroare:", err);
    return;
  }

  console.log("Fisierul a fost creat!");
});

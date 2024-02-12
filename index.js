const http = require("http");
const port = 8080;

http
  .createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            <h1>Cod HTML de pe server</h1>
            <p>Acesta este un paragraf</p>
            <p>Un al doilea paragraf</p>
        </body>
        </html>`);
    res.end();
  })
  .listen(port);

console.log(`Server pornit pe ${port}`);

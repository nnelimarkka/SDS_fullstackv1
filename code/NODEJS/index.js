const http = require("http");
const path = require("path");
const fs = require("fs");
const { randomBytes } = require("crypto");

const server = http.createServer((req, res) => {
   // if (req.url === '/') {
  //   fs.readFile(
  //     path.join(__dirname, 'public', 'index.html'),
  //     (err, content) => {
  //       if (err) throw err;
  //       res.writeHead(200, { 'Content-Type': 'text/html' });
  //       res.end(content);
  //     }
  //   );
  // }

  // if (req.url === '/api/users') {
  //   const users = [
  //     { name: 'Mike', age: 24 },
  //     { name: 'John', age: 30 }
  //   ];
  //   res.writeHead(200, { 'Content-Type': 'application/json' });
  //   res.end(JSON.stringify(users));
  // }

  //filepath

  let filePath = path.join(__dirname, "public", req.url === "/" ? "index.html": req.url);

  //file extension
  let extname = path.extname(filePath);

  //initial content-type
  let contentType = "text/html";

  //check extension and change content-type accordingly
  switch(extname) {
    case ".js":
        contentType = "text/javascript";
        break;
      case ".css":
        contentType = "text/css";
        break;
      case ".json":
        contentType = "application/json";
        break;
      case ".png":
        contentType = "image/png";
        break;
      case ".jpg":
        contentType = "image/jpg";
        break;
  }

  //read file
  fs.readFile(filePath, (err, content) => {
      if(err) {
          if(err.code == 'ENOENT') {
              //page not found
              fs.readFile(path.join(__dirname, "public", "404.html"), (err, content) => {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(content, "utf8");
              });
          }
          else {
              //server error
              res.writeHead(500);
              res.end(`Server error: ${err.code}`);
          }
      }
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, "utf8");
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));


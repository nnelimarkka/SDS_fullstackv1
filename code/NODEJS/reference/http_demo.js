const http = require("http");

// server object
http.createServer((req, res) => {
    //response
    res.write("Hello world!");
    res.writeHead(200, {"content-type": "text/html"});
    res.end();
})
.listen(5000, () => console.log("Server running..."));



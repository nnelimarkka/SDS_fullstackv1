const express = require("express");
const path = require("path");
const {engine} = require("express-handlebars");
//const logger = require("./middleware/Logger.js")
const membersRouter = require("./routes/api/members");
const members = require("./Members");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.engine("handlebars", engine({defaultLayout: "main"}));
app.set("view engine", "handlebars");

//homepage using view engine
app.get("/", (req, res) => {
    res.render("index", {title: "Member app", members});
});

//setting a static directory in order to access files on the website
app.use(express.static(path.join(__dirname, "public")));

//using router for routes /api/...
app.use("/api", membersRouter);

//initializing middleware
//app.use(logger);

//body parser middleware !!! needs to be defined before routes !!!
//app.use(express.json());
//app.use(express.urlencoded({extended: false}));


/*
app.get("/", (req, res) => {
    //res.send("<h1>Hello world!</h1>");
    
    //sending html file as response manually
    res.sendFile(path.join(__dirname, "public", "index.html"));
});
*/

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
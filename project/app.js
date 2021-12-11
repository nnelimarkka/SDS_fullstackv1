const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");
const config = require("./config/database");
const usersRouter = require("./routes/users");

mongoose.connect(config.database);

mongoose.connection.on("connected", () => {
    console.log("Connected to database: " + config.database);
})

mongoose.connection.on("error", (err) => {
    console.log("Database error " + err);
})

const app = express();

app.use(cors());
app.use(bodyParser.json());


//static folder
app.use(express.static(path.join(__dirname, "public")));

const port = process.env.PORT || 3000;

//passport for authentication
app.use(passport.initialize());
app.use(passport.session());

require("./config/passport")(passport);

app.use("/users", usersRouter);

app.get("/", (req, res) => {
    res.send("invalid route")
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"))
})

app.listen(port, () => {
    console.log(`server started on port ${port}`)
});
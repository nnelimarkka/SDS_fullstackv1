const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let Comments = new Schema({
    author: String,
    username: String,
    body: String,
    date: Date
});

let Post = new Schema ({
    author: String,
    username: String,
    title: String,
    body: String,
    date: Date,
    comments: [Comments]

});

module.exports = mongoose.model("posts", Post);
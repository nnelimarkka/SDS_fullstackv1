var express = require('express');
var router = express.Router();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const {body, validationResult } = require("express-validator");
const User = require("../models/User");
const Posts = require("../models/Posts");
const jwt = require("jsonwebtoken");
const passport = require("passport");
let jwtStrategy = require("passport-jwt").Strategy,
extractJwt = require('passport-jwt').ExtractJwt;
require('dotenv').config(); 
const { application, request } = require('express');
const multer = require("multer")
const storage = multer.memoryStorage();
const upload = multer({storage})
const config = require("../config/database");
const hljs = require("highlight.js");

router.get("/posts", (req, res) => {
    Posts.find({}, (err, postArray) => {
      if (err) throw err;
      if(!postArray || postArray.length == 0) {
        return res.json({message: "No posts found"});
      } else {
        return res.send(postArray);
      }
    });
  })

  //get one post
  router.get("/post/:title", (req, res) => {
    Posts.findOne({title: req.params.title}, (err, post) => {
      if (err) throw err;
      if (post) {
        res.send(post);
      } else {
        return res.json({message: `Post: ${req.params.title} not found`});
      }
    })
  })

  //posting a new post
  router.post("/posts/post", passport.authenticate('jwt', {session: false}), (req, res) => {
    Posts.findOne({title: req.body.title}, (err, post) => {
      if (err) throw err;
      if (post) {
        return res.json({message: "Dublicate post"});
      } else {
      Posts.create(
        {
          author: req.user._id,
          username: req.user.username,
          title: req.body.title,
          body: req.body.body,
          formattedBody: highlight(req.body.body),
          date: Date()
        },
        (err, ok) => {
          if(err) throw err;
          return res.json({message: "ok"});
        }
      );
      }
    })
  })

  //adding a new comment to existing post
  router.post("/posts/update/:title", passport.authenticate('jwt', {session: false}), (req, res) => {
    Posts.updateOne(
      {title: req.params.title},
      {$push: {comments: {
        author: req.user._id,
        username: req.user.username,
        body: req.body.body,
        date: Date()
      }}},
      (err, ok) => {
        if (err) throw err;
        else {
          return res.json({message: "ok"})
        }
      }
    )
  })

  //highlight code
  function highlight(code) {
    return hljs.highlightAuto(code).value;
  }

  module.exports = router;
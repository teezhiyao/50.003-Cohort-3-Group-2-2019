import { Router } from "express";
import * as PostController from "../controllers/post.controller";
import config from "../config";
import Issue from "../models/post";
import Reply from "../models/reply";

import cuid from "cuid";
import slug from "limax";
import sanitizeHtml from "sanitize-html";
import issueSchema from "../models/post";
const router = new Router();
const mongo = require("mongodb");
const assert = require("assert");
const url = config.mongoURL;

// Get all Posts
router.route("/posts").get(function (req, res, next) {
  mongo.connect(url, function (err, MongoClient) {
    assert.equal(null, err);
    const db = MongoClient.db("Issue");
    db.collection("issues")
      .find()
      .toArray((err, result) => {
        if (err) return console.log(err);
        // renders index.ejs
        res.json({ posts: result });
      });
  });
});

// Get one post by cuid
router.route("/posts/:cuid").get(PostController.getPost);

// Add a new Post
router.route("/posts").post(function (req, res, next) {
  var tempSlug = slug(req.body.post.title.toLowerCase(), { lowercase: true });
  const newPost = new Issue({
    title: req.body.post.title,
    content: req.body.post.content,
    name: req.body.post.name,
    slug: tempSlug,
    cuid: cuid()
  });
  mongo.connect(url, function (err, MongoClient) {
    assert.equal(null, err);
    var db = MongoClient.db("Issue");
    db.collection("issues").insert(newPost, function (err, result) {
      assert.equal(null, err);
      console.log("Item inserted");
      db.close();
    });
  });
  // Sanitize inputs
  newPost.title = sanitizeHtml(newPost.title);
  newPost.name = sanitizeHtml(newPost.name);
  newPost.content = sanitizeHtml(newPost.content);
  // newPost.slug = tempSlug
  newPost.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ post: saved });
  });
});
// Delete a post by cuid
router.route("/posts/:cuid").delete(function (req, res) {
  mongo.connect(url, function (err, MongoClient) {
    const db = MongoClient.db("Issue");
    console.log(req.params.cuid);
    db.collection("issues").findOneAndDelete(
      { cuid: req.params.cuid },
      (err, result) => {
        if (err) return res.send(500, err);
        res.send("Deleted");
      }
    );
  });
});

// Add a new User
router.route("/userPosts").post(function (req, res, next) {
  var tempSlug = slug(req.body.post.title.toLowerCase(), { lowercase: true });
  const newPost = new Issue({
    title: req.body.post.title,
    content: req.body.post.content,
    name: req.body.post.name,
    slug: tempSlug,
    cuid: cuid()
  });
  console.log(req.body.post);
  mongo.connect(url, function (err, MongoClient) {
    assert.equal(null, err);
    var db = MongoClient.db("Issue");
    db.collection("users").insert(newPost, function (err, result) {
      assert.equal(null, err);
      console.log("Item inserted");
      db.close();
    });
  });

  // Sanitize inputs
  newPost.title = sanitizeHtml(newPost.title);
  newPost.name = sanitizeHtml(newPost.name);
  newPost.content = sanitizeHtml(newPost.content);
  // newPost.slug = tempSlug
  newPost.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ post: saved });
  });
});

// Add a new Reply
router.route("/replies").post(function (req, res, next) {
  console.log("In Add a new reply")
  console.log(req.body)
  const newReply = new Reply({
    reply: req.body.reply.reply,
    cuid: req.body.reply.cuid,
  });
  mongo.connect(url, function (err, MongoClient) {
    assert.equal(null, err);
    var db = MongoClient.db("Issue");
    db.collection("replies").insert(newReply, function (err, result) {
      assert.equal(null, err);
      db.close();
    });
  });
  // Sanitize inputs
  // newReply.reply = sanitizeHtml(newReply.reply);
  // newReply.save((err, saved) => {
  //   if (err) {
  //     res.status(500).send(err);
  //   }
  //   res.json({ post: saved });
  // });
});

export default router;

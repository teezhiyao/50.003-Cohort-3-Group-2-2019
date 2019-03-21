import { Router } from 'express';
import * as PostController from '../controllers/post.controller';
import config from '../config';
import Issue from '../models/post';
import Reply from '../models/reply';

import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';
import issueSchema from '../models/post';
const router = new Router();
const mongo = require('mongodb');
const assert = require('assert');
const url = config.mongoURL;
var request = require('request');

// Get all Posts
router.route('/posts').get(function(req, res, next) {
  mongo.connect(url, function(err, MongoClient) {
    assert.equal(null, err);
    const db = MongoClient.db('Issue');
    db.collection('issues')
      .find()
      .toArray((err, result) => {
        if (err) return console.log(err);
        // renders index.ejs
        res.json({ posts: result });
      });
  });
});

// Get all Replies
router.route('/replys').get(function(req, res, next) {
  mongo.connect(url, function(err, MongoClient) {
    assert.equal(null, err);
    const db = MongoClient.db('Issue');
    // console.log(req.body);
    db.collection('replies')
      .find({ cuid: req.params.cuid })
      .toArray((err, result) => {
        if (err) return console.log(err);
        // renders index.ejs
        res.json({ replys: result });
      });
  });
});

// Get one post by cuid
router.route('/posts/:cuid').get(PostController.getPost);

// Add a new Post
router.route('/posts').post(function(req, res, next) {
  console.log('This api');
  var tempSlug = slug(req.body.post.title.toLowerCase(), { lowercase: true });
  const newPost = new Issue({
    title: req.body.post.title,
    content: req.body.post.content,
    name: req.body.post.name,
    slug: tempSlug,
    cuid: cuid()
  });
  mongo.connect(url, function(err, MongoClient) {
    assert.equal(null, err);
    var db = MongoClient.db('Issue');
    db.collection('issues').insert(newPost, function(err, result) {
      assert.equal(null, err);
      console.log('Item inserted');
      MongoClient.close();
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
router.route('/posts/:cuid').delete(function(req, res) {
  mongo.connect(url, function(err, MongoClient) {
    const db = MongoClient.db('Issue');
    console.log(req.params.cuid);
    db.collection('issues').findOneAndDelete(
      { cuid: req.params.cuid },
      (err, result) => {
        if (err) return res.send(500, err);
        res.send('Deleted');
      }
    );
  });
});

// Add a new User
router.route('/userPosts').post(function(req, res, next) {
  var tempSlug = slug(req.body.post.title.toLowerCase(), { lowercase: true });
  const newPost = new Issue({
    title: req.body.post.title,
    content: req.body.post.content,
    name: req.body.post.name,
    slug: tempSlug,
    cuid: cuid()
  });
  console.log(req.body.post);
  mongo.connect(url, function(err, MongoClient) {
    assert.equal(null, err);
    var db = MongoClient.db('Issue');
    db.collection('users').insert(newPost, function(err, result) {
      assert.equal(null, err);
      console.log('Item inserted');
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
router.route('/replies').post(function(req, res, next) {
  console.log('In Add a new reply');
  console.log(req.body);
  const newReply = new Reply({
    reply: req.body.reply.reply,
    cuid: req.body.reply.cuid
  });
  mongo.connect(url, function(err, MongoClient) {
    assert.equal(null, err);
    var db = MongoClient.db('Issue');
    db.collection('replies').insert(newReply, function(err, result) {
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

const token =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlF6Y3hRVEl5UkRVeU1qYzNSakEzTnpKQ01qVTROVVJFUlVZelF6VTRPRUV6T0RreE1UVTVPQSJ9.eyJpc3MiOiJodHRwczovL2FjbmFwaS1wcm9kLmF1dGgwLmNvbS8iLCJzdWIiOiI1cDZnbzhaNWtwTlI5bHk4U1lONEh5RlVTZEp2WE5oZkBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9wbGFjZWhvbGRlci5jb20vcGxhY2UiLCJpYXQiOjE1NDk5NTI5MDEsImV4cCI6MTU1MjU0NDkwMSwiYXpwIjoiNXA2Z284WjVrcE5SOWx5OFNZTjRIeUZVU2RKdlhOaGYiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.cPm5fS0jQ2R60dtG5gsL97g0ukUGogB9KjbinzvOPHMCmC1YB58tnYTJle3BnG3DePzpQTQlpB9QSaOyE8uXsmNb1rFfOK9oFLLJ9pU7912oYp8KAHfXxtyYs_ajZ6Q9SWbYvPD9OAm5ZhpIb4OmQ4pUkwxoUwWejsHzh0K7u1987X-_wJt-XIb0vn1twJFoTI0qZ_pXwOo7TKNsjYDJkvvA3em-S2CYDqJmD7Nqsg3xEf0yPoH9SQiojqHQt7hgcsMymFVYuV5SOkYknMn3TFHGFQI-iQ3zftKm3iv6i3oxcFEceuOdjPGjXUSWN08xS6gJbxc5N9yzIBB6rgRI8A';
const userUrl =
  'https://ug-api.acnapiv3.io/swivel/acnapi-common-services/common/users';
var request = require('request');

router.route('/userRegister').post(function(req, res, next) {
  console.log('I have reached here');
  console.log(req.body);
  var options = {
    method: 'POST',
    url: userUrl,
    headers: {
      'cache-control': 'no-cache',
      'Server-Token': token,
      'Content-Type': 'application/json'
    },
    body: req.body.post,
    json: true
  };
  request(options, function(error, response, body) {
    if (error) throw new Error(error);
    console.log(body);
  });
});

router.route('/queryAll').get(function(req, res, next) {
  var options = {
    method: 'GET',
    url: `${userUrl}/users`,
    headers: {
      'cache-control': 'no-cache',
      'Server-Token': token,
      'Content-Type': 'application/json'
    }
  };
  request(options, function(error, response, body) {
    if (error) throw new Error(error);
    console.log(body);
  });
});

router.route('/updateUser').put(function(req, res, next) {
  const username = user;
  const sessionToken = 1029382;
  var options = {
    method: 'PUT',
    url: `${userUrl}/${username}`,
    headers: {
      'cache-control': 'no-cache',
      'X-Parse-Session-Token': sessionToken,
      'Server-Token': token,
      'Content-Type': 'application/json'
    },
    body: req.body
  };
  request(options, function(error, response, body) {
    if (error) throw new Error(error);
    console.log(body);
  });
});

router.route('/getCurrentUser').get(function(req, res, next) {
  var options = {
    method: 'GET',
    url: `${userUrl}/me`,
    headers: {
      'cache-control': 'no-cache',
      'X-Parse-Session-Token': sessionToken,
      'Server-Token': token,
      'Content-Type': 'application/json'
    }
  };
  request(options, function(error, response, body) {
    if (error) throw new Error(error);
    console.log(body);
  });
});

router.route('/deleteUser').delete(function(req, res, next) {
  const username = user;
  const sessionToken = 1029382;
  var options = {
    method: 'DELETE',
    url: `${userUrl}/${username}`,
    headers: {
      'cache-control': 'no-cache',
      'X-Parse-Session-Token': sessionToken,
      'Server-Token': token,
      'Content-Type': 'application/json'
    }
  };
  request(options, function(error, response, body) {
    if (error) throw new Error(error);
    console.log(body);
  });
});

export default router;

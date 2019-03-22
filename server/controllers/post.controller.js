import Post from "../models/post";
import cuid from "cuid";
import slug from "limax";
import sanitizeHtml from "sanitize-html";

// /**
//  * Get all posts
//  * @param req
//  * @param res
//  * @returns void
//  */
// export function getPosts(req, res) {
//   Post.find().sort('-dateAdded').exec((err, posts) => {
//     if (err) {
//       res.status(500).send(err);
//     }
//     res.json({ posts });
//   });
// }

// /**
//  * Get a single post
//  * @param req
//  * @param res
//  * @returns void
//  */
// export function getPost(req, res) {
//   Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
//     if (err) {
//       res.status(500).send(err);
//     }
//     res.json({ post });
//   });
// }

/**
 * Delete a post
 * @param req
 * @param res
 * @returns void
 */
export function deletePost(req, res) {
  Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
    if (err) {
      res.status(500).send(err);
    }

    post.remove(() => {
      res.status(200).end();
    });
  });
}

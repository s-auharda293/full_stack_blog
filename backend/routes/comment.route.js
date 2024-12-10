import express from "express";
import {
  getPostComments,
  addPostComment,
  deletePostComment,
} from "./../controllers/comment.controller.js";

const router = express.Router();

router.get("/:postId", getPostComments);

router.post("/:postId", addPostComment);
router.delete("/:id", deletePostComment);

export default router;

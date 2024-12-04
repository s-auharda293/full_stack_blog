import Comment from "../models/comment.model.js";
import User from "../models/user.model.js";

export const getComments = async (req, res) => {
  const comments = await Comment.find({ post: req.params.postId })
    .populate("user", "username img")
    .sort({ createdAt: -1 });

  res.json(comments);
};

export const addComment = async (req, res) => {
  const clerkUserId = req.auth.clerkUserId;
  const postId = req.params.postId;

  if (!clerkUserId) {
    return res.status(401).json("Not authenticated!");
  }

  const user = await User.findOne({ clerkUserId });

  const newComment = new Comment({
    ...req.body,
    user: user._id,
    post: postId,
  });

  const savedComment = await newComment.save();

  res.status(201).json(savedComment);
};

export const deleteComment = async (req, res) => {
  const clerkUserId = req.auth.clerkUserId;
  const postId = req.params.postId;

  if (!clerkUserId) {
    return res.status(401).json("Not authenticated!");
  }

  const user = User.findOne({ clerkUserId });

  const deletedComment = await Comment.findOneAndDelete({
    _id: id,
    user: user._id,
  });

  if (!deletedComment) {
    return res.status(403).json("You can delete only your comment!");
  }

  res.status(200).json("Comment deleted");
};

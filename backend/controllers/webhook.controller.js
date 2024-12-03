import User from "../models/user.model.js";
import { Webhook } from "svix";
import Post from "../models/post.model.js";
import Comment from "../models/comment.model.js";

export const clerkWebHook = async (req, res) => {
  const WEBHOOK_SERCRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SERCRET) {
    throw new Error("Webhook secret needed!");
  }

  const payload = req.body;
  const headers = req.headers;

  const wh = new Webhook(WEBHOOK_SERCRET);
  let evt;
  try {
    evt = wh.verify(payload, headers);
  } catch (err) {
    res.status(400).json({
      message: "Webhook verification failed",
    });
  }
  //   console.log(evt.data);

  if (evt.type === "user.created") {
    const newUser = new User({
      clerkUserId: evt.data.id,
      username: evt.data.username || evt.data.email_addresses[0].email_address,
      email: evt.data.email_addresses[0].email_address,
      img: evt.data.profile_img_url,
    });

    await newUser.save();
  }

  if (evt.type === "user.updated") {
    await User.findOneAndUpdate(
      { clerkUserId: evt.data.id }, // Search for the user by clerkUserId
      {
        username:
          evt.data.username || evt.data.email_addresses[0].email_address,
        email: evt.data.email_addresses[0].email_address,
        img: evt.data.profile_img_url,
      },
      { upsert: true, new: true } // Create a new user if not found and return the updated document
    );
  }

  if (evt.type === "user.deleted") {
    const deletedUser = await User.findOneAndDelete({
      clerkUserId: evt.data.id,
    });
    if (deletedUser) {
      await Post.deleteMany({ user: deletedUser._id });
      await Comment.deleteMany({ user: deletedUser._id });
    }
  }

  return res.status(200).json({
    message: "Webhook received",
  });
};

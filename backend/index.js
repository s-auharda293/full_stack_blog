import express from "express";
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";
import commentRouter from "./routes/comment.route.js";
import webhookRouter from "./routes/webhook.route.js";
import connectDB from "./lib/connectDB.js";

const app = express();

app.use("/webhooks", webhookRouter);

app.use(express.json());

app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);

app.use((err, req, res, next) => {
  res.status(err.status || 500);

  res.json({
    message: err.message || "Something went wrong!",
    status: err.status,
    stack: err.stack,
  });
});

app.listen(3000, () => {
  connectDB();
  console.log("Server is running!");
});

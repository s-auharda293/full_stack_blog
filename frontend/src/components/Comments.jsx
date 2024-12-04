import Comment from "./Comment";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-react";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

const fetchComments = async (postId) => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/comments/${postId}`
  );
  return res.data;
};

const Comments = ({ postId }) => {
  const [commentText, setCommentText] = useState("");
  const { getToken } = useAuth();
  const { isPending, error, data } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => fetchComments(postId),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newComment) => {
      const token = await getToken();
      return axios.post(
        `${import.meta.env.VITE_API_URL}/comments/${postId}`,
        newComment,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },

    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
      setCommentText("");
    },

    onError: (err) => {
      const errorMessage =
        err.response?.data?.message || err.message || "Something went wrong.";
      toast.error(errorMessage);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      desc: commentText,
    };

    mutation.mutate(data);
  };

  if (isPending) return "Loading...";
  if (error) return "Something went wrong!..." + error.message;

  return (
    <div className="flex flex-col gap-8 lg:w-3/5 mb-12">
      <h1 className="text-cl text-gray-500 underline">Comments</h1>
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-between gap-8 w-full"
      >
        <textarea
          name="desc"
          placeholder="Write a comment..."
          className="w-full p-4 rounded-xl"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button className="bg-blue-800 px-4 py-3 text-white font-medium rounded-xl">
          Post
        </button>
      </form>
      {data.map((comment) => (
        <Comment key={comment._id} comment={comment} />
      ))}
      {/* <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment /> */}
    </div>
  );
};

export default Comments;

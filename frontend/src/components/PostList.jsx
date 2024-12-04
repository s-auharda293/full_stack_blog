import PostListItem from "./PostListItem";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";

const fetchPosts = async (pageParam) => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts`, {
    params: { page: pageParam, limit: 2 },
  });
  return res.data;
};

const PostList = () => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) =>
      lastPage.hasMore ? pages.length + 1 : undefined,
  });

  console.log(data);
  // console.log("data.pages", data.pages);
  // https://chatgpt.com/share/67502e9f-d958-8004-8aee-aa11ebd4ea9b

  const allPosts = data?.pages?.flatMap((page) => page.posts) || [];
  console.log(allPosts);

  // -1;
  // posts: [1, 2]
  // - 2;
  // posts: [3, 4]
  // - 3;
  // posts: [5, 6];
  //to make an array of posts we are going to use flatMap
  // posts=[1,2,3,4,5,6]

  if (isFetching) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  console.log(data);

  return (
    // <div className="flex flex-col gap-12 mb-8">
    <InfiniteScroll
      dataLength={allPosts.length}
      next={fetchNextPage}
      hasMore={!!hasNextPage}
      loader={<h4>Loading more posts...</h4>}
      endMessage={
        <p>
          <b>All posts loaded!</b>
        </p>
      }
    >
      {allPosts.map((post) => (
        <PostListItem key={post._id} post={post}></PostListItem>
      ))}
    </InfiniteScroll>
  );
};

export default PostList;

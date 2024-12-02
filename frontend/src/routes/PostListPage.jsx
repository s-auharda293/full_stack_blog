import PostList from "./../components/PostList";
import SideMenu from "./../components/SideMenu";
import { useState } from "react";

const PostListPage = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="">
      <h1 className="mb-8 text-2xl">Development Blog</h1>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="bg-blue-800 text-sm text-white px-4 py-2 rounded-2xl md:hidden mb-4"
      >
        {open ? "Close" : "Filter or Search"}
      </button>
      <div className="flex gap-8 flex-col-reverse md:flex-row">
        <div className="">
          <PostList />
        </div>
        <div className={`${open ? "block" : "hidden"} md:block`}>
          <SideMenu />
        </div>
      </div>
    </div>
  );
};

export default PostListPage;

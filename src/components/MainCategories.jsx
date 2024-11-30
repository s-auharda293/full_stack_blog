import { Link } from "react-router-dom";

const MainCategories = () => {
  return (
    <div className="hidden md:flex bg-white rounded-3xl xl:rounded-full p-4 shadow-lg items-center justify-center gap-8">
      {/* LINKS  */}
      <div className="flex-1 flex items-center justify-between flex-wrap">
        <Link
          to="/posts"
          className="bg-blue-800 text-white rounded-full px-4 py-2"
        >
          All Posts
        </Link>
        <Link to="/posts" className=" hover:bg-blue-50 rounded-full px-4 py-2">
          Web Design
        </Link>
      </div>
      {/* SEARCH  */}
      <div className="">Search</div>
    </div>
  );
};

export default MainCategories;

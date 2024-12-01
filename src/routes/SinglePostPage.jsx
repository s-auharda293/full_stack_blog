import { Link } from "react-router-dom";
import Image from "../components/Image";
import PostMenuActions from "../components/PostMenuActions";

const SinglePostPage = () => {
  return (
    <div className="flex flex-col gap-8">
      {/* DETAIL  */}
      <div className="flex gap-8">
        <div className="lg:w-3/5 flex flex-col gap-8">
          <h1 className="text-xl md:text-3xl xl:text-4xl 2xl:text-5xl font-semibold">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.{" "}
          </h1>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <span>Written by</span>
            <Link className="text-blue-800">John Doe</Link>
            <span>on</span>
            <Link className="text-blue-800">Web Design</Link>
            <span>2 days ago</span>
          </div>
          <p className="text-gray-500 font-medium">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam minima
            ratione laborum beatae corporis
          </p>
        </div>
        <div className="hidden lg:block w-2/5">
          <Image src="postImg.jpeg" w="600" className="rounded-2xl" />
        </div>
      </div>
      {/* CONTENT  */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* TEXT  */}
        <div className="lg:text-lg flex flex-col gap-6 text-justify">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
            natus error sapiente autem accusamus delectus commodi? Nobis
            dolorum, commodi et ut minima provident ullam repudiandae dicta
            fugiat, mollitia ipsam necessitatibus! Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Voluptatibus necessitatibus id
            corrupti vero, debitis asperiores obcaecati molestiae excepturi
            assumenda ad dolores. Repellat explicabo molestias quod perferendis
            repudiandae consequatur error quos.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
            natus error sapiente autem accusamus delectus commodi? Nobis
            dolorum, commodi et ut minima provident ullam repudiandae dicta
            fugiat, mollitia ipsam necessitatibus!Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Voluptatibus necessitatibus id
            corrupti vero, debitis asperiores obcaecati molestiae excepturi
            assumenda ad dolores. Repellat explicabo molestias quod perferendis
            repudiandae consequatur error quos.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
            natus error sapiente autem accusamus delectus commodi? Nobis
            dolorum, commodi et ut minima provident ullam repudiandae dicta
            fugiat, mollitia ipsam necessitatibus!Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Voluptatibus necessitatibus id
            corrupti vero, debitis asperiores obcaecati molestiae excepturi
            assumenda ad dolores. Repellat explicabo molestias quod perferendis
            repudiandae consequatur error quos.
          </p>
        </div>
        {/* MENU  */}
        <div className="px-4 h-max sticky top-8">
          <h1>Author</h1>
          <div className="">
            <Image
              src="userImg.jpeg"
              className="w-12 h-12 rounded-full object-cover"
              w="48"
              h="48"
            />
            <Link>John Doe</Link>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
            <div className="flex gap-2">
              <Link>
                <Image src="facebook.svg" />
              </Link>
              <Link>
                <Image src="instagram.svg" />
              </Link>
            </div>
          </div>
        </div>
        <PostMenuActions />
        <h1>Categories</h1>
        <div className="flex flex-col gap-2 text-sm">
          <Link className="underline">All</Link>
        </div>
      </div>
    </div>
  );
};

export default SinglePostPage;

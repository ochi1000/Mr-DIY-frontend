import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className=" flex flex-col items-center justify-center p-20">
      <p className=" text-3xl font-semibold">Page Not Found</p>
      <Link to="/">
        <p className=" text-sm font-medium p-4 border border-gray-500 rounded-lg mt-4">
          Return Home
        </p>
      </Link>
    </div>
  );
};

export default PageNotFound;

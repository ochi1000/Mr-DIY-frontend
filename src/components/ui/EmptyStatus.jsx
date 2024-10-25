/* eslint-disable react/prop-types */
import EmptyImage from "src/assets/images/404-light.svg";

import { Link, useNavigate } from "react-router-dom";
import { Button } from "../forms/Button";

const EmptyStatus = ({ message, link, title, image, reload }) => {
  const navigate = useNavigate();

  const handleReload = () => {
    navigate(0); // Reloads the current page
  };

  return (
    <div className="pb-32  w-full h-full flex flex-col items-center justify-center space-y-6">
      <div className="relative pt-12 ">
        {/* <h2 className="text-[280px] text-gray-300 font-bold ">404</h2> */}
        <div className=" flex justify-center ">
          <img
            src={image ? image : EmptyImage}
            alt="error"
            className="w-40 h-40"
          />
        </div>
      </div>
      <div className="mt-4">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-800 text-center pb-2">
          {title}
        </h2>
        <p className="text-base text-gray-600 max-w-lg text-center ">
          {message}
        </p>
      </div>
      {reload ? (
        <Button onClick={handleReload}>Start shopping</Button>
      ) : (
        <Link to={link}>
          <Button>Start shopping</Button>
        </Link>
      )}
    </div>
  );
};

export default EmptyStatus;

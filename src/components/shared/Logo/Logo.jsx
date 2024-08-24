/* eslint-disable react/prop-types */
import logo from "src/assets/images/logo.svg";

import { Link } from "react-router-dom";

const Logo = ({ className }) => {
  return (
    <Link
      to="/"
      className={`ttnc-logo inline-block text-slate-600 flex-shrink-0 ${className}`}
    >
      <img
        className="hidden h-8 sm:h-10 w-auto dark:block"
        src={logo}
        alt="Logo"
        sizes="200px"
      />
    </Link>
  );
};

export default Logo;

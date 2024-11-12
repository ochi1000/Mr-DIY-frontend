import { Link } from "react-router-dom";
import userMenu from "src/data/userMenu";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import { logoutThunk } from "src/Redux/auth/authThunk";
import { userLogoutThunk } from "../Redux/userAuth/userAuthThunk";
import { persistor } from "../Redux/store";

const UserMenu = () => {
  const dispatch = useDispatch();

  const { currentUser, loading } = useSelector((state) => state.auth);
  const { currentauthUser, loading: userLoading } = useSelector(
    (state) => state.userauth
  );

  const handleLogout = () => {
    if (currentUser) {
      dispatch(logoutThunk());
      persistor.purge();
    } else {
      dispatch(userLogoutThunk());
      persistor.purge();
    }
  };

  // console.log("first login", currentUser);
  return (
    <div className="absolute top-10 right-3 transition-all duration-300 ease-in">
      <div className="z-50 my-4 text-base text-left list-none bg-gray-50  rounded shadow ">
        <div className="border-b pb-2 border-gray-400 p-4 px-8">
          <p className=" text-gray-900 font-semibold capitalize">
            {currentUser?.first_name ||
              currentUser?.data?.user?.first_name ||
              currentauthUser?.first_name ||
              currentauthUser?.data?.user?.first_name}{" "}
            {currentUser?.last_name ||
              currentUser?.data?.user?.last_name ||
              currentauthUser?.last_name ||
              currentauthUser?.data?.user?.last_name}
          </p>
          <p className="text-sm font-normal text-gray-500 truncate ">
            {currentUser?.email ||
              currentUser?.data?.user?.email ||
              currentauthUser?.email ||
              currentauthUser?.data?.user?.email}
          </p>
        </div>
        <ul className="py-2 ">
          {userMenu.map(({ link, routeName }, index) => (
            <li key={index} className="">
              <Link
                to={link}
                className="block  py-2 px-8 text-sm text-gray-800 hover:text-gray-900 hover:bg-gray-200"
              >
                {routeName}
              </Link>
            </li>
          ))}
          <li
            className="block  py-2 px-8 text-sm text-gray-800 hover:text-gray-900 hover:bg-gray-200 cursor-pointer"
            onClick={handleLogout}
          >
            {loading || userLoading ? "Signing out..." : "Sign out"}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserMenu;

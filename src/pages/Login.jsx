/* eslint-disable no-unused-vars */
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../components/shared/Logo/Logo";
import { LoginSchema } from "../schema/authSchema";

import { useDispatch, useSelector } from "react-redux";
import { Input } from "../components/forms/Input";
import { Button } from "../components/forms/Button";
import HookForm from "../components/forms/Form";
import { GoogleIcon } from "../assets/SvgIcons";
// import toast from "react-hot-toast";

// import { googleLoginThunk } from "../Redux/auth/authThunk";
import LoadingSpinner from "../components/Loading/LoadingSpinner";
import { useEffect, useState } from "react";
// import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

import axios from "axios";
import { userLoginThunk } from "../Redux/userAuth/userAuthThunk";
import toast from "react-hot-toast";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Explicitly define the type of 'state' using the RootState interface
  const { userIsAuthenticated, error, loading } = useSelector(
    (state) => state.userauth
  );

  // console.log("user is authenticated", userIsAuthenticated);
  useEffect(() => {
    const checkAuthentication = async () => {
      if (userIsAuthenticated === null || false) {
        // setLoading(true);
        return;
      }

      if (userIsAuthenticated) {
        navigate("/");
      }
      // setLoading(false);
    };

    checkAuthentication();
  }, [userIsAuthenticated, navigate]); // Dependency array to ensure useEffect() runs only when needed

  // console.log(error);

  //////////////////////////////////////////////////////////////////////// START HERE

  // const history = useHistory();
  // const [userData, setUserData] = useState({});
  // const [errorUser, setErrorUser] = useState(null);

  // useEffect(() => {
  //   const urlParams = new URLSearchParams(window.location.search);
  //   const callbackData = urlParams.get("code");

  //   // Assuming your backend API is set up to handle the callback
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(window.location.href);
  //       const data = await response.json();
  //       setUserData(data.data.user);
  //     } catch (error) {
  //       setErrorUser(error.message);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // const location = useLocation();
  // const [authData, setAuthData] = useState(null);

  // useEffect(() => {
  //   const fetchAuthData = async () => {
  //     try {
  //       const params = new URLSearchParams(location.search);
  //       const token = params.get("token"); // This assumes your token is passed in the query string

  //       if (token) {
  //         // Example: call your backend API to verify the token or fetch user data
  //         const response = await axios.get(
  //           "https://phplaravel-1329305-4863390.cloudwaysapps.com/auth/google/callback",
  //           {
  //             params: {
  //               token: token,
  //             },
  //           }
  //         );

  //         // Set the auth data from the response
  //         setAuthData(response.data);
  //         // You can store the token or user data in local storage if needed
  //         localStorage.setItem("authToken", response.data.data.token);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching Google Auth data:", error);
  //     }
  //   };

  //   fetchAuthData();
  // }, [location]);

  // if (!authData) return <div>Loading...</div>;
  // toast.error(error);
  const onSubmit = async (data) => {
    // alert(JSON.stringify(data));
    // dispatch(userLoginThunk(data));

    try {
      const result = await dispatch(userLoginThunk(data)).unwrap();
      console.log("user result", result);
      if (result.status >= 200 && result.status <= 300) {
        navigate("/");
        toast.success(result?.message);
      }
    } catch (error) {
      if (error?.status >= 400 && error?.status <= 499) {
        // console.log("USER LOGIN ERROR", error);
        // const errorMessages = Object.values(error?.errors).flat().join(", ");
        toast.error(error?.message, { duration: 6000 });
      }
    }
    // navigate("/admin/dashboard");
  };

  // const handleGoogleLogin = () => {
  //   // alert(JSON.stringify(data));
  //   dispatch(googleLoginThunk());
  //   // navigate("/admin/dashboard");
  // };

  // const [loadingTest, setLoadingTest] = useState(false);

  // const handleClick = async () => {
  //   try {
  //     setLoadingTest(true);
  //     window.location.href =
  //       "https://phplaravel-1329305-4863390.cloudwaysapps.com/auth/google";
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   } finally {
  //     setLoadingTest(false);
  //   }
  // };
  return (
    <div className="m-auto xl:container px-4 lg:px-12 pt-20 sm:px-0 mx-auto">
      <div className="mx-auto h-full max-w-lg">
        <div className="m-auto  py-12">
          <div className="space-y-4">
            <Logo />
          </div>
          <div className="mt-4 rounded-3xl border bg-gray-50 dark:border-gray-700 dark:bg-gray-800  py-8 px-4 sm:p-10">
            <h3 className="text-xl font-semibold text-gray-700 dark:text-white">
              Login to your account
            </h3>

            <div className="max-w-xl pt-6">
              <HookForm onSubmit={onSubmit} schema={LoginSchema}>
                <Input
                  name="email"
                  label="Email Address"
                  placeholder="Enter your email address"
                />
                <Input
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                />

                <div className=" float-start text-sm mb-4">
                  <Link to="/forget-password">
                    <p className=" text-primary-700 font-medium">
                      Forgot Password?
                    </p>
                  </Link>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  rounded
                  //   disabled={loading}
                  className="w-full justify-center"
                >
                  {loading ? (
                    <div className="inline-flex items-center gap-3">
                      {/* <LoadingSpinner /> */}
                      <div role="status">
                        <svg
                          aria-hidden="true"
                          className="inline w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-primary-800"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                        <span className="sr-only">Loading...</span>
                      </div>
                      <span>Loading...</span>
                    </div>
                  ) : (
                    "Sign in"
                  )}
                </Button>
              </HookForm>

              <p className="text-center text-gray-600 mt-8">
                Don’t have an account?{" "}
                <Link to="/register" className=" text-primary-700 font-medium">
                  Register
                </Link>
              </p>
              <div className=" mt-4 flex items-center justify-center gap-2">
                <div className="bg-gray-300 h-px w-full"></div>
                <p className="text-center text-gray-600 ">Or</p>
                <div className="bg-gray-300 h-px w-full"></div>
              </div>
              <div className="mt-4 flex flex-wrap sm:grid gap-4 grid-cols-1">
                <button
                  // onClick={handleGoogleLogin}
                  disabled={loading}
                  className="w-full h-12 rounded-lg border border-gray-300/75 bg-white px-6 transition active:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-800 dark:hover:border-gray-700"
                >
                  <div className="w-max mx-auto flex items-center justify-center space-x-2">
                    <GoogleIcon />
                    <span className="block w-max text-sm font-semibold tracking-wide text-gray-700 dark:text-white">
                      {/* Google */}
                      {loading ? "Signing in..." : "Google"}
                    </span>
                  </div>
                </button>
                {/* <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    console.log("google response", credentialResponse);
                    const credentialResponseDecoded = jwtDecode(
                      credentialResponse.credential
                    );
                    console.log("google decode", credentialResponseDecoded);
                  }}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                /> */}

                {/* <button className="w-full h-12 rounded-lg border border-gray-300/75 bg-white px-6 transition active:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-800 dark:hover:border-gray-700">
                  <div className="w-max mx-auto flex items-center justify-center space-x-2">
                    <Facebook className="w-6 h-6 text-[#1877F2]" />
                    <span className="block w-max text-sm font-semibold tracking-wide text-gray-700 dark:text-white">
                      Facebook
                    </span>
                  </div>
                </button> */}
              </div>
            </div>
          </div>
          {/* <div className="border-t pt-12 text-gray-500 dark:border-gray-800">
            <div className="space-x-4 text-center">
              <span>© Mr diy store</span>
              <a
                href="#"
                className="text-sm hover:text-sky-900 dark:hover:text-gray-300"
              >
                Contact
              </a>
              <a
                href="#"
                className="text-sm hover:text-sky-900 dark:hover:text-gray-300"
              >
                Privacy &amp; Terms
              </a>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Login;

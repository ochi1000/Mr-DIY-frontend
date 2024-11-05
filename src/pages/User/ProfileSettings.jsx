import banner from "src/assets/images/profile-banner.png";
import profilavatar from "src/assets/images/user-profile-avatar.png";
import HookForm from "../../components/forms/Form";
import { Input } from "../../components/forms/Input";
import { Button } from "../../components/forms/Button";
import LoadingSpinner from "../../components/Loading/LoadingSpinner";
import { UpdateUserSchema } from "../../schema/authSchema";
import { useSelector } from "react-redux";
import { putData } from "../../utils/api";
import toast from "react-hot-toast";
const ProfileSettings = () => {
  const { currentUser, loading } = useSelector((state) => state.auth);
  const { currentauthUser } = useSelector((state) => state.userauth);
  // console.log("currentUser: ", currentUser, currentauthUser);

  const defaultFormValue = {
    first_name:
      currentUser?.first_name ||
      currentUser?.data?.user?.first_name ||
      currentauthUser?.first_name ||
      currentauthUser?.data?.user?.first_name,

    last_name:
      currentUser?.last_name ||
      currentUser?.data?.user?.last_name ||
      currentauthUser?.last_name ||
      currentauthUser?.data?.user?.last_name,
    phone:
      currentUser?.phone ||
      currentUser?.data?.user?.phone ||
      currentauthUser?.phone ||
      currentauthUser?.data?.user?.phone,
  };
  const onSubmit = async (data) => {
    console.log("user data:", data);

    try {
      const result = await putData(`user/update-user`, data);

      if (
        (result?.status >= 200 && result?.status <= 300) ||
        (result?.status_code >= 200 && result?.status_code <= 300)
      ) {
        toast.success("User profile update successfully ");
        // navigate("user/shipments/local-shipment/summary");
      }
    } catch (error) {
      console.error("User Update Error:", error);

      if (
        (error?.response?.data?.status >= 400 &&
          error?.response?.data?.status <= 499 &&
          error?.response?.data?.errors) ||
        (error?.response?.data?.status_code >= 400 &&
          error?.response?.data?.status_code <= 499 &&
          error?.response?.data?.errors)
      ) {
        const errorMessages = Object.values(error?.response?.data?.message)
          .flat()
          .join(", ");
        toast.error(errorMessages, { duration: 6000 });
      } else {
        toast.error(error?.response?.data?.message, { duration: 6000 });
      }
    }
  };
  return (
    <div>
      <main className="pt-2 px-4  ">
        <div className="relative">
          <img
            alt="banner"
            width={1920}
            height={300}
            className="h-[18.75rem] object-cover w-[100%] "
            src={banner}
          />
          <div className="container relative -translate-y-4">
            <div className="group absolute right-0 bottom-4  mr-2 flex items-center rounded-lg bg-white py-2 px-4 font-display text-sm hover:bg-accent">
              <input
                accept="image/*"
                className="absolute inset-0 cursor-pointer opacity-0"
                type="file"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width={24}
                height={24}
                className="mr-1 h-4 w-4 fill-jacarta-400 group-hover:fill-primary-800"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M15.728 9.686l-1.414-1.414L5 17.586V19h1.414l9.314-9.314zm1.414-1.414l1.414-1.414-1.414-1.414-1.414 1.414 1.414 1.414zM7.242 21H3v-4.243L16.435 3.322a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414L7.243 21z" />
              </svg>
              <span className="mt-0.5 block group-hover:text-primary-800">
                Edit cover photo
              </span>
            </div>
          </div>
        </div>
        <section className="relative py-16 dark:bg-jacarta-800">
          <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
            <img
              alt="gradient"
              loading="lazy"
              width={1920}
              height={789}
              decoding="async"
              data-nimg={1}
              className="h-full w-full"
              srcSet="/_next/image?url=%2Fimg%2Fgradient_light.jpg&w=1920&q=75 1x, /_next/image?url=%2Fimg%2Fgradient_light.jpg&w=3840&q=75 2x"
              src="/_next/image?url=%2Fimg%2Fgradient_light.jpg&w=3840&q=75"
              style={{ color: "transparent" }}
            />
          </picture>
          <div className="container">
            <div className="mx-auto max-w-[48.125rem] md:flex">
              <div className="mb-12 md:w-1/2 md:pr-8">
                <HookForm
                  defaultValues={defaultFormValue}
                  onSubmit={onSubmit}
                  schema={UpdateUserSchema}
                >
                  <div className="grid lg:grid-cols-1 w-full ">
                    <div className="">
                      <Input
                        name="first_name"
                        label="First Name"
                        placeholder="Enter first name"
                      />
                    </div>
                    <div className="">
                      <Input
                        name="last_name"
                        label="Last Name"
                        placeholder="Enter last name"
                      />
                    </div>
                  </div>
                  <Input
                    name="phone"
                    label="Phone Number"
                    placeholder="Enter your phone number"
                  />
                  <Input
                    name="status"
                    label="Bio"
                    placeholder="Write a brief description about yourself"
                  />

                  {/* <div className=" float-start text-sm mb-4">
                  <Link to="/forget-password">
                    <p className=" text-primary-700 font-medium">
                      Forgot Password?
                    </p>
                  </Link>
                </div> */}

                  <Button
                    type="submit"
                    size="md"
                    //   disabled={loading}
                    className="w-full justify-center"
                  >
                    {loading ? (
                      <div className="inline-flex items-center gap-3">
                        <LoadingSpinner />
                        <span>Loading...</span>
                      </div>
                    ) : (
                      "Update profile"
                    )}
                  </Button>
                </HookForm>
              </div>
              <div className="flex space-x-5 md:w-1/2 md:pl-8">
                <form className="shrink-0">
                  <figure className="relative inline-block w-300 h-300 ">
                    <img
                      alt="collection avatar"
                      loading="lazy"
                      width={300}
                      height={300}
                      decoding="async"
                      data-nimg={1}
                      className="rounded-xl border-[5px] border-white dark:border-jacarta-600 object-cover !w-[150px] !h-[150px] overflow-hidden "
                      src={profilavatar}
                    />
                    <div className="group absolute -right-3 -bottom-2 h-8 w-8 overflow-hidden rounded-full border border-jacarta-100 bg-white text-center hover:border-transparent hover:bg-primary-800">
                      <input
                        accept="image/*"
                        className="absolute top-0 left-0 w-full cursor-pointer opacity-0"
                        type="file"
                      />
                      <div className="flex h-full items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width={24}
                          height={24}
                          className="h-4 w-4 fill-jacarta-400 group-hover:fill-white"
                        >
                          <path fill="none" d="M0 0h24v24H0z" />
                          <path d="M15.728 9.686l-1.414-1.414L5 17.586V19h1.414l9.314-9.314zm1.414-1.414l1.414-1.414-1.414-1.414-1.414 1.414 1.414 1.414zM7.242 21H3v-4.243L16.435 3.322a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414L7.243 21z" />
                        </svg>
                      </div>
                    </div>
                  </figure>
                </form>
                <div className="mt-4">
                  <span className="mb-3 block font-medium text-lg text-gray-900 dark:text-white">
                    Profile Image
                  </span>
                  <p className="text-sm text-gray-600 leading-normal dark:text-gray-300">
                    We recommend an image of at least 300x300. Gifs work too.
                    Max 5mb.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <div className="lg:w-3/4 md:w-2/3 md:px-3 mx-auto mt-6 md:mt-0 mb-10">
        <div className="p-6 rounded-md shadow dark:shadow-gray-800 bg-white dark:bg-slate-900 mt-6">
          <h5 className="text-lg font-semibold mb-0 text-red-700">
            Delete Account :
          </h5>
          <p className="text-slate-600 mb-4">
            Do you want to delete the account? Please press below
            &quot;Delete&quot; button
          </p>
          <Button size="sm">Delete</Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;

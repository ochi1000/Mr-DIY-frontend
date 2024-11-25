/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

// import bag from "src/assets/images/promo2.webp";

// import logo from "src/assets/images/logo.svg";
import { ThumbsCarousel } from "../components/ui/thumb-carousel";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { viewProduct } from "../Redux/products/productsThunk";
import { newBaseURL } from "../utils/api";
import { formatNumber } from "../lib/constants";
import { addNewCart, fetchCarts, updateCart } from "../Redux/cart/cartThunk";
import toast from "react-hot-toast";
import classNames from "classnames";
import Accordion from "../components/ui/Accordion";

// import LoadingSpinner from "../components/Loading/LoadingSpinner";

const AdminProductDetails = ({ productId }) => {
  const dispatch = useDispatch();

  // const { id } = useParams();

  const { singleProduct, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(viewProduct(productId));
  }, [productId, dispatch]);

  const product = singleProduct?.data;
  console.log("Admin  single Product:", product);
  const productImages = Array.isArray(product?.imgs) ? product?.imgs : [];

  const imagesData = productImages?.map((img, index) => ({
    image: `${newBaseURL}storage/${img}`,
    id: index + 1,
  }));

  const [countQuantity, setCountQuantity] = useState(1);
  // console.log("imagesData:", imagesData);

  // const handleUpdateCart = async (product, qty) => {
  //   if (product) {
  //     const getUpdateCartData = {
  //       cart_item_id: product?.id,
  //       quantity: product?.quantity + qty,
  //     };

  //     try {
  //       const result = await dispatch(
  //         updateCart({ formData: getUpdateCartData })
  //       ).unwrap();
  //       // console.log("cart Delete result: ", result);

  //       if (result.status >= 200 && result.status <= 300) {
  //         toast.success(result?.message);
  //         dispatch(fetchCarts("user/cart/view-cart"));
  //         // navigate("/admin/product/inventory");
  //         // fetchProductsHandler("admin/product");
  //       }
  //     } catch (error) {
  //       if (error?.errors) {
  //         const errorMessages = Object.values(error?.errors).flat().join(", ");
  //         toast.error(errorMessages, { duration: 6000 });
  //       } else {
  //         toast.error(error?.message, { duration: 6000 });
  //       }
  //     }
  //   }
  // };

  const [loadingCart, setLoadingCart] = useState(false);

  const { allProducts, loadingProduct } = useSelector(
    (state) => state.products
  );
  // console.log(
  //   "loadingProduct",
  //   allProducts?.data,
  //   "loadingProduct:",
  //   loadingProduct
  // );

  const [getAttributes, setGetAttributes] = useState([]);

  // console.log("getAttributes:", getAttributes);

  const getAttributesValue = (attribute_id) => {
    const getValue = getAttributes?.find(
      (value) => value.attribute_id === attribute_id
    );
    return getValue?.value;
  };

  // console.log("getAttributesValue:", getAttributesValue);
  const selectedAttributes = getAttributes?.map((attribute) => {
    return {
      attribute_id: attribute?.attribute_id,
      value: attribute?.value,
    };
  });

  // console.log(
  //   "selectedAttributes:",
  //   selectedAttributes,
  //   "lent selectedAttributes:",
  //   selectedAttributes.length
  // );

  // console.log(
  //   "produc attributes:",
  //   product?.attributes,
  //   "lent attributes:",
  //   product?.attributes.length
  // );

  const addToCart = () => {
    const defaultAttributes =
      product?.attributes.length !== 0 && selectedAttributes?.length === 0
        ? [
            {
              attribute_id: product.attributes[0].id,
              value: product.attributes[0].values[0]?.value,
            },
          ]
        : selectedAttributes;

    // console.log("first attribute", defaultAttributes);

    const productToCart = {
      product_id: product?.id,
      quantity: countQuantity,
      selected_attributes: defaultAttributes,
    };

    // console.log(
    //   "product data:",
    //   Array.isArray(productToCart),
    //   "data:",
    //   productToCart
    // );
    // Call `handleSubmitCart` with the product object
    handleSubmitCart(productToCart);
  };

  const handleSubmitCart = async (productToCart) => {
    setLoadingCart(true);
    try {
      const result = await dispatch(
        addNewCart({ CartData: productToCart })
      ).unwrap();
      if (result.status >= 200 && result.status <= 300) {
        // console.log("res:", result);
        setGetAttributes([]);
        setCountQuantity(1);
        dispatch(fetchCarts("user/cart/view-cart"));
        toast.success(result.message);
      }
    } catch (error) {
      if (
        // (error?.response?.data?.status >= 400 &&
        //   error?.response?.data?.status <= 499 &&
        //   error?.response?.data?.errors) ||
        // (error?.response?.data?.status_code >= 400 &&
        //   error?.response?.data?.status_code <= 499 &&
        //   error?.response?.data?.errors) ||
        error?.errors
      ) {
        const errorMessages = Object.values(error?.errors).flat().join(", ");
        toast.error(errorMessages, { duration: 6000 });
      } else {
        toast.error(error?.message, { duration: 6000 });
      }
    } finally {
      setLoadingCart(false);
    }
  };
  return (
    <div className="pt-20 ">
      {loading ? (
        <div className="py-10 flex flex-col items-center justify-center">
          {/* <LoadingSpinner /> */}

          <div className="flex items-center justify-center w-56 h-56 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
            <div className="px-3 py-1 text-xs font-medium leading-none text-center text-primary-800 bg-primary-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">
              Loading...
            </div>
          </div>
        </div>
      ) : (
        <main className="container mx-auto px-4 mt-5 lg:mt-11">
          <div className="lg:flex">
            <div className="w-full lg:w-[55%] ">
              <div className="relative">
                <ThumbsCarousel
                  gallery={imagesData}
                  // video={video}
                  hideThumbs={
                    imagesData?.length <= 1
                    // previewImages.length && video?.length
                    //   ? false
                    //   : previewImages.length <= 1
                  }
                />

                {/* <div className="absolute top-3 left-3 px-2.5 py-1.5 text-xs bg-white dark:bg-slate-900 nc-shadow-lg rounded-full flex items-center justify-center text-slate-900 dark:text-slate-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                  className="w-3.5 h-3.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                  />
                </svg>
                <span className="ml-1 leading-none">New in</span>
              </div>
              <button className="w-9 h-9 flex items-center justify-center rounded-full bg-white dark:bg-slate-900 text-neutral-700 dark:text-slate-200 nc-shadow-lg absolute right-3 top-3 ">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.68998C2 5.59998 4.49 3.09998 7.56 3.09998C9.38 3.09998 10.99 3.97998 12 5.33998C13.01 3.97998 14.63 3.09998 16.44 3.09998C19.51 3.09998 22 5.59998 22 8.68998C22 15.69 15.52 19.82 12.62 20.81Z"
                    stroke="#ef4444"
                    fill="#ef4444"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button> */}
              </div>

              <div className="pt-10">
                <p className=" text-gray-800 text-base font-medium pb-2">
                  Product Tags
                </p>
                <div className="text-gray-900  font-medium capitalize">
                  {product?.tags.length === 0 ? (
                    "No tags"
                  ) : (
                    <div className=" flex items-center gap-2 flex-wrap max-w-md">
                      {product?.tags?.map((tagItem, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="group overflow-hidden flex justify-center items-center relative text-sm border  cursor-pointer  rounded-md py-1.5 before:inline-block before:absolute before:z-0 before:w-full before:h-full before:bg-primary-800 before:scale-x-0 group hover:before:scale-x-100 before:origin-right hover:before:origin-left before:transition-transform before:ease-out before:duration-300"
                        >
                          <span className="px-[18px] relative text-gray-700 text-xs font-medium z-20 transition-colors ease-in-out duration-300 group-hover:text-white">
                            {tagItem?.name}
                          </span>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className=" pt-4">
                {product?.model && (
                  <label htmlFor="">
                    <span className="text-sm font-medium capitalize">
                      Model:
                      <span className="ml-1 font-semibold">
                        {product?.model}
                      </span>
                    </span>
                  </label>
                )}
              </div>
            </div>
            <div className="w-full lg:w-[45%] pt-10 lg:pt-0 lg:pl-7 xl:pl-9 2xl:pl-10">
              <div className="space-y-7 2xl:space-y-8">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">
                    {product?.name}
                  </h2>
                  <div className="flex items-center mt-5 space-x-4 sm:space-x-5">
                    <div className="">
                      <div className="flex items-center border-2 border-green-500 rounded-lg py-1 px-2 md:py-1.5 md:px-3 text-lg font-semibold">
                        <span className="text-green-500 !leading-none">
                          ₦{formatNumber(Number(product?.listing_price))}
                        </span>
                      </div>
                    </div>
                    <div className="h-7 border-l border-slate-300 dark:border-slate-700" />
                    <div className="flex items-center">
                      <a
                        href="#reviews"
                        className="flex items-center text-sm font-medium"
                      >
                        {product?.warranty && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden="true"
                            data-slot="icon"
                            className="w-5 h-5 pb-[1px] text-yellow-400"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                        <div className="ml-1.5 flex flex-wrap">
                          {product?.warranty && (
                            <span className=" capitalize">
                              {product?.warranty} Warranty
                            </span>
                          )}
                          <span className="block mx-2">·</span>
                          <span className="text-slate-600 dark:text-slate-400 underline">
                            {product?.sku} SKU
                          </span>
                        </div>
                      </a>
                      <span className="hidden sm:block mx-2.5">·</span>
                      <div className="hidden sm:flex items-center text-sm">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          aria-hidden="true"
                          data-slot="icon"
                          className="w-3.5 h-3.5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                          />
                        </svg>
                        <span className="ml-1 leading-none">
                          {product?.stock_item === 1
                            ? "In Stock"
                            : "Out of Stock"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="">
                  <div>
                    {product?.category?.name && (
                      <label htmlFor="">
                        <span className="text-sm font-medium capitalize">
                          Category:
                          <span className="ml-1 font-semibold">
                            {product?.category?.name}
                          </span>
                        </span>
                      </label>
                    )}
                    {/* <div className="flex mt-3">
                      <div className="relative flex-1 max-w-[75px] h-10 sm:h-11 rounded-full border-2 cursor-pointer border-primary-6000 dark:border-primary-500">
                        <div
                          className="absolute inset-0.5 rounded-full overflow-hidden z-0 object-cover bg-cover bg-black"
                          style={{
                            backgroundImage:
                              'url("/_next/static/media/v6.8375417b.jpg")',
                          }}
                        />
                      </div>
                    </div> */}
                  </div>
                </div>
                <div className=" space-y-4">
                  {product?.attributes?.map((attribute, attributeIndex) => {
                    return (
                      <div key={attributeIndex}>
                        <div className="flex justify-between font-medium text-sm">
                          <label htmlFor="">
                            <span className="">
                              {attribute?.name}:
                              <span className="ml-1 font-semibold">
                                {getAttributesValue(attribute?.id)}
                              </span>
                            </span>
                          </label>
                          <span className="text-gray-600">
                            Select{getAttributesValue(attribute?.id) && "ed"}{" "}
                            attribute {attribute?.name.toLowerCase()}{" "}
                            {getAttributesValue(attribute?.id)}
                          </span>
                        </div>
                        <div className="grid grid-cols-5 sm:grid-cols-7 gap-2 mt-3">
                          {attribute?.values?.map((val, valueIndex) => {
                            return (
                              <div
                                key={valueIndex}
                                onClick={() =>
                                  setGetAttributes((prevAttributes) => {
                                    // Remove the old item with the same id if it exists
                                    const updatedAttributes =
                                      prevAttributes.filter(
                                        (attr) =>
                                          attr.attribute_id !== val.attribute_id
                                      );
                                    // Add the new item
                                    return [...updatedAttributes, val];
                                  })
                                }
                                className={classNames(
                                  "relative h-10 sm:h-11 rounded-2xl border flex items-center justify-center text-sm sm:text-base uppercase font-semibold select-none overflow-hidden z-0 cursor-pointer border-gray-200 text-gray-600 hover:bg-primary-800 hover:text-white",
                                  {
                                    "bg-primary-800 text-white":
                                      getAttributes.some(
                                        (at) => at.id === val.id
                                      ), // Selected state styles
                                    "bg-slate-100/50": !getAttributes.some(
                                      (at) => at.id === val.id
                                    ), // Default state styles
                                  }
                                )}
                              >
                                {val?.value}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex space-x-3.5">
                  <div className="flex items-center justify-center bg-slate-100/70 dark:bg-slate-800/70 px-2 py-3 sm:p-3.5 rounded-full">
                    <div className="nc-NcInputNumber flex items-center justify-between space-x-5 w-full">
                      <div className="nc-NcInputNumber__content flex items-center justify-between w-[104px] sm:w-28">
                        <button
                          onClick={() =>
                            setCountQuantity((count) =>
                              count >= 2 ? count - 1 : count
                            )
                          }
                          className="w-8 h-8 rounded-full flex items-center justify-center border border-neutral-400 dark:border-neutral-500 bg-white dark:bg-neutral-900 focus:outline-none hover:border-neutral-700 dark:hover:border-neutral-400 disabled:hover:border-neutral-400 dark:disabled:hover:border-neutral-500 disabled:opacity-50 disabled:cursor-default"
                          type="button"
                          disabled=""
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden="true"
                            data-slot="icon"
                            className="w-4 h-4"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.25 12a.75.75 0 0 1 .75-.75h14a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                        <span className="select-none block flex-1 text-center leading-none">
                          {countQuantity}
                        </span>
                        <button
                          onClick={() =>
                            setCountQuantity((count) =>
                              count >= 1 ? count + 1 : count
                            )
                          }
                          // onClick={() => handleUpdateCart(product, 1)}
                          className="w-8 h-8 rounded-full flex items-center justify-center border border-neutral-400 dark:border-neutral-500 bg-white dark:bg-neutral-900 focus:outline-none hover:border-neutral-700 dark:hover:border-neutral-400 disabled:hover:border-neutral-400 dark:disabled:hover:border-neutral-500 disabled:opacity-50 disabled:cursor-default"
                          type="button"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden="true"
                            data-slot="icon"
                            className="w-4 h-4"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => addToCart()}
                    className="nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium py-3 px-4 sm:py-3.5 sm:px-6  ttnc-ButtonPrimary disabled:bg-opacity-90 bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 text-slate-50 dark:text-slate-800 shadow-xl flex-1 flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0"
                  >
                    {loadingCart ? (
                      <svg
                        aria-hidden="true"
                        className="inline w-5 h-5 text-gray-200 animate-spin  fill-slate-800"
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
                    ) : (
                      <svg
                        className="hidden sm:inline-block w-5 h-5 mb-0.5"
                        viewBox="0 0 9 9"
                        fill="none"
                      >
                        <path
                          d="M2.99997 4.125C3.20708 4.125 3.37497 4.29289 3.37497 4.5C3.37497 5.12132 3.87865 5.625 4.49997 5.625C5.12129 5.625 5.62497 5.12132 5.62497 4.5C5.62497 4.29289 5.79286 4.125 5.99997 4.125C6.20708 4.125 6.37497 4.29289 6.37497 4.5C6.37497 5.53553 5.5355 6.375 4.49997 6.375C3.46444 6.375 2.62497 5.53553 2.62497 4.5C2.62497 4.29289 2.79286 4.125 2.99997 4.125Z"
                          fill="currentColor"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M6.37497 2.625H7.17663C7.76685 2.625 8.25672 3.08113 8.29877 3.66985L8.50924 6.61641C8.58677 7.70179 7.72715 8.625 6.63901 8.625H2.36094C1.2728 8.625 0.413174 7.70179 0.490701 6.61641L0.70117 3.66985C0.743222 3.08113 1.23309 2.625 1.82331 2.625H2.62497L2.62497 2.25C2.62497 1.21447 3.46444 0.375 4.49997 0.375C5.5355 0.375 6.37497 1.21447 6.37497 2.25V2.625ZM3.37497 2.625H5.62497V2.25C5.62497 1.62868 5.12129 1.125 4.49997 1.125C3.87865 1.125 3.37497 1.62868 3.37497 2.25L3.37497 2.625ZM1.82331 3.375C1.62657 3.375 1.46328 3.52704 1.44926 3.72328L1.2388 6.66985C1.19228 7.32107 1.70805 7.875 2.36094 7.875H6.63901C7.29189 7.875 7.80766 7.32107 7.76115 6.66985L7.55068 3.72328C7.53666 3.52704 7.37337 3.375 7.17663 3.375H1.82331Z"
                          fill="currentColor"
                        />
                      </svg>
                    )}
                    <span className="ml-3">Add to cart</span>
                  </button>
                </div>
                <hr className=" 2xl:!my-10 border-slate-200 dark:border-slate-700" />
                <div className="w-full rounded-2xl space-y-2.5">
                  <Accordion
                    defaultState={true}
                    title="Short Description"
                    description={product?.short_description}
                  />
                  <Accordion
                    title="Long Description"
                    description={product?.long_description}
                  />

                  {product?.whats_in_the_box && (
                    <Accordion
                      title="Whats in the box"
                      description={product?.whats_in_the_box}
                    />
                  )}
                  {/* <button
                    className="flex items-center justify-between w-full px-4 py-2 font-medium text-left bg-slate-100/80 hover:bg-slate-200/60 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg focus:outline-none focus-visible:ring focus-visible:ring-slate-500 focus-visible:ring-opacity-75 "
                    id="headlessui-disclosure-button-:ro:"
                    type="button"
                    aria-expanded="true"
                    data-headlessui-state="open"
                    aria-controls="headlessui-disclosure-panel-:rp:"
                  >
                    <span>Fabric + Care</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                      data-slot="icon"
                      className="w-4 h-4 text-slate-600 dark:text-slate-400"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 12h14"
                      />
                    </svg>
                  </button>
                  <div
                    className="p-4 pt-3 last:pb-0 text-slate-600 text-sm dark:text-slate-300 leading-6"
                    id="headlessui-disclosure-panel-:rp:"
                    data-headlessui-state="open"
                  >
                    <ul className="list-disc list-inside leading-7">
                      <li>Made from a sheer Belgian power micromesh.</li>
                      <li>74% Polyamide (Nylon) 26% Elastane (Spandex)</li>
                      <li>Adjustable hook &amp; eye closure and straps</li>
                      <li>Hand wash in cold water, dry flat</li>
                    </ul>
                  </div> */}
                </div>
                <div className="hidden xl:block">
                  {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 relative">
                    <div className="flex flex-col p-5 rounded-2xl bg-red-50 dark:bg-opacity-90">
                      <div>
                        <svg
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 14H13C14.1 14 15 13.1 15 12V2H6C4.5 2 3.19001 2.82999 2.51001 4.04999"
                            stroke="#292D32"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M2 17C2 18.66 3.34 20 5 20H6C6 18.9 6.9 18 8 18C9.1 18 10 18.9 10 20H14C14 18.9 14.9 18 16 18C17.1 18 18 18.9 18 20H19C20.66 20 22 18.66 22 17V14H19C18.45 14 18 13.55 18 13V10C18 9.45 18.45 9 19 9H20.29L18.58 6.01001C18.22 5.39001 17.56 5 16.84 5H15V12C15 13.1 14.1 14 13 14H12"
                            stroke="#292D32"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M8 22C9.10457 22 10 21.1046 10 20C10 18.8954 9.10457 18 8 18C6.89543 18 6 18.8954 6 20C6 21.1046 6.89543 22 8 22Z"
                            stroke="#292D32"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M16 22C17.1046 22 18 21.1046 18 20C18 18.8954 17.1046 18 16 18C14.8954 18 14 18.8954 14 20C14 21.1046 14.8954 22 16 22Z"
                            stroke="#292D32"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M22 12V14H19C18.45 14 18 13.55 18 13V10C18 9.45 18.45 9 19 9H20.29L22 12Z"
                            stroke="#292D32"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M2 8H8"
                            stroke="#292D32"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M2 11H6"
                            stroke="#292D32"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M2 14H4"
                            stroke="#292D32"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div className="mt-2.5">
                        <p className="font-semibold text-slate-900">
                          Free shipping
                        </p>
                        <p className="text-slate-500 mt-0.5 text-sm">
                          On orders over $50.00
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col p-5 rounded-2xl bg-sky-50 dark:bg-opacity-90">
                      <div>
                        <svg
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M22 15C22 18.87 18.87 22 15 22L16.05 20.25"
                            stroke="#292D32"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M2 9C2 5.13 5.13 2 9 2L7.95 3.75"
                            stroke="#292D32"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M13.7 4.44995L17.6799 6.74994L21.6199 4.45996"
                            stroke="#292D32"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M17.6799 10.82V6.73999"
                            stroke="#292D32"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M16.74 2.21L14.34 3.53996C13.8 3.83996 13.35 4.59995 13.35 5.21995V7.75999C13.35 8.37999 13.79 9.13998 14.34 9.43998L16.74 10.77C17.25 11.06 18.09 11.06 18.61 10.77L21.01 9.43998C21.55 9.13998 22 8.37999 22 7.75999V5.21995C22 4.59995 21.56 3.83996 21.01 3.53996L18.61 2.21C18.1 1.93 17.26 1.93 16.74 2.21Z"
                            stroke="#292D32"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M2.34998 15.45L6.31998 17.7499L10.27 15.46"
                            stroke="#292D32"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M6.31995 21.82V17.74"
                            stroke="#292D32"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M5.39 13.21L2.99001 14.54C2.45001 14.84 2 15.5999 2 16.2199V18.76C2 19.38 2.44001 20.14 2.99001 20.44L5.39 21.77C5.9 22.06 6.73999 22.06 7.25999 21.77L9.66 20.44C10.2 20.14 10.65 19.38 10.65 18.76V16.2199C10.65 15.5999 10.21 14.84 9.66 14.54L7.25999 13.21C6.73999 12.93 5.9 12.93 5.39 13.21Z"
                            stroke="#292D32"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div className="mt-2.5">
                        <p className="font-semibold text-slate-900">
                          Very easy to return
                        </p>
                        <p className="text-slate-500 mt-0.5 text-sm">
                          Just phone number.
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col p-5 rounded-2xl bg-green-50 dark:bg-opacity-90">
                      <div>
                        <svg
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                            stroke="#292D32"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M7.99998 3H8.99998C7.04998 8.84 7.04998 15.16 8.99998 21H7.99998"
                            stroke="#292D32"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M15 3C16.95 8.84 16.95 15.16 15 21"
                            stroke="#292D32"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M3 16V15C8.84 16.95 15.16 16.95 21 15V16"
                            stroke="#292D32"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M3 9.0001C8.84 7.0501 15.16 7.0501 21 9.0001"
                            stroke="#292D32"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div className="mt-2.5">
                        <p className="font-semibold text-slate-900">
                          Nationwide Delivery
                        </p>
                        <p className="text-slate-500 mt-0.5 text-sm">
                          Fast delivery nationwide.
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col p-5 rounded-2xl bg-amber-50 dark:bg-opacity-90">
                      <div>
                        <svg
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9.5 13.75C9.5 14.72 10.25 15.5 11.17 15.5H13.05C13.85 15.5 14.5 14.82 14.5 13.97C14.5 13.06 14.1 12.73 13.51 12.52L10.5 11.47C9.91 11.26 9.51001 10.94 9.51001 10.02C9.51001 9.17999 10.16 8.48999 10.96 8.48999H12.84C13.76 8.48999 14.51 9.26999 14.51 10.24"
                            stroke="#292D32"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12 7.5V16.5"
                            stroke="#292D32"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2"
                            stroke="#292D32"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M17 3V7H21"
                            stroke="#292D32"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M22 2L17 7"
                            stroke="#292D32"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div className="mt-2.5">
                        <p className="font-semibold text-slate-900">
                          Refunds policy
                        </p>
                        <p className="text-slate-500 mt-0.5 text-sm">
                          60 days return for any reason
                        </p>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 sm:mt-16 space-y-10 sm:space-y-16">
            {/* <div className="block xl:hidden">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 relative">
                <div className="flex flex-col p-5 rounded-2xl bg-red-50 dark:bg-opacity-90">
                  <div>
                    <svg
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 14H13C14.1 14 15 13.1 15 12V2H6C4.5 2 3.19001 2.82999 2.51001 4.04999"
                        stroke="#292D32"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M2 17C2 18.66 3.34 20 5 20H6C6 18.9 6.9 18 8 18C9.1 18 10 18.9 10 20H14C14 18.9 14.9 18 16 18C17.1 18 18 18.9 18 20H19C20.66 20 22 18.66 22 17V14H19C18.45 14 18 13.55 18 13V10C18 9.45 18.45 9 19 9H20.29L18.58 6.01001C18.22 5.39001 17.56 5 16.84 5H15V12C15 13.1 14.1 14 13 14H12"
                        stroke="#292D32"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8 22C9.10457 22 10 21.1046 10 20C10 18.8954 9.10457 18 8 18C6.89543 18 6 18.8954 6 20C6 21.1046 6.89543 22 8 22Z"
                        stroke="#292D32"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M16 22C17.1046 22 18 21.1046 18 20C18 18.8954 17.1046 18 16 18C14.8954 18 14 18.8954 14 20C14 21.1046 14.8954 22 16 22Z"
                        stroke="#292D32"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M22 12V14H19C18.45 14 18 13.55 18 13V10C18 9.45 18.45 9 19 9H20.29L22 12Z"
                        stroke="#292D32"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M2 8H8"
                        stroke="#292D32"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M2 11H6"
                        stroke="#292D32"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M2 14H4"
                        stroke="#292D32"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="mt-2.5">
                    <p className="font-semibold text-slate-900">
                      Free shipping
                    </p>
                    <p className="text-slate-500 mt-0.5 text-sm">
                      On orders over $50.00
                    </p>
                  </div>
                </div>
                <div className="flex flex-col p-5 rounded-2xl bg-sky-50 dark:bg-opacity-90">
                  <div>
                    <svg
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M22 15C22 18.87 18.87 22 15 22L16.05 20.25"
                        stroke="#292D32"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M2 9C2 5.13 5.13 2 9 2L7.95 3.75"
                        stroke="#292D32"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M13.7 4.44995L17.6799 6.74994L21.6199 4.45996"
                        stroke="#292D32"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M17.6799 10.82V6.73999"
                        stroke="#292D32"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M16.74 2.21L14.34 3.53996C13.8 3.83996 13.35 4.59995 13.35 5.21995V7.75999C13.35 8.37999 13.79 9.13998 14.34 9.43998L16.74 10.77C17.25 11.06 18.09 11.06 18.61 10.77L21.01 9.43998C21.55 9.13998 22 8.37999 22 7.75999V5.21995C22 4.59995 21.56 3.83996 21.01 3.53996L18.61 2.21C18.1 1.93 17.26 1.93 16.74 2.21Z"
                        stroke="#292D32"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M2.34998 15.45L6.31998 17.7499L10.27 15.46"
                        stroke="#292D32"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M6.31995 21.82V17.74"
                        stroke="#292D32"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M5.39 13.21L2.99001 14.54C2.45001 14.84 2 15.5999 2 16.2199V18.76C2 19.38 2.44001 20.14 2.99001 20.44L5.39 21.77C5.9 22.06 6.73999 22.06 7.25999 21.77L9.66 20.44C10.2 20.14 10.65 19.38 10.65 18.76V16.2199C10.65 15.5999 10.21 14.84 9.66 14.54L7.25999 13.21C6.73999 12.93 5.9 12.93 5.39 13.21Z"
                        stroke="#292D32"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="mt-2.5">
                    <p className="font-semibold text-slate-900">
                      Very easy to return
                    </p>
                    <p className="text-slate-500 mt-0.5 text-sm">
                      Just phone number.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col p-5 rounded-2xl bg-green-50 dark:bg-opacity-90">
                  <div>
                    <svg
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                        stroke="#292D32"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7.99998 3H8.99998C7.04998 8.84 7.04998 15.16 8.99998 21H7.99998"
                        stroke="#292D32"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M15 3C16.95 8.84 16.95 15.16 15 21"
                        stroke="#292D32"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M3 16V15C8.84 16.95 15.16 16.95 21 15V16"
                        stroke="#292D32"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M3 9.0001C8.84 7.0501 15.16 7.0501 21 9.0001"
                        stroke="#292D32"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="mt-2.5">
                    <p className="font-semibold text-slate-900">
                      Nationwide Delivery
                    </p>
                    <p className="text-slate-500 mt-0.5 text-sm">
                      Fast delivery nationwide.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col p-5 rounded-2xl bg-amber-50 dark:bg-opacity-90">
                  <div>
                    <svg
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.5 13.75C9.5 14.72 10.25 15.5 11.17 15.5H13.05C13.85 15.5 14.5 14.82 14.5 13.97C14.5 13.06 14.1 12.73 13.51 12.52L10.5 11.47C9.91 11.26 9.51001 10.94 9.51001 10.02C9.51001 9.17999 10.16 8.48999 10.96 8.48999H12.84C13.76 8.48999 14.51 9.26999 14.51 10.24"
                        stroke="#292D32"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 7.5V16.5"
                        stroke="#292D32"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2"
                        stroke="#292D32"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M17 3V7H21"
                        stroke="#292D32"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M22 2L17 7"
                        stroke="#292D32"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="mt-2.5">
                    <p className="font-semibold text-slate-900">
                      Refunds policy
                    </p>
                    <p className="text-slate-500 mt-0.5 text-sm">
                      60 days return for any reason
                    </p>
                  </div>
                </div>
              </div>
            </div> */}

            <hr className="border-slate-200 dark:border-slate-700" />

            {/* <div className="pb-20 xl:pb-28 lg:pt-14">
              <div className="nc-SectionPromo2 lg:pt-10">
                <div className="relative flex flex-col lg:flex-row lg:justify-end bg-yellow-50 dark:bg-slate-800 rounded-2xl sm:rounded-[40px] p-4 pb-0 sm:p-5 sm:pb-0 lg:p-24">
                  <div className="absolute inset-0">
                
                  </div>
                  <div className="lg:w-[45%] max-w-lg relative">
                    <a
                      className="ttnc-logo inline-block text-slate-600 w-28"
                      href="/"
                    >
                      <img
                        alt="Logo"
                        width={162}
                        height={46}
                        className="block h-8 sm:h-10 w-auto dark:hidden"
                        src={logo}
                        style={{ color: "transparent" }}
                      />
                      <img
                        alt="Logo-Light"
                        width={162}
                        height={46}
                        decoding="async"
                        data-nimg={1}
                        className="hidden h-8 sm:h-10 w-auto dark:block"
                        src={logo}
                        style={{ color: "transparent" }}
                      />
                    </a>
                    <h2 className="font-semibold text-3xl sm:text-4xl xl:text-5xl 2xl:text-6xl mt-6 sm:mt-10 !leading-[1.13] tracking-tight">
                      Special offer <br />
                      in kids products
                    </h2>
                    <span className="block mt-6 text-slate-500 dark:text-slate-400">
                      Fashion is a form of self-expression and autonomy at a
                      particular period and place.
                    </span>
                    <div className="flex space-x-2 sm:space-x-5 mt-6 sm:mt-12">
                      <a
                        className="nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium py-3 px-4 sm:py-3.5 sm:px-6  ttnc-ButtonPrimary disabled:bg-opacity-90 bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 text-slate-50  shadow-xl dark:text-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0 "
                        href="/search"
                      >
                        Discover more
                      </a>
                    </div>
                  </div>
                  <div className="relative block lg:absolute lg:left-0 lg:bottom-0 mt-10 lg:mt-0 max-w-xl lg:max-w-[calc(55%-40px)]">
                    <img
                      alt=""
                      loading="lazy"
                      width={851}
                      height={852}
                      decoding="async"
                      data-nimg={1}
                      className=""
                      sizes="(max-width: 768px) 100vw, 50vw"
                      src={bag}
                    />
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </main>
      )}
    </div>
  );
};

export default AdminProductDetails;

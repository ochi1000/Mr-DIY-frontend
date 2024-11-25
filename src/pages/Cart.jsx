/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cloth from "src/assets/images/product/cloth.png";
import Headphone from "src/assets/images/product/headphone.png";
import Laptop from "src/assets/images/product/laptop.png";
import { deleteCart, fetchCarts, updateCart } from "../Redux/cart/cartThunk";
import { newBaseURL, removeData } from "../utils/api";
import { formatNumber } from "../lib/constants";
import toast from "react-hot-toast";
import { CartsIcon, DeleteIcon } from "../assets/SvgIcons";
import { LoaderWithCheck } from "../components/Loading/LoaderWithCheck";
import { Link } from "react-router-dom";
import { productPlaceholder } from "../utils/placeholders";
const Cart = () => {
  const dispatch = useDispatch();
  const { carts, cart, loading, error } = useSelector((state) => state.carts);

  const [loadingItemId, setLoadingItemId] = useState(null);

  // console.log("Id:", loadingItemId);

  const fetchCartHandler = (url) => {
    dispatch(fetchCarts(url));
  };
  useEffect(() => {
    fetchCartHandler("user/cart/view-cart");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const data = carts?.data?.cart_items;

  // console.log(" carts loaded: ", data);

  const handleDeleteCart = async (product) => {
    if (product) {
      setLoadingItemId(product?.product.id);
      const getCartData = {
        cart_item_id: product?.id,
      };
      // Handle delete product logic here

      try {
        const result = await dispatch(
          deleteCart({ CartId: getCartData })
        ).unwrap();
        // console.log("cart Delete result: ", result);

        if (result.status >= 200 && result.status <= 300) {
          // toast.success(result?.message);
          dispatch(fetchCarts("user/cart/view-cart"));
          // navigate("/admin/product/inventory");
          // fetchProductsHandler("admin/product");
        }
      } catch (error) {
        if (error?.errors) {
          const errorMessages = Object.values(error?.errors).flat().join(", ");
          toast.error(errorMessages, { duration: 6000 });
        } else {
          toast.error(error?.message, { duration: 6000 });
        }
      } finally {
        // setLoadingRemoveCart(false);
        setLoadingItemId(null);
      }
    }
  };

  const handleUpdateCart = async (product, qty) => {
    if (product) {
      const getUpdateCartData = {
        cart_item_id: product?.id,
        quantity: product?.quantity + qty,
      };
      // Handle Update product logic here
      // console.log(" update cart: ", getUpdateCartData);

      try {
        const result = await dispatch(
          updateCart({ formData: getUpdateCartData })
        ).unwrap();
        // console.log("cart Delete result: ", result);

        if (result.status >= 200 && result.status <= 300) {
          toast.success(result?.message);
          dispatch(fetchCarts("user/cart/view-cart"));
          // navigate("/admin/product/inventory");
          // fetchProductsHandler("admin/product");
        }
      } catch (error) {
        if (error?.errors) {
          const errorMessages = Object.values(error?.errors).flat().join(", ");
          toast.error(errorMessages, { duration: 6000 });
        } else {
          toast.error(error?.message, { duration: 6000 });
        }
      }
    }
  };

  const handleEmptyCart = async () => {
    try {
      const result = await removeData(`user/cart/clear-cart`);
      // console.log("cart Delete result: ", result);

      if (result.status >= 200 && result.status <= 300) {
        toast.success(result?.message);
        dispatch(fetchCarts("user/cart/view-cart"));
        // navigate("/admin/product/inventory");
        // fetchProductsHandler("admin/product");
      }
    } catch (error) {
      // if (error?.errors) {
      //   const errorMessages = Object.values(error?.errors).flat().join(", ");
      //   toast.error(errorMessages, { duration: 6000 });
      // } else {
      //   toast.error(error?.message, { duration: 6000 });
      // }
      if (
        (error?.response?.data?.status >= 400 &&
          error?.response?.data?.status <= 499 &&
          error?.response?.data?.errors) ||
        (error?.response?.data?.status_code >= 400 &&
          error?.response?.data?.status_code <= 499 &&
          error?.response?.data?.errors)
      ) {
        const errorMessages = Object.values(error?.response?.data?.errors)
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
      <>
        <div className="px-4 lg:px-20 xl:px-40">
          <main className="container pt-24 py-16 lg:pb-28 lg:pt-40  ">
            <div className="mb-12 sm:mb-16">
              <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold ">
                Shopping Cart
              </h2>
              <div className="block mt-3 sm:mt-5 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-400">
                <a className="" href="/">
                  Homepage
                </a>
                <span className="text-xs mx-1 sm:mx-1.5">/</span>
                {/* <a className="" href="/collection">
                  Clothing Categories
                </a> */}
                {/* <span className="text-xs mx-1 sm:mx-1.5">/</span> */}
                <span className="underline">Shopping Cart</span>
              </div>
            </div>
            <hr className="border-slate-200 dark:border-slate-700 my-10 xl:my-12" />
            <div className="flex flex-col lg:flex-row">
              <div className="w-full lg:w-[60%] xl:w-[55%]  ">
                {data.length === 0 ? (
                  <div className=""></div>
                ) : (
                  <div className="">
                    {data?.map((item, itemIndex) => {
                      const imageUrl = item?.product?.imgs[0]
                        ? `${newBaseURL}storage/${item?.product?.imgs[0]}`
                        : productPlaceholder;
                      return (
                        <div
                          key={itemIndex}
                          className="relative flex py-8  border-b last:border-none first:pt-0 last:pb-0"
                        >
                          <div className="border relative h-36 w-24 sm:w-32 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
                            <img
                              alt={`${item?.product?.name?.toLowerCase()} image`}
                              className="h-full w-full object-cover object-center"
                              sizes="300px"
                              src={imageUrl}
                            />
                            {/* <img
                              alt={`${item?.product?.name?.toLowerCase()} image`}
                              className="h-full w-full object-contain object-center"
                              sizes="300px"
                              src={`${newBaseURL}storage/${item?.product?.imgs[0]} `}
                            /> */}
                            <a
                              className="absolute inset-0"
                              href="/product-detail"
                            />
                          </div>
                          <div className="ml-3 sm:ml-6 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between ">
                                <div className="flex-[1.5] ">
                                  <h3 className="text-base font-semibold capitalize max-w-64 truncate">
                                    <Link
                                      to={`/product-details/${item?.product?.id}`}
                                    >
                                      {item?.product?.name}
                                    </Link>
                                  </h3>
                                  <p className="my-1 text-sm text-slate-600 dark:text-slate-400 capitalize max-w-48 truncate">
                                    Category:{" "}
                                    <span className="text-slate-500 dark:text-slate-400">
                                      {" "}
                                      {item?.product?.category?.name}
                                    </span>
                                    {/* <span className="mx-2 border-l border-slate-200 dark:border-slate-700 h-4" />
                          <span>XL</span> */}
                                  </p>
                                  <div className="block text-center relative pt-2">
                                    <div className="nc-NcInputNumber flex items-center justify-between space-x-5 relative z-10">
                                      <div className="nc-NcInputNumber__content flex items-center justify-between w-[104px] sm:w-28">
                                        <button
                                          onClick={() =>
                                            handleUpdateCart(item, -1)
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
                                          {item?.quantity}
                                        </span>
                                        <button
                                          onClick={() =>
                                            handleUpdateCart(item, 1)
                                          }
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

                                  {/* <div className="mt-3 flex justify-between w-full sm:hidden relative">
                                    <select
                                      name="qty"
                                      id="qty"
                                      className="form-select text-sm rounded-md py-1 border-slate-200 dark:border-slate-700 relative z-10 dark:bg-slate-800 "
                                    >
                                      <option value={1}>9</option>
                                      <option value={2}>2</option>
                                      <option value={3}>3</option>
                                      <option value={4}>4</option>
                                      <option value={5}>5</option>
                                      <option value={6}>6</option>
                                      <option value={7}>7</option>
                                    </select>
                                    <div className="">
                                      <div className="flex items-center border-2 border-green-500 rounded-lg py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium h-full">
                                        <span className="text-green-500 !leading-none">
                                          $74
                                        </span>
                                      </div>
                                    </div>
                                  </div> */}
                                </div>

                                <div className="hidden flex-1 sm:flex justify-end">
                                  <div className="mt-0.5">
                                    <div className="flex items-center border-2 border-green-500 rounded-lg py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium">
                                      <span className="text-green-500 !leading-none">
                                        ₦
                                        {formatNumber(
                                          Number(item?.product?.listing_price)
                                        )}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex pt-4 items-center justify-between text-sm">
                              <div className="rounded-full flex items-center justify-center px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
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
                                    d="m4.5 12.75 6 6 9-13.5"
                                  />
                                </svg>
                                <span className="ml-1 leading-none">
                                  In Stock
                                </span>
                              </div>
                              <div className=" flex items-center gap-1">
                                {/* <LoaderWithCheck
                                  loading={loadingRemoveCart}
                                  itemIndex={item?.product?.id}
                                /> */}
                                <LoaderWithCheck
                                  loading={loadingItemId === item?.product?.id}
                                  itemIndex={item?.product?.id}
                                  currentItemId={loadingItemId}
                                />

                                <button
                                  onClick={() => handleDeleteCart(item)}
                                  type="button"
                                  className="font-medium text-primary-800 dark:text-primary-800 "
                                >
                                  Remove
                                </button>
                              </div>
                              {/* <a
                                href="##"
                                className="relative z-10 flex items-center mt-3 font-medium text-gray-600 hover:text-primary-500 text-sm "
                              >
                                <span>Remove</span>
                              </a> */}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                <div>
                  {data?.length === 0 ? (
                    <div className="">
                      {/* <p>No Product in Cart</p> */}
                      <div className="flex items-center my-5 border-b pb-10">
                        <div className=" mr-5 flex items-center justify-center">
                          {/* <i className="flaticon flaticon-ship text-[55px]" /> */}
                          <CartsIcon className="w-14 h-14" />
                        </div>
                        <div className="shipping-content">
                          <h6 className="mb-2 pr-6">
                            Your cart is currently empty. Start adding items!
                          </h6>
                          <div className="h-1.5 bg-[#e9ecef] overflow-hidden flex">
                            <div
                              className="bg-gray-900 progress-animated border-0"
                              style={{ width: "75%" }}
                              role="progressbar"
                            >
                              <span className="sr-only">75% Complete</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 flex pt-6  justify-end">
                      <div
                        onClick={handleEmptyCart}
                        className="cursor-pointer relative h-auto inline-flex items-center justify-center gap-1.5 rounded-full transition-colors text-sm sm:text-base font-medium py-3 px-4 sm:py-3.5 sm:px-6  ttnc-ButtonSecondary bg-white text-primary-700 dark:bg-slate-900 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 flex-1 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0 "
                      >
                        <DeleteIcon className="text-red-600 w-6 h-6 " />
                        Empty Cart
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-700 my-10 lg:my-0 lg:mx-10 xl:mx-16 2xl:mx-20 flex-shrink-0" />
              <div className="flex-1">
                <div className="sticky top-28">
                  <h3 className="text-lg font-semibold ">Cart Summary</h3>
                  <div className="mt-7 text-sm text-slate-500 dark:text-slate-400 divide-y divide-slate-200/70 dark:divide-slate-700/80">
                    <div className="flex justify-between pb-4">
                      <span>Subtotal</span>
                      <span className="font-semibold text-slate-900 dark:text-slate-200">
                        {data.length !== 0
                          ? `₦${formatNumber(carts?.data?.total)}`
                          : "₦0.00"}
                      </span>
                    </div>
                    <div className="flex justify-between py-4">
                      <span>Shpping estimate</span>
                      <span className="font-semibold text-slate-900 dark:text-slate-200">
                        ₦0.00
                      </span>
                    </div>
                    <div className="flex justify-between py-4">
                      <span>Tax estimate</span>
                      <span className="font-semibold text-slate-900 dark:text-slate-200">
                        ₦0.00
                      </span>
                    </div>
                    <div className="flex justify-between font-semibold text-slate-900 dark:text-slate-200 text-base pt-4">
                      <span>Order total</span>
                      <span>
                        {" "}
                        {data.length !== 0
                          ? `₦${formatNumber(carts?.data?.total)}`
                          : "₦0.00"}
                      </span>
                    </div>
                  </div>
                  <Link to="/checkout">
                    <div className=" relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium py-3 px-4 sm:py-3.5 sm:px-6  ttnc-ButtonPrimary disabled:bg-opacity-90 bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 text-slate-50 dark:text-slate-800 shadow-xl mt-8 w-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0 ">
                      Checkout
                    </div>
                  </Link>
                  <div className="mt-5 text-sm text-slate-500 dark:text-slate-400 flex items-center justify-center">
                    <p className="block relative pl-5">
                      <svg
                        className="w-4 h-4 absolute -left-1 top-0.5"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 8V13"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M11.9945 16H12.0035"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Learn more{" "}
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="##"
                        className="text-slate-900 dark:text-slate-200 underline font-medium"
                      >
                        Taxes
                      </a>
                      <span> and </span>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="##"
                        className="text-slate-900 dark:text-slate-200 underline font-medium"
                      >
                        Shipping
                      </a>{" "}
                      infomation
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </>
    </div>
  );
};

export default Cart;

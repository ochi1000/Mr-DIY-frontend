/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// import { deleteCart } from "../../Redux/shopSlice";
import { newBaseURL, removeData } from "../../utils/api";
import { formatNumber } from "../../lib/constants";
import { CartsIcon, DeleteIcon } from "../../assets/SvgIcons";
import toast from "react-hot-toast";
import { deleteCart, fetchCarts, updateCart } from "../../Redux/cart/cartThunk";
import { LoaderWithCheck } from "../Loading/LoaderWithCheck";
import { useState } from "react";
import { productPlaceholder } from "../../utils/placeholders";
// import Cloth from "src/assets/images/product/cloth.png";
// import Headphone from "src/assets/images/product/headphone.png";
// import Laptop from "src/assets/images/product/laptop.png";
const AdminCartMenu = ({ cartData, setOpenCartMenu, loading }) => {
  // const { cart } = useSelector((state) => state.shop) || {};
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loadingRemoveCart, setLoadingRemoveCart] = useState(false);
  const [loadingItemId, setLoadingItemId] = useState(null);

  // console.log("cart data rev:", cartData?.cart_items);
  // const data = cartData ? cartData?.cart_items : [];

  const data = Array.isArray(cartData?.cart_items) ? cartData?.cart_items : [];

  // delete cart item
  const deleteCartHandler = (id) => {
    dispatch(deleteCart(id));
  };
  // console.log("cart iem: ", Array.isArray(data), "loading", loading);

  const close_Navigate = () => {
    setOpenCartMenu(false);
    navigate("/cart");
  };
  const checkout_Navigate = () => {
    setOpenCartMenu(false);
    navigate("/checkout");
  };

  const handleDeleteCart = async (product) => {
    // setLoadingRemoveCart(true);
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
        // if (
        //   (error?.response?.data?.status >= 400 &&
        //     error?.response?.data?.status <= 499 &&
        //     error?.response?.data?.errors) ||
        //   (error?.response?.data?.status_code >= 400 &&
        //     error?.response?.data?.status_code <= 499 &&
        //     error?.response?.data?.errors)
        // ) {
        //   const errorMessages = Object.values(error?.response?.data?.errors)
        //     .flat()
        //     .join(", ");
        //   toast.error(errorMessages, { duration: 6000 });
        // } else {
        //   toast.error(error?.response?.data?.message, { duration: 6000 });
        // }
      } finally {
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
    <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5  w-full">
      <div className="relative bg-white dark:bg-neutral-800">
        <div className="max-h-[60vh] p-5 overflow-y-auto hiddenScrollbar">
          <h3 className="text-xl font-semibold">Shopping cart</h3>
          <div className="divide-y divide-slate-100 dark:divide-slate-700">
            {data?.map((cartitem, cartItemIndex) => (
              <div key={cartItemIndex}>
                <div className="flex py-5 last:pb-0">
                  <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
                    <img
                      alt={`${cartitem?.product?.name?.toLowerCase()} image`}
                      className="h-full w-full object-cover object-center"
                      // src={`${newBaseURL}storage/${cartitem?.product?.imgs[0]}`}
                      src={
                        cartitem?.product?.imgs[0]
                          ? `${newBaseURL}storage/${cartitem?.product?.imgs[0]}`
                          : productPlaceholder
                      }
                    />
                    <a className="absolute inset-0" href="/product-detail" />
                  </div>
                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between ">
                        <div>
                          <h3 className="text-sm font-medium  max-w-48 truncate capitalize ">
                            <Link
                              to={`/product-details/${cartitem?.product?.id}`}
                            >
                              {cartitem?.product?.name}
                            </Link>
                          </h3>
                          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 capitalize max-w-48 truncate">
                            <span>{cartitem?.product?.category?.name}</span>
                            {/* <span className="mx-2 border-l border-slate-200 dark:border-slate-700 h-4" />
                          <span>XL</span> */}
                          </p>
                        </div>
                        <div className="mt-0.5">
                          <div className="flex items-center border-2 border-green-500 rounded-lg py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium">
                            <span className="text-green-500 !leading-none font-semibold">
                              {/* $ */}₦
                              {formatNumber(
                                Number(cartitem?.product?.listing_price)
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm pb-3">
                      {/* <p className="text-gray-500 dark:text-slate-400">
                        Qty: {cartitem?.quantity}{" "}
                      </p> */}

                      <div className=" flex items-center justify-between space-x-5 relative z-10 pt-2">
                        <div className=" flex items-center justify-between w-[104px] sm:w-28">
                          <button
                            onClick={() => handleUpdateCart(cartitem, -1)}
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
                            {cartitem?.quantity}
                          </span>
                          <button
                            onClick={() => handleUpdateCart(cartitem, 1)}
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
                      <div className="flex">
                        {/* <button
                          onClick={() => handleDeleteCart(cartitem)}
                          type="button"
                          className="font-medium text-primary-800 dark:text-primary-800 "
                        >
                          Remove
                        </button> */}
                        <div className=" flex items-center gap-1">
                          <LoaderWithCheck
                            loading={loadingItemId === cartitem?.product?.id}
                            itemIndex={cartitem?.product?.id}
                            currentItemId={loadingItemId}
                          />
                          <button
                            onClick={() => handleDeleteCart(cartitem)}
                            type="button"
                            className="font-medium text-primary-800 dark:text-primary-800 "
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {
            data?.length === 0 && (
              <div className="">
                {/* <p>No Product in Cart</p> */}
                <div className="flex items-center my-5">
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
            )
            //  : (
            //   <div className="p-4 flex pt-6  justify-end">
            //     <div
            //       onClick={handleEmptyCart}
            //       className="cursor-pointer relative h-auto inline-flex items-center justify-center gap-1.5 rounded-full transition-colors text-sm sm:text-base font-medium py-3 px-4 sm:py-3.5 sm:px-6  ttnc-ButtonSecondary bg-white text-primary-700 dark:bg-slate-900 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 flex-1 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0 "
            //     >
            //       <DeleteIcon className="text-red-600 w-6 h-6 " />
            //       Empty Cart
            //     </div>
            //   </div>
            // )
          }
        </div>
        {data?.length !== 0 && (
          <div className="bg-neutral-50 dark:bg-slate-900 p-5">
            <div className=" flex   justify-end">
              <div
                onClick={handleEmptyCart}
                className="cursor-pointer relative h-auto inline-flex items-center justify-center gap-1.5 rounded-full transition-colors text-sm sm:text-base font-medium py-3 px-4 sm:py-3.5 sm:px-6  ttnc-ButtonSecondary bg-white text-primary-700 dark:bg-slate-900 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 flex-1 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0 "
              >
                <DeleteIcon className="text-red-600 w-6 h-6 " />
                Empty Cart
              </div>
            </div>
            {/* <p className="flex justify-between font-semibold text-slate-900 dark:text-slate-100">
              <span>
                <span>Subtotal</span>
                <span className="block text-sm text-slate-500 dark:text-slate-400 font-normal">
                  Shipping and taxes calculated at checkout.
                </span>
              </span>
              <span className="">
                {data?.length !== 0
                  ? `₦${formatNumber(cartData?.total)}`
                  : "₦0.00"}
              </span>
            </p> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCartMenu;

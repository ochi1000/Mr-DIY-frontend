/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../../components/forms/Button";
import {
  ArrowDownIcon,
  LeftArrowIcons,
  SearchIcon,
  XIconSmall,
  // PlusIcon,
} from "../../../assets/SvgIcons";
import { Input } from "../../../components/forms/Input";
import { TextArea } from "../../../components/forms/TextArea";
import HookForm from "../../../components/forms/Form";
// import CustomSelect from "../../../components/forms/Select/CustomSelect";
import SmallSpinner from "../../../components/Loading/SmallSpinner";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewProduct } from "../../../Redux/products/productsThunk";
import DefaultToggle from "../../../components/forms/DefaultToggle";
import { fetchCategorys } from "../../../Redux/category/categoriesThunk";
import { EmptySchema } from "../../../schema/ProductSchema";
import { Toggle } from "../../../components/forms/Toggle/Toggle";
// import MultipleImageUpload from "../../../components/forms/Upload/MultipleImageUpload";
import ImageUpload from "../../../components/forms/Upload/ImageUpload";
import toast from "react-hot-toast";
// import ReactSelectOption from "../../../components/forms/Select/react-select-options";
// import { fetchTags } from "../../../Redux/tags/tagsThunk";

import { getData, postData } from "../../../utils/api";
import AsyncReactSelect from "../../../components/forms/Select/async-react-select";
import ProductAttributes from "../Products/ProductAttributes";
import AdminProductDetails from "../../AdminProductDetails";
import AdminCartMenu from "../../../components/ui/AdminCartMenu";
import { fetchCarts } from "../../../Redux/cart/cartThunk";
import classNames from "classnames";
import { formatNumber } from "../../../lib/constants";

const AdminCreateOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [imagesFile, setImagesFile] = useState([]);

  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedChannels, setSelectedChannels] = useState(null);
  // const [searchData, setSearchData] = useState([]);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [errorSearch, setErrorSearch] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchProduct, setSearchProduct] = useState([]);

  const [searchCount, setSearchCount] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loadingCreateOrder, setLoadingCreateOrder] = useState(false);

  // console.log(
  //   // ":errorSearch:",
  //   // errorSearch,
  //   // ":loading:",
  //   // loadingSearch,
  //   // ":searchData:",
  //   // searchData,
  //   "searchProduct:",
  //   searchProduct
  // );

  // console.log("selectedProduct:", selectedProduct);

  const fetchSearchedProduct = async (url, search, document_type) => {
    setLoadingSearch(true);
    try {
      let fetchUrl = url;
      if (search) {
        fetchUrl += `?search=${search}`;
      } else if (document_type) {
        fetchUrl += `?document_name=${document_type}`;
      }
      const response = await getData(fetchUrl);

      // console.log("res:", response);
      setSearchProduct(response);

      setSearchCount(response?.meta?.total);
    } catch (error) {
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
        setErrorSearch(errorMessages);
      } else {
        toast.error(error?.response?.data?.message, { duration: 6000 });
        setErrorSearch(error?.response?.data?.message);
      }
      // setError(error.response.data.message);
    } finally {
      setLoadingSearch(false);
    }
  };
  // useEffect(() => {
  //   fetchSearchedProduct("product/get-all-products", "", "");
  // }, []);

  useEffect(() => {
    const fetchDriversSearch = async () => {
      if (searchQuery.length >= 2) {
        fetchSearchedProduct("product/get-all-products", searchQuery);
      }
    };
    fetchDriversSearch();
  }, [searchQuery]);

  const fetchOrderChannels = async () => {
    try {
      const response = await getData("admin/order/get-all-order-channels");
      // console.log("order channel:", response);

      const manipulatedData = response?.data?.map((channel) => ({
        title: channel,
        name: channel.charAt(0).toUpperCase() + channel.slice(1), // Optional: Capitalize first letter,
      }));

      return manipulatedData;
    } catch (error) {
      const errorMessage = error;
      console.log(errorMessage);
    }
  };

  const fetchCategorysHandler = () => {
    dispatch(fetchCategorys());
  };
  useEffect(() => {
    fetchCategorysHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  // console.log("attributes:", attributes);
  const { loading } = useSelector((state) => state.products);

  const {
    carts,
    cart,
    loading: loadingcart,
    error,
  } = useSelector((state) => state.carts);

  console.log(" carts loaded: ", carts);

  const new_carts = carts?.data?.cart_items?.map((item) => {
    return {
      cart_item_id: item.id,
      price: item.product?.listing_price,
      name: item.product?.name,
    };
  });

  // console.log("new_carts: ", new_carts);

  const fetchCartHandler = (url) => {
    dispatch(fetchCarts(url));
  };
  useEffect(() => {
    fetchCartHandler("cart/view-cart");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  // console.log("tags selected:", selectedTags);
  const defaultFormValue = {
    name: "",
    email: "",
    phone: "",
    delivery_state: "",
    delivery_city: "",
    delivery_address: "",
  };
  // const samplecart = [
  //   {
  //     cart_item_id: "9d683b50-6928-4d61-a083-e8c613c2f7fb",
  //     price: "5000",
  //   },
  //   {
  //     cart_item_id: "9d42f75a-d5f4-4166-85bd-710a0a925e1d",
  //     price: "8000",
  //   },
  // ];

  const [newPrices, setNewPrices] = useState({});

  const updatedCartData = useMemo(() => {
    return new_carts.map((item) => {
      return {
        ...item,
        price: newPrices[item.cart_item_id] || item.price,
      };
    });
  }, [new_carts, newPrices]);

  const handlePriceChange = (e, item) => {
    const { value } = e.target;
    setNewPrices((prevPrices) => ({
      ...prevPrices,
      [item.cart_item_id]: value,
    }));
  };

  // console.log("updated cart:", updatedCartData);

  const sumCartPrices = (cart) => {
    return cart.reduce((total, item) => total + parseFloat(item.price), 0);
  };

  const totalPrice = sumCartPrices(updatedCartData);
  // console.log("Total Price:", totalPrice);

  const carts_data = updatedCartData?.map((cart) => {
    return {
      cart_item_id: cart.cart_item_id,
      price: cart.price,
    };
  });
  console.log("carts_data:", carts_data);
  // const updateCartData = () => {
  //   console.log("updated", updatedCartData);
  //   // Dispatch an action to update the cart data in Redux state
  //   //  dispatch(updateCartDataAction(updatedCartData));
  // };

  const onSubmit = async (data) => {
    // console.log("Form data", data);

    const filteredFormData = {
      name: data.name,
      channel: selectedChannels?.title,
      email: data.email,
      phone: data.phone,
      delivery_state: data.delivery_state,
      delivery_city: data.delivery_city,
      delivery_address: data.delivery_address,

      cart_data: carts_data,
    };

    console.log("Product data", filteredFormData);
    setLoadingCreateOrder(true);
    try {
      const result = await postData(
        "admin/order/create-order",
        filteredFormData
      );
      console.log("Product result: ", result);

      if (result.status >= 200 && result.status <= 300) {
        toast.success("Order created successfully");
        fetchCartHandler("user/cart/view-cart");
        navigate("/admin/orders-management/orders-list");
      }
    } catch (error) {
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

      console.error("Create Error:", error);
      // navigate("/admin/product/inventory/");
      if (error?.errors) {
        const errorMessages = Object.values(error?.errors).flat().join(", ");
        toast.error(errorMessages, { duration: 6000 });
      }
    }
    setLoadingCreateOrder(false);
    // alert(JSON.stringify(filteredFormData));
    // dispatch(addNewProduct(filteredFormData));
    // navigate("/admin/product/inventory/");
    // setOpenModal(false);
  };

  return (
    <div className="p-4">
      <div className=" flex items-center justify-between  pt-4 pb-8">
        <div className="flex items-center gap-3">
          <Link to="/admin/product/inventory">
            <Button size="sm" outline color="gray">
              <LeftArrowIcons className="w-6 h-6" />
            </Button>
          </Link>
          <div className="">
            <h1 className=" text-2xl font-semibold text-gray-900 pb-1.5">
              Admin Create Order
            </h1>
          </div>
        </div>
      </div>

      <div className="relative lg:p-4 w-full  max-h-full space-y-6">
        <div className=" space-y-6">
          <div className="flex flex-col lg:flex-row items-start w-full gap-6">
            <div className="relative bg-white rounded-2xl shadow  w-full lg:w-[60%]">
              <div className="flex items-center justify-between p-4 md:px-5 border-b rounded-t ">
                <div>
                  <h1 className="text-lg font-semibold text-gray-900 ">
                    Create Order
                  </h1>
                  <p className="text-gray-600 text-sm font-light">
                    Create an order has an administrator
                  </p>
                </div>
              </div>
              {/* contents below */}

              <HookForm
                defaultValues={defaultFormValue}
                onSubmit={onSubmit}
                schema={EmptySchema}
              >
                <div className=" h-full ">
                  {/* <ScrollArea className="h-full"> */}
                  <div className="p-5">
                    <Input
                      name="name"
                      label="Customer Name"
                      placeholder="Enter customer name"
                    />

                    <div className="pb-6">
                      <AsyncReactSelect
                        selectedValue={selectedChannels}
                        setSelectedValue={setSelectedChannels}
                        fetchData={fetchOrderChannels}
                        placeholder="Select Order Channel"
                        label="Order Channels"
                        // isMulti
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 ">
                      <div>
                        <Input
                          name="email"
                          label="Email Address"
                          placeholder="Enter email address"
                          type="email"
                        />
                      </div>
                      <div>
                        <Input
                          name="phone"
                          label="Phone Number"
                          placeholder="Enter phone number"
                          type="number"
                        />
                      </div>
                      <div>
                        <Input
                          name="delivery_state"
                          label="Delivery State"
                          placeholder="Enter a state for delivery"
                        />
                      </div>
                      <div>
                        <Input
                          name="delivery_city"
                          label="Delivery City"
                          placeholder="Enter a city for delivery"
                        />
                      </div>
                    </div>
                    <TextArea
                      name="delivery_address"
                      label=" Delivery Address"
                      placholder="Enter delivery address"
                    />

                    <div className=" relative">
                      <label
                        htmlFor="default-search"
                        className="mb-2 text-sm font-medium text-gray-900 sr-only "
                      >
                        Search
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                          <SearchIcon className="text-gray-500" />
                        </div>

                        <input
                          type="text"
                          id="default-search"
                          className="block w-full border px-4 py-3 ps-10 text-sm text-gray-500 font-Inter rounded-md bg-gray-50 outline-none  "
                          placeholder="Search Products..."
                          value={searchQuery}
                          onChange={(e) => {
                            const search = e.target.value;
                            setSearchQuery(search);
                          }}
                        />
                        {loadingSearch ? (
                          <div className="absolute inset-y-0 end-5 flex items-center ps-6">
                            <SmallSpinner />
                          </div>
                        ) : (
                          <div>
                            {searchQuery.length >= 2 && (
                              <div
                                onClick={() => {
                                  setSearchQuery("");
                                  setSearchProduct([]);
                                  setSearchCount(null);
                                  // fetchSearchedProduct("", "", "");
                                }}
                                className="absolute inset-y-0 end-2 flex items-center ps-3 cursor-pointer"
                              >
                                <XIconSmall />
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      <div>
                        {searchProduct?.length !== 0 && (
                          <div
                            className={classNames(
                              "  bg-white border-gray-300  border mt-1 rounded-md ",
                              {
                                hidden:
                                  selectedProduct !== null &&
                                  searchProduct?.data?.length === 1,
                              }
                            )}
                          >
                            {searchCount === 0 ? (
                              <p className=" border-b last:border-none py-2 text-sm font-medium  text-gray-600 text-center">
                                {"No Product Found "}
                              </p>
                            ) : (
                              <>
                                {searchProduct?.data?.map(
                                  (searchProduct, searchProductIndex) => {
                                    return (
                                      <p
                                        onClick={() => {
                                          setSelectedProduct(searchProduct);
                                          setSearchQuery(searchProduct?.name);
                                          setSearchProduct([]);
                                        }}
                                        key={searchProductIndex}
                                        className=" border-b first:rounded-t-md last:rounded-b-md first:pt-3 last:pb-3 last:border-none px-4 py-2 text-sm  text-gray-600 hover:bg-gray-100"
                                      >
                                        {searchProduct?.name}
                                      </p>
                                    );
                                  }
                                )}
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* </ScrollArea> */}
                  <Button
                    type="submit"
                    disabled={loadingCreateOrder}
                    className="w-full justify-center"
                    size="lg"
                  >
                    {loadingCreateOrder ? (
                      <div className="inline-flex items-center gap-3">
                        <SmallSpinner />
                        <span>Creating Order...</span>
                      </div>
                    ) : (
                      "Create Order"
                    )}
                  </Button>
                </div>
                {/* <div className="p-4 border-t">
                  <div className="flex items-center gap-3 justify-end">
                    <Button
                      size="xs"
                      //   onClick={() => setOpenModal(false)}
                      outline
                      color="error"
                    >
                      Cancel
                    </Button>{" "}
                    <Button type="submit" size="xs">
                      Continue
                    </Button>
                  </div>
                </div> */}{" "}
              </HookForm>
            </div>
            <div className="relative bg-white rounded-2xl shadow space-y-6 p-5 pt-6 lg:w-[40%]">
              <AdminCartMenu cartData={carts?.data} loading={loadingcart} />
              {updatedCartData?.length !== 0 && (
                <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5  w-full">
                  <div className="relative bg-white dark:bg-neutral-800">
                    <div className="max-h-[60vh] p-5 overflow-y-auto hiddenScrollbar">
                      <h3 className="text-xl font-semibold">
                        Update cart price
                      </h3>
                      <div className="divide-y divide-slate-100 dark:divide-slate-700">
                        <div className=" pt-4">
                          {updatedCartData.map((item, index) => (
                            <div key={index}>
                              <div className="pb-4">
                                <label
                                  htmlFor="title"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  {item?.name}
                                </label>
                                <input
                                  type="number"
                                  defaultValue={item.price}
                                  onChange={(e) => handlePriceChange(e, item)}
                                  // name={item.cart_item_id}
                                  // defaultValue={item.price}
                                  // onChange={(e) => handlePriceChange(e, index)}
                                  className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-3 py-4 outline-none sm:text-sm"
                                />
                              </div>
                            </div>
                          ))}
                          {/* <button onClick={updateCartData}>
                          Update Cart Data
                        </button> */}
                        </div>
                      </div>
                    </div>

                    <div className="bg-neutral-50 dark:bg-slate-900 p-5">
                      <p className="flex justify-between text-base font-semibold text-slate-900 dark:text-slate-100">
                        <span>
                          <span>Attention!</span>
                          <span className="block text-sm text-slate-500 dark:text-slate-400 font-normal">
                            Prices, Shipping fee and taxes calculated at
                            checkout.
                          </span>
                        </span>
                        {/* <span className="">{`₦${formatNumber(totalPrice)}`}</span> */}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div>
          {selectedProduct !== null && (
            <AdminProductDetails productId={selectedProduct?.id} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminCreateOrder;

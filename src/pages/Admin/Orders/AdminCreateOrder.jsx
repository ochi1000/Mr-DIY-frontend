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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewProduct } from "../../../Redux/products/productsThunk";
import DefaultToggle from "../../../components/forms/DefaultToggle";
import { fetchCategorys } from "../../../Redux/category/categoriesThunk";
import { productSchema } from "../../../schema/productSchema";
import { Toggle } from "../../../components/forms/Toggle/Toggle";
// import MultipleImageUpload from "../../../components/forms/Upload/MultipleImageUpload";
import ImageUpload from "../../../components/forms/Upload/ImageUpload";
import toast from "react-hot-toast";
// import ReactSelectOption from "../../../components/forms/Select/react-select-options";
// import { fetchTags } from "../../../Redux/tags/tagsThunk";

import { getData } from "../../../utils/api";
import AsyncReactSelect from "../../../components/forms/Select/async-react-select";
import ProductAttributes from "../Products/ProductAttributes";

const AdminCreateOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [filesImgs, setFilesImgs] = useState("");
  // const [filesUpload, setFilesUpload] = useState("");
  const [attributes, setAttributes] = useState([]);
  const [imagesFile, setImagesFile] = useState([]);
  // const [selectedBrand, setSelectedBrand] = useState(null);

  // const [selectedCategory, setSelectedCategory] = useState(null);

  // const [selectedWarranty, setSelectedWarranty] = useState(null);

  // const { categories } = useSelector((state) => state.category);

  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedChannels, setSelectedChannels] = useState(null);
  // const [searchData, setSearchData] = useState([]);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [errorSearch, setErrorSearch] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchProduct, setSearchProduct] = useState([]);
  console.log(
    // ":errorSearch:",
    // errorSearch,
    // ":loading:",
    // loadingSearch,
    // ":searchData:",
    // searchData,
    "searchProduct:",
    searchProduct
  );

  const TAGS_URL = "admin/tag";

  const fetchProductTags = async () => {
    try {
      const response = await getData(TAGS_URL);
      return response?.data;
    } catch (error) {
      const errorMessage = error;
      console.log(errorMessage);
      // return rejectWithValue(errorMessage?.response?.data);
    }
  };
  // console.log("selectedChannels:", selectedChannels);

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
      if (searchQuery.length >= 3) {
        fetchSearchedProduct("product/get-all-products", searchQuery);
      }
    };
    fetchDriversSearch();
  }, [searchQuery]);

  console.log("seach product:", searchProduct);

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

  // const { tags } = useSelector((state) => state.tags);

  // console.log("tags: ", tags);
  // console.log("image selected:", imagesFile);
  //   console.log("categories", selectedCategory?.id);
  // const [images, setImages] = useState([]);

  // const handleImageChange = (event) => {
  //   setImages([...event.target.files]);
  // };
  // const fetchTagsHandler = () => {
  //   dispatch(fetchTags());
  // };
  // useEffect(() => {
  //   fetchTagsHandler();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [dispatch]);

  const fetchCategorysHandler = () => {
    dispatch(fetchCategorys());
  };
  useEffect(() => {
    fetchCategorysHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  console.log("attributes:", attributes);
  const { loading } = useSelector((state) => state.products);
  // const brandData = [
  //   { id: 1, name: "Nike", brand: "nike", category: "Sports" },
  //   { id: 2, name: "Samsung", brand: "samsung", category: "Electronics" },
  //   { id: 3, name: "Lenovo", brand: "lenovo", category: "Electronics" },
  //   { id: 4, name: "Apple", brand: "apple", category: "Electronics" },
  //   { id: 5, name: "Coca-Cola", brand: "coca-cola", category: "Beverages" },
  //   { id: 6, name: "Toyota", brand: "toyota", category: "Automotive" },
  //   { id: 7, name: "McDonald's", brand: "mcdonalds", category: "Food" },
  //   { id: 8, name: "Honda", brand: "honda", category: "Automotive" },
  //   { id: 9, name: "Adidas", brand: "adidas", category: "Sports" },
  //   { id: 10, name: "Microsoft", brand: "microsoft", category: "Software" },
  //   { id: 11, name: "Google", brand: "google", category: "Software" },
  //   { id: 12, name: "Amazon", brand: "amazon", category: "E-commerce" },
  //   { id: 13, name: "Ford", brand: "ford", category: "Automotive" },
  //   { id: 14, name: "Pepsi", brand: "pepsi", category: "Beverages" },
  //   { id: 15, name: "Intel", brand: "intel", category: "Electronics" },
  //   { id: 16, name: "HP", brand: "hp", category: "Electronics" },
  //   { id: 17, name: "Dell", brand: "dell", category: "Electronics" },
  //   { id: 18, name: "Canon", brand: "canon", category: "Electronics" },
  //   { id: 19, name: "Sony", brand: "sony", category: "Electronics" },
  //   { id: 20, name: "Volkswagen", brand: "volkswagen", category: "Automotive" },
  //   { id: 21, name: "Levi's", brand: "levis", category: "Clothing" },
  //   { id: 22, name: "Gucci", brand: "gucci", category: "Luxury Fashion" },
  //   { id: 23, name: "Chanel", brand: "chanel", category: "Luxury Fashion" },
  //   { id: 24, name: "H&M", brand: "hm", category: "Clothing" },
  //   { id: 25, name: "Zara", brand: "zara", category: "Clothing" },
  //   {
  //     id: 26,
  //     name: "Calvin Klein",
  //     brand: "calvin-klein",
  //     category: "Clothing",
  //   },
  //   { id: 27, name: "Lacoste", brand: "lacoste", category: "Clothing" },
  //   {
  //     id: 28,
  //     name: "Ralph Lauren",
  //     brand: "ralph-lauren",
  //     category: "Clothing",
  //   },
  //   { id: 29, name: "Armani", brand: "armani", category: "Luxury Fashion" },
  //   { id: 30, name: "Prada", brand: "prada", category: "Luxury Fashion" },
  // ];

  const productWarrantyData = [];

  for (let i = 1; i <= 12; i++) {
    productWarrantyData.push({
      name: `${i} ${i === 1 ? "Month" : "Months"}`,
      warranty: `${i} ${i === 1 ? "month" : "months"}`,
    });
  }

  for (let i = 1; i <= 10; i++) {
    productWarrantyData.push({
      name: `${i} ${i === 1 ? "Year" : "Years"}`,
      warranty: `${i} ${i === 1 ? "year" : "years"}`,
    });
  }

  const selectedTags = selectedValue?.map((value) => value.id);

  // console.log("tags selected:", selectedTags);
  const defaultFormValue = {
    name: "",
    email: "",
    phone: "",
    delivery_state: "",
    delivery_city: "",

    delivery_address: "",
  };

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

      long_description: data.long_description,
      whats_in_the_box: data?.whats_in_the_box,
      stock_item: data?.stock_item ? 1 : 0,
      in_stock: data?.in_stock ? 1 : 0,
      on_discount: data?.on_discount ? 1 : 0,
      status: data?.status ? 1 : 0,
      imgs: imagesFile,
      tags: selectedTags,
      attributes: attributes,
    };

    console.log("Product data", filteredFormData);
    try {
      const result = await dispatch(addNewProduct(filteredFormData)).unwrap();
      // console.log("Product result: ", result);

      if (result.status >= 200 && result.status <= 300) {
        toast.success("Product created successfully");
        navigate("/admin/product/inventory/");
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
      navigate("/admin/product/inventory/");
      if (error?.errors) {
        const errorMessages = Object.values(error?.errors).flat().join(", ");
        toast.error(errorMessages, { duration: 6000 });
      }
    }
    // alert(JSON.stringify(filteredFormData));
    // dispatch(addNewProduct(filteredFormData));
    // navigate("/admin/product/inventory/");
    // setOpenModal(false);
  };

  // OLD SELECT DATA

  // const fruits = [
  //   { value: "chocolate", label: "Chocolate" },
  //   { value: "strawberry", label: "Strawberry" },
  //   { value: "vanilla", label: "Vanilla" },
  //   { value: "orange", label: "Orange" },
  //   { value: "apple", label: "Apple" },
  // ];
  // const [selectedOptions, setSelectedOptions] = useState([]);

  // console.log("tag selected:", selectedOptions);
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
        <HookForm
          defaultValues={defaultFormValue}
          onSubmit={onSubmit}
          schema={productSchema}
        >
          <div className=" space-y-6">
            <div className="flex flex-col lg:flex-row items-start w-full gap-6">
              <div className="relative bg-white rounded-2xl shadow  w-full lg:w-[70%]">
                <div className="flex items-center justify-between p-4 md:px-5 border-b rounded-t ">
                  <div>
                    <h1 className="text-lg font-semibold text-gray-900 ">
                      Basic Details
                    </h1>
                    <p className="text-gray-600 text-sm font-light">
                      Manage the product’s basic information
                    </p>
                  </div>
                </div>
                {/* contents below */}
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
                          <SearchIcon className="text-gray-400" />
                        </div>

                        <input
                          type="text"
                          id="default-search"
                          className="block w-full border px-4 py-3 ps-10 text-sm text-gray-900 font-Inter rounded-md bg-gray-50 outline-none  "
                          placeholder="Search Products..."
                          value={searchQuery}
                          onChange={(e) => {
                            const search = e.target.value;
                            setSearchQuery(search);
                          }}
                        />
                        {searchQuery.length >= 2 && (
                          <div
                            onClick={() => {
                              setSearchQuery("");
                              // fetchSearchedProduct("", "", "");
                            }}
                            className="absolute inset-y-0 end-2 flex items-center ps-3 cursor-pointer"
                          >
                            <XIconSmall />
                          </div>
                        )}
                      </div>
                      {searchProduct?.length !== 0 && (
                        <div className=" px-4 py-2 bg-white border-gray-300  border mt-1 rounded-md ">
                          {searchProduct?.data?.map(
                            (searchProduct, searchProductIndex) => {
                              return (
                                <p
                                  key={searchProductIndex}
                                  className=" border-b last:border-none py-2 text-sm  text-gray-600"
                                >
                                  {" "}
                                  {searchProduct?.name}
                                </p>
                              );
                            }
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  {/* </ScrollArea> */}
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
                </div> */}
              </div>
              <div className="relative bg-white rounded-2xl shadow space-y-6 p-5 pt-6 lg:w-[30%]">
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full justify-center"
                  size="lg"
                >
                  {loading ? (
                    <div className="inline-flex items-center gap-3">
                      <SmallSpinner />
                      <span>Creating Product...</span>
                    </div>
                  ) : (
                    "Continue"
                  )}
                </Button>
                <div className="border rounded-xl mt-2  p-4 w-full flex items-center justify-between ">
                  <p className=" font-semibold text-gray-700">In Stock</p>
                  <Toggle name="in_stock" />
                </div>
                <div className="border rounded-xl mt-2  p-4 w-full flex items-center justify-between ">
                  <p className=" font-semibold text-gray-700">
                    Activate Product
                  </p>
                  <Toggle name="status" />
                </div>
                <div className="border rounded-xl mt-2  p-4 w-full flex items-center justify-between ">
                  <p className=" font-semibold text-gray-700">Stock Item</p>
                  <Toggle name="stock_item" />
                </div>
                <div className="border rounded-xl mt-2  p-4 w-full flex items-center justify-between ">
                  <p className=" font-semibold text-gray-700">On Discount</p>
                  <Toggle name="on_discount" />
                </div>
                <div className="border rounded-xl mt-2  p-4 w-full  ">
                  <div className="flex items-center justify-between">
                    <p className=" font-semibold text-gray-700">
                      Mark As Featured
                    </p>
                    <DefaultToggle defaultChecked />
                  </div>
                  <p className="text-gray-600 pt-5 pb-1 text-sm">
                    Mark this product as a featured product, and it will be
                    displayed under the featured product list on the homepage
                  </p>
                </div>

                <div className="border rounded-xl mt-2  p-4 w-full  ">
                  <div className="flex items-center justify-between">
                    <p className=" font-semibold text-gray-700">
                      Mark As Latest
                    </p>
                    <DefaultToggle defaultChecked />
                  </div>
                  <p className="text-gray-600 pt-5 pb-1 text-sm">
                    Mark this product as a latest product, and it will be
                    displayed under the latest product list on the homepage
                  </p>
                </div>

                <div className="border rounded-xl mt-2   w-full  ">
                  <div className=" border-b mb-6 px-4 pt-4 pb-2">
                    <div className="flex items-center justify-between">
                      <p className=" font-semibold text-gray-700">Tags</p>
                      <ArrowDownIcon className="w-7 h-7" />
                    </div>
                    <p className="text-gray-600 pt-5 pb-1 text-sm">
                      Categorize your store products and organize search results
                      for customers
                    </p>
                  </div>
                  <div className="px-4">
                    <div className="pb-6">
                      <AsyncReactSelect
                        selectedValue={selectedValue}
                        setSelectedValue={setSelectedValue}
                        fetchData={fetchProductTags}
                        placeholder="Select a product tags"
                        label="Product Tags"
                        isMulti
                      />
                    </div>
                    {/* <Input
                      name="starting_cost"
                      // label="Create New Sub-Category"
                      className="mb-0"
                      placeholder="Type to Search"
                    /> */}
                  </div>
                </div>
              </div>
            </div>
            {/* <div className=" flex items-start w-full gap-6">
              <div className="relative bg-white rounded-2xl shadow  w-[70%]">
                <div className="flex items-center justify-between p-4 md:px-5 border-b rounded-t ">
                  <div>
                    <h1 className="text-lg font-semibold text-gray-900 ">
                      Variants & Options
                    </h1>
                    <p className="text-gray-600 text-sm font-light">
                      Customize the product variants, including size, color, etc
                    </p>
                  </div>
                </div>

                <div className="text-gray-600 text-sm px-4 py-3 mt-2 mb-4 bg-gray-100 border-b flex items-center">
                  <p className="w-[45%]">Attribute</p>
                  <p className="w-[45%]">Attribute Values</p>
                  <p className="w-[10%]">Action</p>
                </div>
                <div className=" flex items-center justify-center w-full gap-4 pl-5">
                  <div className=" w-[45%]">
                    <Input
                      name="starting_cost"
                      // label="Create New Sub-Category"
                      placeholder="Select Option"
                      className=""
                    />
                  </div>
                  <div className=" w-[40%]">
                    <Input
                      name="starting_cost"
                      // label="Create New Sub-Category"
                      placeholder="Type to Search"
                      className=""
                    />
                  </div>

                  <div className="w-[15%] mb-6 pl-6">
                    <Button size="sm" outline color="gray">
                      <PlusIcon className="w-7 h-7" />
                    </Button>
                  </div>
                </div>
              </div>
            </div> */}
            {/* <ProductAttributes /> */}

            <div className=" flex items-start w-full gap-6">
              <div className="p-4 md:px-5 relative bg-white rounded-2xl shadow  w-[70%]">
                <div className="flex items-center justify-between pb-4  border-b rounded-t ">
                  <div>
                    <h1 className="text-lg font-semibold text-gray-900 ">
                      Media
                    </h1>
                    <p className="text-gray-600 text-sm font-light">
                      Manage your product’s image gallery
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1  gap-6">
                  <div className="pt-6">
                    <ImageUpload
                      images={imagesFile}
                      setImages={setImagesFile}
                    />
                  </div>

                  {/* <div className="pt-6">
                    <MultipleImageUpload />
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </HookForm>
        <ProductAttributes
          attributes={attributes}
          setAttributes={setAttributes}
        />
      </div>
    </div>
  );
};

export default AdminCreateOrder;

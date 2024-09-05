import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "../../../components/forms/Button";
import {
  ArrowDownIcon,
  LeftArrowIcons,
  PlusIcon,
} from "../../../assets/SvgIcons";
import { Input } from "../../../components/forms/Input";
import { TextArea } from "../../../components/forms/TextArea";
import HookForm from "../../../components/forms/Form";
import CustomSelect from "../../../components/forms/Select/CustomSelect";
import Uploader from "../../../components/forms/Upload/uploader";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProduct,
  updateProduct,
} from "../../../Redux/products/productsThunk";
import DefaultToggle from "../../../components/forms/DefaultToggle";
import { fetchCategorys } from "../../../Redux/category/categoriesThunk";
import { productSchema } from "../../../schema/productSchema";
import { Toggle } from "../../../components/forms/Toggle/Toggle";
import LoadingSpinner from "../../../components/Loading/LoadingSpinner";
import ErrorStatus from "src/components/ui/ErrorStatus";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams(); // Type assertion for id

  const { product, loading, error } = useSelector((state) => state.products);

  // console.log("single product", product);

  useEffect(() => {
    dispatch(fetchProduct(id));
  }, [id, dispatch]);

  const [filesImgs, setFilesImgs] = useState("");
  const [filesUpload, setFilesUpload] = useState("");

  const [selectedState, setSelectedState] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState(null);

  const [selectedWarranty, setSelectedWarranty] = useState(null);

  const { categories } = useSelector((state) => state.category);
  //   console.log("categories", selectedCategory?.id);

  const fetchCategorysHandler = () => {
    dispatch(fetchCategorys());
  };
  useEffect(() => {
    fetchCategorysHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const catgoryData = [
    { name: "Nike", shipment_type: "nike" },
    { name: "Samsung", shipment_type: "Samsung" },
    { name: "Lenovo", shipment_type: "Lenovo" },
  ];

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

  console.log(productWarrantyData);

  const defaultFormValue = {
    // name: "",
    // brand_id: "",
    // min_selling_price: "",
    // model: "",
    // warranty: "",
    // sku: "",
    // listing_price: "",
    // short_description: "",
    // long_description: "",
    // whats_in_the_box: "",
    // status: "",
    name: product?.data?.name,
    brand_id: product?.data?.brand_id,
    category_id: selectedCategory?.id,
    listing_price: Number(product?.data?.listing_price),
    min_selling_price: Number(product?.data?.min_selling_price),
    model: product?.data?.model,
    // warranty: selectedWarranty?.warranty,
    sku: product?.data?.sku,
    short_description: product?.data?.short_description,
    long_description: product?.data?.long_description,
    whats_in_the_box: product?.data?.whats_in_the_box,
    // imgs: [
    //   "https://pictures-nigeria.jijistatic.net/117777770_NjIwLTYwNC0xNmU0ZDc0MDZj.webp",
    // ],
    // attributes: [],
    // tags: [],
    stock_item: product?.data?.stock_item,
    status: product?.data?.status,
  };
  const onSubmit = (data) => {
    // console.log("Form data", data);

    const filteredFormData = {
      name: data.name,
      brand_id: data.brand_id,
      category_id: selectedCategory?.id,
      listing_price: data?.listing_price,
      min_selling_price: data.min_selling_price,
      model: data.model,
      warranty: selectedWarranty?.warranty,
      sku: data.sku,
      short_description: data.short_description,
      long_description: data.long_description,
      whats_in_the_box: data?.whats_in_the_box,
      imgs: [
        "https://pictures-nigeria.jijistatic.net/117777770_NjIwLTYwNC0xNmU0ZDc0MDZj.webp",
      ],
      attributes: [],
      tags: [],
      stock_item: data?.stock_item,
      status: data?.status,
    };

    // console.log("filtered data", filteredFormData);
    // alert(JSON.stringify(filteredFormData));
    dispatch(
      updateProduct({ id: product?.data?.id, formData: filteredFormData })
    );

    navigate("/admin/product/inventory/");
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
              Update Product
            </h1>
          </div>
        </div>
      </div>
      {loading ? (
        <div className="h-[80vh]">
          <LoadingSpinner />
        </div>
      ) : error ? (
        <div className="p-2">
          <ErrorStatus
            message={JSON.stringify(error?.message)}
            statusCode={error?.status_code || error?.status}
            link="/admin/dashboard"
          />
        </div>
      ) : (
        <div className="relative p-4 w-full  max-h-full">
          <HookForm
            defaultValues={defaultFormValue}
            onSubmit={onSubmit}
            schema={productSchema}
          >
            <div className=" space-y-6">
              <div className=" flex items-start w-full gap-6">
                <div className="relative bg-white rounded-2xl shadow  w-[70%]">
                  <div className="flex items-center justify-between p-4 md:px-5 border-b rounded-t ">
                    <div>
                      <h1 className="text-lg font-semibold text-gray-900 ">
                        Update Product Details
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
                        label="Product Name"
                        placeholder="Enter product Name"
                      />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <div className="pb-4">
                            <CustomSelect
                              label="Brand"
                              selected={selectedState}
                              setSelected={setSelectedState}
                              data={catgoryData}
                              withImage={false}
                              placeholder="Select a brand"
                            />
                          </div>
                          <Input
                            name="listing_price"
                            label="Listing Price"
                            placeholder="Enter a list price"
                            type="number"
                          />
                          <Input name="model" label="Model #" placeholder="." />
                          <div className="pb-4">
                            <CustomSelect
                              label="Product Warranty"
                              selected={selectedWarranty}
                              setSelected={setSelectedWarranty}
                              data={productWarrantyData}
                              withImage={false}
                              placeholder="Select a warranty"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="pb-4">
                            <CustomSelect
                              label="Category"
                              selected={selectedCategory}
                              setSelected={setSelectedCategory}
                              data={categories?.data}
                              withImage={false}
                              placeholder="Select a category"
                            />
                          </div>
                          <Input
                            type="number"
                            name="min_selling_price"
                            label="Minimum Selling Price [$] "
                            placeholder="0"
                          />
                          <Input
                            name="sku"
                            label=" SKU Number"
                            placeholder="Enter sku number"
                          />
                          <div className=" opacity-0 pointer-events-none">
                            <Input
                              name="rep_phone"
                              label="Phone Number"
                              placeholder="+234 (555) 000-0000"
                            />
                          </div>
                        </div>
                      </div>
                      <TextArea
                        name="short_description"
                        label=" Quick Short Description"
                        placholder="Enter short description"
                      />
                      <TextArea
                        name="long_description"
                        label=" Long Detailed Description"
                        placholder="Enter description"
                        rows={10}
                      />
                      <TextArea
                        name="whats_in_the_box"
                        label=" What’s In The Box"
                        placholder="Enter details"
                      />
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
                <div className="relative bg-white rounded-2xl shadow space-y-6 p-5 pt-6 w-[30%]">
                  <Button
                    type="submit"
                    className="w-full justify-center"
                    size="lg"
                  >
                    Update Product
                  </Button>
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
                        Categorize your store products and organize search
                        results for customers
                      </p>
                    </div>
                    <div className="px-4">
                      <Input
                        name="starting_cost"
                        // label="Create New Sub-Category"
                        className="mb-0"
                        placeholder="Type to Search"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className=" flex items-start w-full gap-6">
                <div className="relative bg-white rounded-2xl shadow  w-[70%]">
                  <div className="flex items-center justify-between p-4 md:px-5 border-b rounded-t ">
                    <div>
                      <h1 className="text-lg font-semibold text-gray-900 ">
                        Variants & Options
                      </h1>
                      <p className="text-gray-600 text-sm font-light">
                        Customize the product variants, including size, color,
                        etc
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
              </div>
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="pt-6">
                      <Uploader files={filesImgs} setFiles={setFilesImgs} />
                    </div>
                    <div className="pt-6">
                      <Uploader files={filesUpload} setFiles={setFilesUpload} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </HookForm>
        </div>
      )}
    </div>
  );
};

export default UpdateProduct;

/* eslint-disable no-unused-vars */
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "../../../components/forms/Button";
import {
  ArrowDownIcon,
  DeleteIcon,
  LeftArrowIcons,
  PlusIcon,
  XIcon,
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
import AsyncReactSelect from "../../../components/forms/Select/async-react-select";
import { deleteData, getData, newBaseURL, postData } from "../../../utils/api";
import ImageUpload from "../../../components/forms/Upload/ImageUpload";
import toast from "react-hot-toast";
import { Badge } from "../../../components/forms/Badge";
import ProductAttributes from "./ProductAttributes";
import { Tooltip } from "flowbite-react";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams(); // Type assertion for id

  const { product, loading, error } = useSelector((state) => state.products);
  const [attributes, setAttributes] = useState([]);
  const [productImage, setProductImage] = useState([]);

  console.log("ATTRIBUTE ADDED", attributes);

  console.log("single product", product);

  useEffect(() => {
    dispatch(fetchProduct(id));
  }, [id, dispatch]);

  const [showImageModal, setshowImageModal] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  // console.log("first image preview", imagePreview);
  // const [filesImgs, setFilesImgs] = useState("");
  const [imagesFile, setImagesFile] = useState([]);

  const [selectedBrand, setSelectedBrand] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState(null);

  const [selectedWarranty, setSelectedWarranty] = useState(null);

  const { categories } = useSelector((state) => state.category);

  console.log("ALL CATEGOrY: ", categories);
  //   console.log("categories", selectedCategory?.id);
  const [selectedValue, setSelectedValue] = useState(product?.data?.tags);

  const TAGS_URL = "admin/tag";

  useEffect(() => {
    setProductImage(product?.data?.imgs);
  }, [product?.data]);

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
  const fetchCategorysHandler = () => {
    dispatch(fetchCategorys());
  };
  useEffect(() => {
    fetchCategorysHandler("admin/category");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const brandData = [
    { id: 1, name: "Nike", brand: "nike", category: "Sports" },
    { id: 2, name: "Samsung", brand: "samsung", category: "Electronics" },
    { id: 3, name: "Lenovo", brand: "lenovo", category: "Electronics" },
    { id: 4, name: "Apple", brand: "apple", category: "Electronics" },
    { id: 5, name: "Coca-Cola", brand: "coca-cola", category: "Beverages" },
    { id: 6, name: "Toyota", brand: "toyota", category: "Automotive" },
    { id: 7, name: "McDonald's", brand: "mcdonalds", category: "Food" },
    { id: 8, name: "Honda", brand: "honda", category: "Automotive" },
    { id: 9, name: "Adidas", brand: "adidas", category: "Sports" },
    { id: 10, name: "Microsoft", brand: "microsoft", category: "Software" },
    { id: 11, name: "Google", brand: "google", category: "Software" },
    { id: 12, name: "Amazon", brand: "amazon", category: "E-commerce" },
    { id: 13, name: "Ford", brand: "ford", category: "Automotive" },
    { id: 14, name: "Pepsi", brand: "pepsi", category: "Beverages" },
    { id: 15, name: "Intel", brand: "intel", category: "Electronics" },
    { id: 16, name: "HP", brand: "hp", category: "Electronics" },
    { id: 17, name: "Dell", brand: "dell", category: "Electronics" },
    { id: 18, name: "Canon", brand: "canon", category: "Electronics" },
    { id: 19, name: "Sony", brand: "sony", category: "Electronics" },
    { id: 20, name: "Volkswagen", brand: "volkswagen", category: "Automotive" },
    { id: 21, name: "Levi's", brand: "levis", category: "Clothing" },
    { id: 22, name: "Gucci", brand: "gucci", category: "Luxury Fashion" },
    { id: 23, name: "Chanel", brand: "chanel", category: "Luxury Fashion" },
    { id: 24, name: "H&M", brand: "hm", category: "Clothing" },
    { id: 25, name: "Zara", brand: "zara", category: "Clothing" },
    {
      id: 26,
      name: "Calvin Klein",
      brand: "calvin-klein",
      category: "Clothing",
    },
    { id: 27, name: "Lacoste", brand: "lacoste", category: "Clothing" },
    {
      id: 28,
      name: "Ralph Lauren",
      brand: "ralph-lauren",
      category: "Clothing",
    },
    { id: 29, name: "Armani", brand: "armani", category: "Luxury Fashion" },
    { id: 30, name: "Prada", brand: "prada", category: "Luxury Fashion" },
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

  // console.log(productWarrantyData);

  const getSingleImage = (index) => {
    const currentImage = product?.data?.imgs?.find(
      (_, indexImage) => indexImage === index
    );
    setImagePreview(currentImage);

    setshowImageModal(true);
  };

  // const product_Id = product?.data?.id;

  const deleteProductImage = async (index) => {
    const currentImage = product?.data?.imgs?.find(
      (_, indexImage) => indexImage === index
    );
    // console.log("id: ", id, "image: ", currentImage);
    const imagepath = {
      image_path: currentImage,
    };
    // console.log("img: ", imagepath);
    try {
      const response = await deleteData(
        `admin/product-image-delete/${id}`,
        imagepath
      );
      if (response.status >= 200 && response.status <= 300) {
        dispatch(fetchProduct(id));
        toast.success("Image deleted successfully");
      }
      console.log("image delete res: ", response);
      return response;
    } catch (error) {
      const errorMessage = error;
      toast.error("Unable to deleted product image");
      console.log(errorMessage);
    }
  };
  const getCategory = categories?.data?.find(
    (category) => category.id === product?.data?.category?.id
  );
  const getWarranty = productWarrantyData?.find(
    (warranty) => warranty.warranty === product?.data?.warranty
  );

  // console.log("getWarranty:", getWarranty);

  const selectedTags = selectedValue?.map((value) => value.id);
  // console.log("firstTag:", selectedTags);

  const deleteProductTags = async (index) => {
    // console.log("delete tage click:", index);
    const currentTag = product?.data?.tags?.find(
      (_, indexTag) => indexTag === index
    );
    // console.log("click tag: ", currentTag);
    const tagToDelete = {
      tag_id: currentTag.id,
    };
    // console.log("img: ", imagepath);
    try {
      const response = await deleteData(
        `admin/product-tag-delete/${id}`,
        tagToDelete
      );
      if (response.status >= 200 && response.status <= 300) {
        toast.success("Product tag deleted! ");
        navigate(0);
        dispatch(fetchProduct(id));

        // navigate(`/admin/product/inventory/update/${id}`);
      }
      console.log("image delete res: ", response);
      return response;
    } catch (error) {
      // const errorMessage = error;

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
      // toast.error("Unable to deleted product tag");
      // console.log(errorMessage);
    }
  };

  const deleteProductAttribute = async (attributeId) => {
    const valueAttrToDelete = {
      attribute_id: attributeId,
    };

    try {
      const response = await deleteData(
        `admin/product-attribute-delete/${id}`,
        valueAttrToDelete
      );
      if (response.status >= 200 && response.status <= 300) {
        dispatch(fetchProduct(id));
        toast.success("Product Attribute Deleted! ");
      }
      console.log("image delete res: ", response);
      return response;
    } catch (error) {
      // const errorMessage = error;

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
      // toast.error("Unable to deleted product tag");
      // console.log(errorMessage);
    }
  };

  const deleteProductAttributeValue = async (attributeValueId) => {
    const valueAttrToDelete = {
      attribute_value_id: attributeValueId,
    };
    // console.log("img: ", imagepath);
    try {
      const response = await deleteData(
        `admin/product-attribute-value-delete/${id}`,
        valueAttrToDelete
      );
      if (response.status >= 200 && response.status <= 300) {
        dispatch(fetchProduct(id));
        toast.success("Product Attribute Value Deleted! ");
      }
      console.log("image delete res: ", response);
      return response;
    } catch (error) {
      // const errorMessage = error;

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
      // toast.error("Unable to deleted product tag");
      // console.log(errorMessage);
    }
  };

  console.log("New Image Upload:", imagesFile);
  const defaultFormValue = {
    name: product?.data?.name,
    // brand_id: product?.data?.brand_id,
    // category_id: selectedCategory?.id,
    listing_price: Number(product?.data?.listing_price),
    min_selling_price: Number(product?.data?.min_selling_price),
    model: product?.data?.model,
    discount_price: product?.data?.discount_price,
    in_stock: product?.data?.in_stock,
    on_discount: product?.data?.on_discount,
    // warranty: selectedWarranty?.warranty,
    sku: product?.data?.sku,
    short_description: product?.data?.short_description,
    long_description: product?.data?.long_description,
    whats_in_the_box: product?.data?.whats_in_the_box,

    stock_item: product?.data?.stock_item,
    status: product?.data?.status,
  };
  const onSubmit = async (data) => {
    // console.log("Form data", data);

    const filteredFormData = {
      name: data.name,
      brand_id: selectedBrand?.id ? selectedBrand.id : product?.data?.brand_id,
      category_id: selectedCategory?.id
        ? selectedCategory?.id
        : getCategory?.id,

      model: data.model,
      sku: data.sku,
      min_selling_price: data.min_selling_price,
      listing_price: data?.listing_price,
      discount_price: data?.discount_price,
      warranty: selectedWarranty?.warranty
        ? selectedWarranty.warranty
        : getWarranty?.warranty,
      short_description: data.short_description,
      long_description: data.long_description,
      whats_in_the_box: data?.whats_in_the_box,
      stock_item: data?.stock_item ? 1 : 0,
      in_stock: data?.in_stock ? 1 : 0,
      on_discount: data?.on_discount ? 1 : 0,
      status: data?.status ? 1 : 0,
      imgs: imagesFile,
      tags: selectedTags,
      attributes: attributes,
      _method: "PUT",
    };

    console.log("filtered data", filteredFormData);
    // alert(JSON.stringify(filteredFormData));
    // dispatch(
    //   updateProduct({ id: product?.data?.id, formData: filteredFormData })
    // );

    // navigate("/admin/product/inventory/");

    // { id: product?.data?.id, formData: filteredFormData }
    try {
      const result = await dispatch(
        updateProduct({ id: product?.data?.id, formData: filteredFormData })
      ).unwrap();
      console.log("Product result: ", result);
      if (result.status >= 200 && result.status <= 300) {
        toast.success("Product Update successfully");
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

    // setOpenModal(false);
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between pt-4 pb-8">
        <div className="flex items-center gap-3">
          <Link to="/admin/product/inventory">
            <Button size="sm" outline color="gray">
              <LeftArrowIcons className="w-6 h-6" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 pb-1.5">
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
        <div className="relative p-4 w-full max-h-full space-y-6">
          <HookForm
            defaultValues={defaultFormValue}
            onSubmit={onSubmit}
            schema={productSchema}
          >
            <div className="space-y-6">
              <div className="flex items-start w-full gap-6">
                <div className="relative bg-white rounded-2xl shadow w-[70%]">
                  <div className="flex items-center justify-between p-4 md:px-5 border-b rounded-t">
                    <div>
                      <h1 className="text-lg font-semibold text-gray-900">
                        Update Product Details
                      </h1>
                      <p className="text-gray-600 text-sm font-light">
                        Manage the product’s basic information
                      </p>
                    </div>
                  </div>

                  <div className=" h-full ">
                    {/* <ScrollArea className="h-full"> */}
                    <div className="p-5">
                      <Input
                        name="name"
                        label="Product Name"
                        placeholder="Enter product Name"
                      />

                      {/* <div className="pb-6">
                      <AsyncReactSelect
                        selectedValue={selectedValue}
                        setSelectedValue={setSelectedValue}
                        fetchData={fetchProductTags}
                        placeholder="Select a product tags"
                        label="Product Tags"
                        isMulti
                      />
                    </div> */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
                        <div>
                          <div className="pb-4">
                            <CustomSelect
                              label="Brand"
                              selected={selectedBrand}
                              setSelected={setSelectedBrand}
                              data={brandData}
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
                          <Input
                            name="discount_price"
                            label="Discount Price"
                            placeholder="Enter a discount price"
                            type="number"
                          />
                          <div>
                            <Input
                              name="model"
                              label="Model #"
                              placeholder="."
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
                              placeholder={
                                getCategory?.name || "Select a category"
                              }
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
                          <div className="pb-4">
                            <CustomSelect
                              label="Product Warranty"
                              selected={selectedWarranty}
                              setSelected={setSelectedWarranty}
                              data={productWarrantyData}
                              withImage={false}
                              placeholder={
                                getWarranty?.name || "Select a warranty"
                              }
                            />
                          </div>
                          {/* <div className=" opacity-0 pointer-events-none">
                          <Input
                            name="rep_phone"
                            label="Phone Number"
                            placeholder="+234 (555) 000-0000"
                          />
                        </div> */}
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
                  {/* <div className="border rounded-xl mt-2 p-4 w-full flex items-center justify-between">
                    <p className="font-semibold text-gray-700">
                      Activate Product
                    </p>
                    <Toggle name="status" />
                  </div>
                  <div className="border rounded-xl mt-2 p-4 w-full flex items-center justify-between">
                    <p className="font-semibold text-gray-700">Stock Item</p>
                    <Toggle name="stock_item" />
                  </div> */}
                  <div className="border rounded-xl mt-2 p-4 w-full">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-gray-700">
                        Mark As Featured
                      </p>
                      <DefaultToggle defaultChecked />
                    </div>
                    <p className="text-gray-600 pt-5 pb-1 text-sm">
                      Mark this product as a featured product, and it will be
                      displayed under the featured product list on the homepage.
                    </p>
                  </div>

                  <div className="border rounded-xl mt-2 p-4 w-full">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-gray-700">
                        Mark As Latest
                      </p>
                      <DefaultToggle defaultChecked />
                    </div>
                    <p className="text-gray-600 pt-5 pb-1 text-sm">
                      Mark this product as a latest product, and it will be
                      displayed under the latest product list on the homepage.
                    </p>
                  </div>

                  <div className="border rounded-xl mt-2 w-full">
                    <div className="border-b mb-6 px-4 pt-4 pb-2">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-gray-700">Tags</p>
                        <ArrowDownIcon className="w-7 h-7" />
                      </div>
                      <p className="text-gray-600 pt-5 pb-1 text-sm">
                        Categorize your store products and organize search
                        results for customers.
                      </p>
                    </div>
                    <div className="px-4 pb-6">
                      <AsyncReactSelect
                        selectedValue={selectedValue}
                        setSelectedValue={setSelectedValue}
                        fetchData={fetchProductTags}
                        placeholder="Select a product tags"
                        label="Product Tags"
                        isMulti
                      />
                      <div className="pt-4">
                        <p className="font-semibold text-gray-700">
                          Delete Product Tag{" "}
                        </p>
                        <div className=" flex items-center flex-wrap gap-2 pt-2">
                          {selectedValue?.map((tagToDelete, i) => (
                            <Badge
                              key={i}
                              rounded={true}
                              color="error"
                              onClick={() => deleteProductTags(i)}
                              className=" capitalize"
                              text={tagToDelete?.name}
                              closeIcon={<XIcon />}
                            />
                          ))}
                        </div>
                      </div>
                      {/* <Input
                        name="starting_cost"
                        className="mb-0"
                        placeholder="Type to Search"
                      /> */}
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className="flex items-start w-full gap-6">
                <div className="relative bg-white rounded-2xl shadow w-[70%]">
                  <div className="flex items-center justify-between p-4 md:px-5 border-b rounded-t">
                    <div>
                      <h1 className="text-lg font-semibold text-gray-900">
                        Variants & Options
                      </h1>
                      <p className="text-gray-600 text-sm font-light">
                        Customize the product variants, including size, color,
                        etc.
                      </p>
                    </div>
                  </div>

                  <div className="text-gray-600 text-sm px-4 py-3 mt-2 mb-4 bg-gray-100 border-b flex items-center">
                    <p className="w-[45%]">Attribute</p>
                    <p className="w-[45%]">Attribute Values</p>
                    <p className="w-[10%]">Action</p>
                  </div>
                  <div className="flex items-center justify-center w-full gap-4 pl-5">
                    <div className="w-[45%]">
                      <Input name="starting_cost" placeholder="Select Option" />
                    </div>
                    <div className="w-[40%]">
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

              <div className="flex items-start w-full gap-6">
                <div className="p-4 md:px-5 relative bg-white rounded-2xl shadow w-[70%]">
                  <div className="flex items-center justify-between pb-4 border-b rounded-t">
                    <div>
                      <h1 className="text-lg font-semibold text-gray-900">
                        Media
                      </h1>
                      <p className="text-gray-600 text-sm font-light">
                        Manage your product’s image gallery.
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1  gap-6">
                    <div className="pt-6">
                      <ImageUpload
                        images={imagesFile}
                        setImages={setImagesFile}
                        updateImages={
                          product?.data && (
                            <div>
                              {productImage?.map((image, imageIndex) => (
                                <div
                                  key={imageIndex}
                                  className="group relative rounded border p-2 flex"
                                >
                                  <img
                                    className="rounded min-h-[140px] max-h-[140px] max-w-full"
                                    src={`${newBaseURL}storage/${image}`}
                                    alt="image-2"
                                  />
                                  <div className="absolute inset-2 bg-gray-900/[.7] group-hover:flex hidden text-xl items-center justify-center">
                                    <span
                                      className="text-gray-100 hover:text-gray-300 cursor-pointer p-1.5"
                                      onClick={() => getSingleImage(imageIndex)}
                                    >
                                      <svg
                                        stroke="currentColor"
                                        fill="currentColor"
                                        strokeWidth={0}
                                        viewBox="0 0 20 20"
                                        aria-hidden="true"
                                        height="1em"
                                        width="1em"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                        <path
                                          fillRule="evenodd"
                                          d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                    </span>
                                    <span
                                      className="text-gray-100 hover:text-gray-300 cursor-pointer p-1.5"
                                      onClick={() =>
                                        deleteProductImage(imageIndex)
                                      }
                                    >
                                      <svg
                                        stroke="currentColor"
                                        fill="currentColor"
                                        strokeWidth={0}
                                        viewBox="0 0 20 20"
                                        aria-hidden="true"
                                        height="1em"
                                        width="1em"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )
                        }
                      />
                    </div>
                  </div>
                  {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="pt-6">
                      <Uploader files={filesImgs} setFiles={setFilesImgs} />
                    </div>
                    <div className="pt-6">
                      <Uploader files={filesUpload} setFiles={setFilesUpload} />
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </HookForm>
          <ProductAttributes
            attributes={attributes}
            setAttributes={setAttributes}
            updateDefaultAttribute={
              <div>
                <div className="flex items-start w-full gap-6">
                  <div className="relative bg-white rounded-2xl shadow w-[70%]">
                    <div className="flex items-center justify-between p-4 md:px-5 border-b rounded-t">
                      <div>
                        <h1 className="text-lg font-semibold text-gray-900">
                          Default Variants & Options
                        </h1>
                        <p className="text-gray-600 text-sm font-light">
                          Customize the product variants, including size, color,
                          etc.
                        </p>
                      </div>
                    </div>

                    <div className="text-gray-600 text-sm px-4 py-3 mt-2 mb-4 bg-gray-100 border-b flex items-center">
                      <p className="w-[45%]">Attribute</p>
                      <p className="w-[45%]">Attribute Values</p>
                      <p className="w-[10%]">Action</p>
                    </div>
                    <div className=" px-4">
                      {product?.data?.attributes.map((attribute, index) => {
                        // console.log("LOOP", attribute);
                        // const attributeName = getAttributes(attribute.attribute_id);
                        // console.log("attributeName:", attributeName[0]?.name);
                        return (
                          <div key={index}>
                            <div className=" flex items-center justify-between">
                              <p className="text-base font-semibold text-gray-900 pb-1">
                                {attribute?.name}
                              </p>
                              <div className=" flex items-center gap-1">
                                <p className="text-sm font-medium text-gray-900 ">
                                  Delete Attribute
                                </p>
                                <Tooltip
                                  content={
                                    <span className=" whitespace-nowrap">
                                      Delete All Attribute
                                    </span>
                                  }
                                  style="light"
                                  // placement="left"
                                >
                                  <div
                                    className="text-red-500 hover:text-red-700 cursor-pointer"
                                    onClick={() =>
                                      deleteProductAttribute(attribute?.id)
                                    }
                                  >
                                    <DeleteIcon className="text-red-600 w-6 h-6" />
                                  </div>
                                </Tooltip>
                              </div>
                            </div>

                            {attribute?.values?.map((value, valueIndex) => (
                              <div
                                key={valueIndex}
                                className="flex justify-between gap-4 items-center mb-2"
                              >
                                <div className="pb-4 w-full ">
                                  <label
                                    htmlFor="title"
                                    className="block text-sm font-medium text-gray-700"
                                  >
                                    Value
                                  </label>
                                  <input
                                    id="value"
                                    type="text"
                                    disabled
                                    placeholder={value?.value}
                                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-3 py-4 outline-none sm:text-sm"
                                  />
                                </div>
                                <div className="pb-4 w-full ">
                                  <label
                                    htmlFor="title"
                                    className="block text-sm font-medium text-gray-700"
                                  >
                                    Value ID
                                  </label>
                                  <input
                                    id="value"
                                    type="text"
                                    disabled
                                    placeholder={value?.product_attribute_id}
                                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-3 py-4 outline-none sm:text-sm"
                                  />
                                </div>
                                <div className=" w-[15%]">
                                  <span className=" whitespace-nowrap">
                                    {/* {attributeName[0]?.name}: {attribute.value} */}
                                    ({value.imgs.length} images)
                                  </span>
                                </div>
                                <div className=" w-[10%]">
                                  <Tooltip
                                    style="light"
                                    content={
                                      <span className=" whitespace-nowrap">
                                        Remove Attribute
                                      </span>
                                    }
                                  >
                                    <div
                                      className="text-red-500 hover:text-red-700 cursor-pointer"
                                      onClick={() =>
                                        deleteProductAttributeValue(value?.id)
                                      }
                                    >
                                      <DeleteIcon className="text-red-600 w-6 h-6" />
                                    </div>
                                  </Tooltip>
                                </div>
                              </div>
                            ))}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            }
          />

          {showImageModal && (
            <div
              id="crud-modal"
              className=" overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full max-h-full backdrop-blur-sm bg-black/50"
            >
              <div className="relative p-4 w-full max-w-md lg:max-w-3xl mx-auto max-h-full">
                {/* Modal content */}
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  {/* Modal header */}
                  <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Image Preview
                    </h3>
                    <button
                      onClick={() => setshowImageModal(false)}
                      type="button"
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                      data-modal-toggle="crud-modal"
                    >
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                      </svg>
                      <span className="sr-only">Close modal</span>
                    </button>
                  </div>
                  {/* Modal body */}
                  <div className="p-4 md:p-5">
                    <img
                      className="rounded max-h-[350px] lg:max-h-[650px] max-w-full"
                      src={`${newBaseURL}storage/${imagePreview}`}
                      alt="image-2"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UpdateProduct;

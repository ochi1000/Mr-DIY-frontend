// import { Link } from "react-router-dom";
import { Button } from "../../../components/forms/Button";
import { Badge } from "../../../components/forms/Badge";

import {
  DeleteIcon,
  EditIcon,
  EyeIconBold,
  FilterIcon,
  PlusIcon,
  SearchIcon,
} from "../../../assets/SvgIcons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  deleteProduct,
  fetchProduct,
  fetchProducts,
} from "../../../Redux/products/productsThunk";
import ErrorStatus from "src/components/ui/ErrorStatus";
import LoadingSpinner from "src/components/Loading/LoadingSpinner";
import { formatDate } from "src/utils/constant";
import { Link, useNavigate } from "react-router-dom";

import Notification from "../../../components/forms/Notification";
import ViewProductModal from "../../../components/Modals/ViewProductModal";
import Pagination from "../../../components/forms/Pagination";
import toast from "react-hot-toast";

const Inventory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [viewProduct, setViewProduct] = useState(false);
  const [deleteProductData, setDeleteProductData] = useState(false);
  const { products, product, loading, error } = useSelector(
    (state) => state.products
  );
  // console.log("products", products);

  const fetchProductsHandler = (url) => {
    dispatch(fetchProducts(url));
  };
  useEffect(() => {
    fetchProductsHandler("admin/product");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const checkDetail = async (data) => {
    try {
      navigate(`/admin/product/inventory/update/${data.id}`);
    } catch (error) {
      console.error("Error navigating to product details:", error);
    }
  };
  const handlePaginate = (url) => {
    if (url) {
      fetchProductsHandler(url);
    }
  };
  const fetchSingleProduct = (product_id) => {
    dispatch(fetchProduct(product_id));
    setViewProduct(true);
  };

  const deleteProductHandler = (product_id) => {
    dispatch(fetchProduct(product_id));
    setDeleteProductData(true);
  };

  const handleDelete = async (product) => {
    // console.log("coupon is here", coupon);
    if (product) {
      // Handle delete product logic here

      try {
        const result = await dispatch(deleteProduct(product?.id)).unwrap();
        console.log("Product Delete result: ", result);

        if (result.status >= 200 && result.status <= 300) {
          toast.success("Product Deleted successfully");
          navigate("/admin/product/inventory");
          fetchProductsHandler("admin/product");
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
      } finally {
        setDeleteProductData(false);
      }

      //   try {
      //     // setLoading(true);
      //     dispatch(deleteProduct(product?.id));
      //     navigate("/admin/product/inventory");
      //   } catch (error) {
      //     console.log(error);

      //     // dispatch(
      //     //   openToast({
      //     //     type: "error",
      //     //     message: ` Error deleting coupon with error details: ${}`,
      //     //   })
      //     // );
      //   }
    }
  };
  const headerDatas = {
    tableHeadings: [
      "S/N",
      "Product",
      "Selling Price",
      "Stock Item",
      "Date Uploaded",
      "Available",
      "Status",
      "Action",
    ],
  };
  return (
    <div className="p-4 ">
      <div className=" flex items-center justify-between ">
        <div className="pb-4 pt-1">
          <h1 className=" text-xl font-semibold text-gray-900 pb-1.5">
            Inventory
          </h1>
          <h5 className="text-gray-500 text-sm font-normal">
            View and edit each product’s inventory details
          </h5>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/admin/product/inventory/create">
            <Button leftIcon={<PlusIcon />}>Add New Product</Button>
          </Link>
        </div>
      </div>

      <div className="border border-gray-200 rounded-xl ">
        <div className="flex items-center justify-between p-4 rounded-t-xl border-b bg-white">
          <div className="font-normal text-gray-600 text-xs">
            Showing {products?.meta?.from} to {products?.meta?.to} out of{" "}
            {products?.meta?.total} Products
          </div>
          <div className="flex items-center gap-2">
            <form className="max-w-[430px] w-full">
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
                  type="search"
                  id="default-search"
                  className="block w-full lg:w-[400px] px-4 py-2.5 ps-10 text-sm text-gray-900 border font-Inter border-gray-300 rounded-md bg-white outline-none  "
                  placeholder="Search by Name"
                  required=""
                />
              </div>
            </form>
            <Button outline color="gray" size="md" leftIcon={<FilterIcon />}>
              Filter
            </Button>
          </div>
        </div>
        {/* <div className="w-full bg-gray-100 px-4 py-3 h-11 border-b flex items-center text-xs font-medium text-gray-600 ">
          <div className="w-[15%]" />
          <div className=" w-[15%]">Date</div>
          <div className="w-[10%] ">Time</div>
          <div className="w-[35%]">Address</div>
          <div className="w-[15%]">State</div>
          <div className="w-[10%]">Status</div>
        </div> */}
        <>
          {loading ? (
            <div className="min-h-[200px] flex items-center justify-center">
              <LoadingSpinner />
            </div>
          ) : error ? (
            <ErrorStatus
              message={JSON.stringify(error?.message)}
              statusCode={error?.status_code || error?.status}
              link="/admin/dashboard"
              reload
            />
          ) : (
            <div className="relative overflow-x-auto shadow sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-600 ">
                <thead className=" text-gray-700 bg-gray-100 ">
                  <tr className="font-Inter ">
                    {headerDatas.tableHeadings.map((heading, headingIndex) => (
                      <th
                        key={headingIndex}
                        scope="col"
                        className="px-6 py-4 whitespace-nowrap font-Inter text-xs font-semibold"
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {products?.data?.map((item, rowIndex) => (
                    <tr
                      key={rowIndex}
                      className="bg-white border-b text-gray-400  hover:bg-gray-50 [&_tr:last-child]:border-0 font-Inter"
                    >
                      <th
                        scope="row"
                        className="px-6 py-5 font-medium whitespace-nowrap "
                      >
                        {rowIndex + 1}
                      </th>
                      <td className="px-6 py-5 whitespace-nowrap text-gray-900 font-medium inline-flex items-center gap-2 w-60">
                        {/* <img src={} alt="product image " /> */}
                        <p className=" truncate">{item?.name}</p>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="text-sm  text-gray-600 flex items-center gap-2 ">
                          {/* {
                          <Avatar
                            textAvatar
                            image={
                              item?.user?.full_name == null
                                ? "Not Available"
                                : item?.user?.full_name
                            }
                          />
                        } */}
                          <div className=" truncate">
                            <p>₦{item?.listing_price}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        {/* {item?.stock_item === 1 ? "True" : "False"} */}
                        <Badge
                          rounded
                          text={item?.stock_item === 1 ? "True" : "False"}
                          color={item?.stock_item === 1 ? "success" : "error"}
                          className=" capitalize"
                        />
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        {formatDate(item?.created_at)}
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        {" "}
                        <div className=" whitespace-nowrap">
                          <Badge
                            rounded
                            text={item?.status === 1 ? "In-Stock" : "Non-Stock"}
                            color={item?.status === 1 ? "success" : "warning"}
                            className=" capitalize"
                          />
                        </div>
                      </td>

                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="text-sm  text-gray-600 ">
                          <label className="inline-flex items-center cursor-pointer ">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              value=""
                              defaultChecked={item?.status === 1}
                            />
                            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-primary-700"></div>
                          </label>
                        </div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className=" flex items-center gap-4">
                          <div
                            className="cursor-pointer "
                            onClick={() => fetchSingleProduct(item?.id)}
                          >
                            <EyeIconBold />
                          </div>
                          <div
                            className="cursor-pointer "
                            onClick={() => checkDetail(item)}
                          >
                            <EditIcon />
                          </div>
                          <div
                            className="cursor-pointer pl-2"
                            onClick={() => deleteProductHandler(item?.id)}
                          >
                            <DeleteIcon className="text-red-600 w-6 h-6 " />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="py-5">
            {products.length !== 0 && (
              <Pagination
                meta={products.meta}
                handlePaginate={handlePaginate}
              />
            )}
          </div>
        </>
      </div>

      {viewProduct && (
        <ViewProductModal
          setOpenModal={setViewProduct}
          productData={product?.data}
          loading={loading}
        />
      )}
      {deleteProductData && (
        <>
          <Notification
            message="Are you sure you want to delete this product?"
            type="warning"
            onCancel={() => setDeleteProductData(false)}
            onApprove={() => {
              handleDelete(product?.data);
              setDeleteProductData(false);
            }}
          />
        </>
      )}
    </div>
  );
};

export default Inventory;

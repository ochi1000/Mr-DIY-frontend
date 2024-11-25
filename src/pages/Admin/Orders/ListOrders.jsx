import { useEffect, useState } from "react";
import { getData } from "../../../utils/api";
import { Button } from "../../../components/forms/Button";
import {
  DeleteIcon,
  EditIcon,
  EyeIconBold,
  FilterIcon,
  PlusIcon,
  SearchIcon,
} from "../../../assets/SvgIcons";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../../components/Loading/LoadingSpinner";
import ErrorStatus from "../../../components/ui/ErrorStatus";
import { Badge } from "../../../components/forms/Badge";
import Pagination from "../../../components/forms/Pagination";
import { formatDateTime, formatNumber } from "../../../lib/constants";

const ListOrders = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [listOrders, setListOrders] = useState([]);
  console.log("listOrders:", listOrders);

  const orders = listOrders?.data;
  const handleFetchOrders = async (url) => {
    setLoading(true);
    try {
      const response = await getData(url);
      setListOrders(response);
      // console.log(response);
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchOrders(`admin/order/get-orders`);
  }, []);

  const handlePaginate = (url) => {
    if (url) {
      handleFetchOrders(url);
    }
  };
  const headerDatas = {
    tableHeadings: [
      "S/N",
      "Full Name",
      "Channel",
      "Total Price",
      "Payment Status",
      "Created Date ",
      "Contains",
      "Delivery Status",
      "Action",
    ],
  };
  return (
    <div className="p-4 ">
      <div className=" flex items-center justify-between ">
        <div className="pb-4 pt-1">
          <h1 className=" text-xl font-semibold text-gray-900 pb-1.5">
            All Orders
          </h1>
          <h5 className="text-gray-500 text-sm font-normal">
            List of All Orders Currently Available
          </h5>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/admin/orders-management/create-orders">
            <Button leftIcon={<PlusIcon />}>Create Order</Button>
          </Link>
        </div>
      </div>

      <div className="border border-gray-200 rounded-xl ">
        <div className="flex items-center justify-between p-4 rounded-t-xl border-b bg-white">
          <div className="font-normal text-gray-600 text-xs">
            Showing {listOrders?.meta?.from} to {listOrders?.meta?.to} out of{" "}
            {listOrders?.meta?.total} Products
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
                  {orders?.map((item, rowIndex) => (
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
                      <td className="px-6 py-5 whitespace-nowrap text-gray-900 font-medium inline-flex items-center gap-2 w-44">
                        {/* <img src={} alt="product image " /> */}
                        <p className=" truncate">
                          {item?.user?.first_name} {item?.user?.last_name}
                        </p>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="text-sm  text-gray-600 flex items-center gap-2 ">
                          <div className=" capitalize">
                            <p>{item?.channel}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="text-sm  text-gray-600 flex items-center gap-2 ">
                          <div className=" truncate">
                            <p>₦{formatNumber(Number(item?.total))}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <Badge
                          rounded
                          className="capitalize"
                          text={item?.payment_status}
                          color={
                            item?.payment_status === "paid"
                              ? "success"
                              : "error"
                          }
                        />
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        {formatDateTime(item?.created_at)}
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="text-sm capitalize text-gray-600 flex items-center gap-2 ">
                          <div className=" ">
                            <p>{item?.contains}</p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-5 whitespace-nowrap">
                        <Badge
                          rounded
                          text={item?.delivery_status}
                          color={
                            item?.delivery_status === "pending"
                              ? "warning"
                              : "success"
                          }
                          className=" capitalize"
                        />
                        {/* <div className="text-sm  text-gray-600 ">
                          <label className="inline-flex items-center cursor-pointer ">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              value=""
                              defaultChecked={item?.status === 1}
                            />
                            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-primary-700"></div>
                          </label>
                        </div> */}
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className=" flex items-center gap-4">
                          <div
                            className="cursor-pointer "
                            //  onClick={() => fetchSingleProduct(item?.id)}
                          >
                            <EyeIconBold />
                          </div>
                          <div
                            className="cursor-pointer "
                            //  onClick={() => checkDetail(item)}
                          >
                            <EditIcon />
                          </div>
                          <div
                            className="cursor-pointer pl-2"
                            //  onClick={() => deleteProductHandler(item?.id)}
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
            {listOrders.length !== 0 && (
              <Pagination
                meta={listOrders.meta}
                handlePaginate={handlePaginate}
              />
            )}
          </div>
        </>
      </div>

      {/* {viewProduct && (
         <ViewProductModal
           setOpenModal={setViewProduct}
           productData={product?.data}
           loading={loading}
         />
       )} */}
      {/* {deleteProductData && (
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
       )} */}
    </div>
  );
};

export default ListOrders;

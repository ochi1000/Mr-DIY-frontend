import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteDeliveryAddress,
  fetchDeliveryAddress,
  fetchDeliveryAddresss,
} from "../../Redux/DeliveryAddress/deliveryAddressThunk";
import { Button } from "../../components/forms/Button";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import CreateAddressModal from "../../components/Modals/CreateAddressModal";
import EditAddressModal from "../../components/Modals/EditAddressModal";
import Notification from "../../components/forms/Notification";
import LoadingSpinner from "../../components/Loading/LoadingSpinner";
import ErrorStatus from "../../components/ui/ErrorStatus";

const DeliveryAddress = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [openCreateAddress, setOpenCreateAddress] = useState(false);
  //   const [viewTag, setViewTag] = useState(false);
  const [editAddress, setEditAddress] = useState(false);
  const [deleteAddressData, setDeleteAddressData] = useState(false);

  const { del_addresses, del_address, loading, error } = useSelector(
    (state) => state.delivery_address
  );
  //   const checkDetail = async (data) => {
  //     try {
  //       navigate(`/admin/product/categories/update/${data.id}`);
  //     } catch (error) {
  //       console.error("Error navigating to product details:", error);
  //     }
  //   };

  //   const viewTagDetails = (tag_id) => {
  //     dispatch(fetchTag(tag_id));
  //     setViewTag(true);
  //   };

  const editTagData = (add_id) => {
    dispatch(fetchDeliveryAddress(add_id));
    setEditAddress(true);
  };

  const deletetaHandler = (add_id) => {
    dispatch(fetchDeliveryAddress(add_id));
    setDeleteAddressData(true);
  };

  const handleDelete = async (tag) => {
    // console.log("tag is here", tag);
    if (tag) {
      // Handle delete tag logic here
      try {
        // setLoading(true);
        dispatch(deleteDeliveryAddress(tag?.id));
        navigate("/user/delivery-address");
      } catch (error) {
        console.log(error);

        toast.error(error.response.data.message);
        // dispatch(
        //   openToast({
        //     type: "error",
        //     message: ` Error deleting coupon with error details: ${}`,
        //   })
        // );
      } finally {
        setDeleteAddressData(false);
      }
    }
  };

  //   console.log(" all deliver", del_addresses);

  const fetchDelAddresssHandler = () => {
    dispatch(fetchDeliveryAddresss());
  };
  useEffect(() => {
    fetchDelAddresssHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  return (
    <div>
      <div className="p-6 rounded-md shadow dark:shadow-gray-800 bg-gray-50 dark:bg-slate-900">
        <div className=" flex items-center justify-between ">
          <div className="pb-4 pt-1">
            <h1 className=" text-xl font-semibold text-gray-900 pb-1.5">
              Delivery Address
            </h1>
            <h5 className="text-gray-500 text-sm font-normal">
              The following addresses will be used on the checkout page by
              default.
            </h5>
          </div>
          <div className="flex items-center gap-3"></div>
        </div>

        <div className="grid lg:grid-cols-2 grid-cols-1 gap-6 mt-6">
          {loading ? (
            <div className="min-h-[200px] flex items-center justify-center">
              <LoadingSpinner />
            </div>
          ) : error ? (
            <ErrorStatus
              message={JSON.stringify(error?.message)}
              statusCode={error?.status_code || error?.status}
              link="/user/product/categories"
              reload
            />
          ) : (
            <div className=" space-y-4">
              {del_addresses?.data?.map((item, index) => (
                <div key={index} className="">
                  <div className="border border-gray-200 rounded-xl  ">
                    <div className="flex items-center justify-between p-4 py-5 rounded-t-xl border-b bg-white">
                      <div className=" flex items-center gap-2">
                        <div className="font-medium text-gray-900 font-lg">
                          Delivery Details
                        </div>
                      </div>
                      <div className=" flex items-center gap-2">
                        <div
                          onClick={() => editTagData(item?.id)}
                          className=" cursor-pointer size-9 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center bg-red-600/5 hover:bg-orange-600 text-orange-600 hover:text-white rounded-full"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-edit size-4"
                          >
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                        </div>

                        <div
                          onClick={() => deletetaHandler(item?.id)}
                          className=" cursor-pointer size-9 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center bg-red-600/5 hover:bg-red-600 text-red-600 hover:text-white rounded-full"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-trash-2 h-4 w-4"
                          >
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                            <line x1={10} y1={11} x2={10} y2={17} />
                            <line x1={14} y1={11} x2={14} y2={17} />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className=" space-y-2">
                      <div className="  px-6 pt-4 last:pb-4  text-sm flex items-center justify-between w-full">
                        <div className=" flex-col items-start gap-2">
                          <div className="  text-gray-500 text-xs">State</div>
                          <div className="font-medium text-lg text-gray-900 ">
                            {item?.state}
                          </div>
                        </div>
                      </div>

                      <div className="  px-6 pt-4 last:pb-4  text-sm flex items-center justify-between w-full">
                        <div className=" flex-col items-start gap-2">
                          <div className="  text-gray-500 text-xs">City</div>
                          <div className="font-medium text-lg text-gray-900 ">
                            {item?.city}
                          </div>
                        </div>
                      </div>
                      <div className="  px-6 pt-4 last:pb-4  text-sm flex items-center justify-between w-full">
                        <div className=" flex-col items-start gap-2">
                          <div className="  text-gray-500 text-xs">Address</div>
                          <div className="font-medium text-lg text-gray-900 ">
                            {item?.address}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="w-full h-full ">
            <div className="flex flex-col justify-center items-center border border-dashed border-black/30 rounded-lg py-12 p-9">
              <div className="size-[95px] rounded-full bg-primary-800 flex items-center justify-center ">
                <svg
                  className="fill-white"
                  id="Line"
                  height={50}
                  viewBox="0 0 64 64"
                  width={50}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="m59.28775 26.0578-7.30176-6.251v-11.72068a.99973.99973 0 0 0 -1-1h-7.46a.99974.99974 0 0 0 -1 1v3.60693l-7.2109-6.17675a5.07688 5.07688 0 0 0 -6.6416 0l-23.97314 20.54345a2.04251 2.04251 0 0 0 1.32226 3.56787h5.98047v18.92188a8.60569 8.60569 0 0 0 8.59082 8.60059h10.481a1.00019 1.00019 0 0 0 -.00006-2h-10.48094a6.60308 6.60308 0 0 1 -6.59082-6.60059v-19.92188a1.00005 1.00005 0 0 0 -1-1l-6.99951-.05078 23.97119-20.542a3.08781 3.08781 0 0 1 4.03955 0l8.86133 7.59082a1.00655 1.00655 0 0 0 1.65039-.75934v-4.7802h5.46v11.18066a1.00013 1.00013 0 0 0 .34961.75928l7.63184 6.60156h-6.98148a.99974.99974 0 0 0 -1 1v3.7002a1.00019 1.00019 0 0 0 2-.00006v-2.70014h5.98145a2.03152 2.03152 0 0 0 1.32031-3.56982z" />
                  <path d="m43.99564 33.718a13.00122 13.00122 0 0 0 .00012 26.00244c17.24786-.71391 17.24231-25.29106-.00012-26.00244zm.00012 24.00244c-14.59461-.60394-14.58984-21.40082.00006-22.00244a11.00122 11.00122 0 0 1 -.00006 22.00244z" />
                  <path d="m49.001 45.71942h-4v-4.00049a1.00019 1.00019 0 0 0 -2 0v4.00049h-4a1.00019 1.00019 0 0 0 .00006 2h3.99994v4a1 1 0 0 0 2 0v-4h4a1 1 0 0 0 0-2z" />
                </svg>
              </div>
              <h4 className="mb-4 text-lg pt-2 font-semibold text-gray-700">
                Add New Delivery Address
              </h4>

              <Button
                onClick={() => setOpenCreateAddress(true)}
                className="w-36 justify-center"
              >
                Create
              </Button>
            </div>
          </div>
        </div>

        {/* <div className="w-full pt-6">
          <div className="flex flex-col justify-center items-center border border-dashed border-black/30 rounded-lg p-9">
            <div className="size-[95px] rounded-full bg-primary-800 flex items-center justify-center mb-3.6">
              <svg
                className="fill-white"
                id="Line"
                height={50}
                viewBox="0 0 64 64"
                width={50}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="m59.28775 26.0578-7.30176-6.251v-11.72068a.99973.99973 0 0 0 -1-1h-7.46a.99974.99974 0 0 0 -1 1v3.60693l-7.2109-6.17675a5.07688 5.07688 0 0 0 -6.6416 0l-23.97314 20.54345a2.04251 2.04251 0 0 0 1.32226 3.56787h5.98047v18.92188a8.60569 8.60569 0 0 0 8.59082 8.60059h10.481a1.00019 1.00019 0 0 0 -.00006-2h-10.48094a6.60308 6.60308 0 0 1 -6.59082-6.60059v-19.92188a1.00005 1.00005 0 0 0 -1-1l-6.99951-.05078 23.97119-20.542a3.08781 3.08781 0 0 1 4.03955 0l8.86133 7.59082a1.00655 1.00655 0 0 0 1.65039-.75934v-4.7802h5.46v11.18066a1.00013 1.00013 0 0 0 .34961.75928l7.63184 6.60156h-6.98148a.99974.99974 0 0 0 -1 1v3.7002a1.00019 1.00019 0 0 0 2-.00006v-2.70014h5.98145a2.03152 2.03152 0 0 0 1.32031-3.56982z" />
                <path d="m43.99564 33.718a13.00122 13.00122 0 0 0 .00012 26.00244c17.24786-.71391 17.24231-25.29106-.00012-26.00244zm.00012 24.00244c-14.59461-.60394-14.58984-21.40082.00006-22.00244a11.00122 11.00122 0 0 1 -.00006 22.00244z" />
                <path d="m49.001 45.71942h-4v-4.00049a1.00019 1.00019 0 0 0 -2 0v4.00049h-4a1.00019 1.00019 0 0 0 .00006 2h3.99994v4a1 1 0 0 0 2 0v-4h4a1 1 0 0 0 0-2z" />
              </svg>
            </div>
            <h4 className="mb-4 text-lg pt-2 font-bold">
              Add New Delivery Address
            </h4>
            <button className="btn py-3 max-sm:px-6 text-base max-sm:text-sm font-Lufga inline-block font-medium leading-[1.2] border border-primary bg-primary-800 text-white rounded-xl duration-700 relative overflow-hidden px-12">
              Create
            </button>
          </div>
        </div> */}
      </div>

      {openCreateAddress && (
        <CreateAddressModal setOpenModal={setOpenCreateAddress} />
      )}

      {/* {viewTag && (
        <ViewTagModal
          setOpenModal={setViewTag}
          tagData={tag?.data}
          loading={loading}
        />
      )} */}

      <div>
        {editAddress && (
          <div>
            {loading ? (
              <div className="min-h-[400px] flex items-center justify-center">
                {/* <Spinner /> */}
                ...
              </div>
            ) : (
              <EditAddressModal
                setOpenModal={setEditAddress}
                addressData={del_address?.data}
              />
            )}
          </div>
        )}
      </div>

      {deleteAddressData && (
        <>
          <Notification
            message="Are you sure you want to delete this delivery address?"
            type="warning"
            onCancel={() => setDeleteAddressData(false)}
            onApprove={() => {
              handleDelete(del_address?.data);
              setDeleteAddressData(false);
            }}
          />
        </>
      )}
    </div>
  );
};

export default DeliveryAddress;

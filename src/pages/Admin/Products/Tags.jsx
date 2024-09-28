/* eslint-disable no-unused-vars */
// import { Link } from "react-router-dom";
import { Button } from "../../../components/forms/Button";
import { Badge } from "../../../components/forms/Badge";

import {
  ArrowDown,
  DeleteIcon,
  EditIcon,
  EyeIconBold,
  FilterIcon,
  PlusIcon,
  SearchIcon,
} from "../../../assets/SvgIcons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ErrorStatus from "src/components/ui/ErrorStatus";
import LoadingSpinner from "src/components/Loading/LoadingSpinner";
import { formatDate } from "src/utils/constant";
import { fetchTag, fetchTags, deleteTag } from "../../../Redux/tags/tagsThunk";
import Notification from "../../../components/forms/Notification";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { formatDateTime } from "../../../lib/constants";
import CreateTagModal from "../../../components/Modals/CreateTagModal";
import ViewTagModal from "../../../components/Modals/ViewTagModal";
import EditTagModal from "../../../components/Modals/EditTagModal";

const Tags = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openCreateTag, setOpenCreateTag] = useState(false);
  const [viewTag, setViewTag] = useState(false);
  const [editTag, setEditTag] = useState(false);
  const [deleteTagData, setDeleteTagData] = useState(false);

  const { tags, tag, loading, error } = useSelector((state) => state.tags);
  // console.log("categories", categories);

  const fetchTagsHandler = () => {
    dispatch(fetchTags());
  };
  useEffect(() => {
    fetchTagsHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const checkDetail = async (data) => {
    try {
      navigate(`/admin/product/categories/update/${data.id}`);
    } catch (error) {
      console.error("Error navigating to product details:", error);
    }
  };

  const viewTagDetails = (tag_id) => {
    dispatch(fetchTag(tag_id));
    setViewTag(true);
  };

  const editTagData = (tag_id) => {
    dispatch(fetchTag(tag_id));
    setEditTag(true);
  };

  const deletetaHandler = (cat_id) => {
    dispatch(fetchTag(cat_id));
    setDeleteTagData(true);
  };

  const handleDelete = async (tag) => {
    // console.log("tag is here", tag);
    if (tag) {
      // Handle delete tag logic here
      try {
        // setLoading(true);
        dispatch(deleteTag(tag?.id));
        navigate("/admin/product/tags");
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
        setDeleteTagData(false);
      }
    }
  };
  const headerDatas = {
    tableHeadings: [
      "S/N",
      "Tag Name",
      "Status",
      // "Selling Price",
      // "Available QTY",
      "Created Date ",
      "Updated Date ",

      "Action",
    ],
  };
  return (
    <>
      <div className="p-4 ">
        <div className=" flex items-center justify-between ">
          <div className="pb-4 pt-1">
            <h1 className=" text-xl font-semibold text-gray-900 pb-1.5">
              Tags
            </h1>
            <h5 className="text-gray-500 text-sm font-normal max-w-lg">
              Add or remove keywords (tags) corresponding to each product
            </h5>
          </div>
          <div className="flex items-center gap-3">
            {/* <Link to="/admin/product/categories/create"> */}
            <Button
              onClick={() => setOpenCreateTag(true)}
              leftIcon={<PlusIcon />}
            >
              Create Tag
            </Button>
            {/* </Link> */}
          </div>
        </div>

        <div className="border border-gray-200 rounded-xl ">
          <div className="flex items-center justify-between p-4 rounded-t-xl border-b bg-white">
            <div className="font-normal text-gray-600 text-xs">
              Showing 1 to 10 of 990 Products
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
                    placeholder="Search Tags Name"
                    required=""
                  />
                </div>
              </form>
              {/* <Button outline color="gray" size="md" leftIcon={<FilterIcon />}>
                Filter
              </Button> */}
            </div>
          </div>

          <>
            {loading ? (
              <div className="min-h-[200px] flex items-center justify-center">
                <LoadingSpinner />
              </div>
            ) : error ? (
              <ErrorStatus
                message={JSON.stringify(error?.message)}
                statusCode={error?.status_code || error?.status}
                link="/admin/product/categories"
                reload
              />
            ) : (
              <div className="relative overflow-x-auto shadow sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-600 ">
                  <thead className=" text-gray-700 bg-gray-100 ">
                    <tr className="font-Inter ">
                      {headerDatas.tableHeadings.map(
                        (heading, headingIndex) => (
                          <th
                            key={headingIndex}
                            scope="col"
                            className="px-6 py-4 whitespace-nowrap font-Inter text-xs font-semibold"
                          >
                            {heading}
                          </th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {tags?.data?.map((item, rowIndex) => (
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
                          <Badge
                            rounded
                            text={item?.status === 1 ? "Active" : "In-Active"}
                            color={item?.status === 1 ? "success" : "warning"}
                            className=" capitalize"
                          />
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap">
                          {formatDate(item?.created_at)}
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap">
                          {formatDateTime(item?.updated_at)}
                        </td>

                        {/* <td className="px-6 py-5 whitespace-nowrap">
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
                        </td> */}
                        <td className="px-6 py-5 whitespace-nowrap">
                          <div className=" flex items-center gap-4">
                            <div
                              className="cursor-pointer "
                              onClick={() => viewTagDetails(item?.id)}
                            >
                              <EyeIconBold />
                            </div>
                            <div
                              className="cursor-pointer "
                              onClick={() => editTagData(item?.id)}
                            >
                              <EditIcon />
                            </div>
                            <div
                              className="cursor-pointer pl-2"
                              onClick={() => deletetaHandler(item?.id)}
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

            {/* <div className="py-10 px-4">
          {transactions.length !== 0 && (
            <Pagination
              meta={transactions?.data}
              handlePaginate={handlePaginate}
            />
          )}
        </div> */}
          </>
        </div>
        <div className="flex items-center justify-between py-10">
          {/* Previous Button */}
          <a
            href="#"
            className="flex items-center justify-center px-3 h-8 me-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <svg
              className="w-3.5 h-3.5 me-2 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 5H1m0 0 4 4M1 5l4-4"
              />
            </svg>
            Previous
          </a>

          <nav aria-label="Page navigation example">
            <ul className="inline-flex -space-x-px text-sm">
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  1
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  2
                </a>
              </li>
              <li>
                <a
                  href="#"
                  aria-current="page"
                  className="flex items-center justify-center px-3 h-8 text-primary-700 border border-gray-300 bg-primary-50/50 hover:bg-primary-100 hover:text-primary-800 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                >
                  3
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  4
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  5
                </a>
              </li>
            </ul>
          </nav>

          <a
            href="#"
            className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Next
            <svg
              className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </a>
        </div>
      </div>

      {openCreateTag && <CreateTagModal setOpenModal={setOpenCreateTag} />}

      {viewTag && (
        <ViewTagModal
          setOpenModal={setViewTag}
          tagData={tag?.data}
          loading={loading}
        />
      )}

      <div>
        {editTag && (
          <div>
            {loading ? (
              <div className="min-h-[400px] flex items-center justify-center">
                {/* <Spinner /> */}
                ...
              </div>
            ) : (
              <EditTagModal setOpenModal={setEditTag} tagData={tag?.data} />
            )}
          </div>
        )}
      </div>

      {deleteTagData && (
        <>
          <Notification
            message="Are you sure you want to delete this tag?"
            type="warning"
            onCancel={() => setDeleteTagData(false)}
            onApprove={() => {
              handleDelete(tag?.data);
              setDeleteTagData(false);
            }}
          />
        </>
      )}
    </>
  );
};

export default Tags;

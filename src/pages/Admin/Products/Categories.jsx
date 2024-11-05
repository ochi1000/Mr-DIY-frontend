/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
// import { Link } from "react-router-dom";
import { Button } from "../../../components/forms/Button";
import { Badge } from "../../../components/forms/Badge";
import Pagination from "../../../components/forms/Pagination";

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
import { fetchProducts } from "../../../Redux/products/productsThunk";
import ErrorStatus from "src/components/ui/ErrorStatus";
import LoadingSpinner from "src/components/Loading/LoadingSpinner";
import { formatDate } from "src/utils/constant";
import {
  fetchCategory,
  fetchCategorys,
  deleteCategory,
} from "../../../Redux/category/categoriesThunk";
import AddCategoryModal from "../../../components/Modals/AddCategoryModal";
import EditCategoryModal from "../../../components/Modals/EditCategoryModal";
import Notification from "../../../components/forms/Notification";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Categories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openCreateCategory, setOpenCreateCategory] = useState(false);
  const [editCategory, setEditCategory] = useState(false);
  const [deleteCategoryData, setDeleteCategoryData] = useState(false);

  const { categories, category, loading, error } = useSelector(
    (state) => state.category
  );

  // console.log("categories", categories);

  const fetchCategorysHandler = (url) => {
    dispatch(fetchCategorys(url));
  };
  useEffect(() => {
    fetchCategorysHandler("admin/category");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const checkDetail = async (data) => {
    try {
      navigate(`/admin/product/categories/update/${data.id}`);
    } catch (error) {
      console.error("Error navigating to product details:", error);
    }
  };
  // const editCategoryData = (cat_id) => {
  //   dispatch(fetchCategory(cat_id));
  //   setEditCategory(true);
  // };
  const handlePaginate = (url) => {
    if (url) {
      fetchCategorysHandler(url);
    }
  };
  const deleteCategoryHandler = (cat_id) => {
    dispatch(fetchCategory(cat_id));
    setDeleteCategoryData(true);
  };

  const handleDelete = async (category) => {
    // console.log("coupon is here", coupon);
    if (category) {
      // Handle delete category logic here
      try {
        // setLoading(true);
        dispatch(deleteCategory(category?.id));
        navigate("/admin/product/categories");
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
        setDeleteCategoryData(false);
      }
    }
  };
  const Headings = {
    tableHeadings: [
      "S/N",
      <div className="flex items-center gap-4">
        <p className=" whitespace-nowrap font-Inter text-sm font-semibold">
          Categories
        </p>
        <div className=" flex gap-1">
          <ArrowDown className="cursor-pointer" />
          <ArrowDown className="cursor-pointer rotate-180" />
        </div>
      </div>,
      "Description",
      // "Available QTY",
      // "Created Date ",

      "Status",
      "Action",
    ],
  };
  return (
    <>
      <div className="p-4 ">
        <div className=" flex items-center justify-between ">
          <div className="pb-4 pt-1">
            <h1 className=" text-xl font-semibold text-gray-900 pb-1.5">
              Categories
            </h1>
            <h5 className="text-gray-500 text-sm font-normal max-w-lg">
              Set up categories to group similar products together at the front
              end, and make the product search easier for buyers
            </h5>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/admin/product/categories/create">
              <Button
                // onClick={() => setOpenCreateCategory(true)}
                leftIcon={<PlusIcon />}
              >
                Add New Category
              </Button>
            </Link>
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
                {/* <div className="font-Inter  text-gray-700 bg-gray-100">
                  <div className="px-6 py-4  flex items-center w-full">
                    <div className="flex items-center gap-4 w-[85%]">
                      <p className=" whitespace-nowrap font-Inter text-sm font-semibold">
                        Categories
                      </p>
                      <div className=" flex gap-1">
                        <ArrowDown className="cursor-pointer" />
                        <ArrowDown className="cursor-pointer rotate-180" />
                      </div>
                    </div>
                    <div className="w-[10%]">
                      <p className=" whitespace-nowrap font-Inter text-sm font-semibold">
                        Status
                      </p>
                    </div>
                  </div>
                </div>
                <div className="">
                  {categories?.data?.map((item, rowIndex) => (
                    <div
                      key={rowIndex}
                      className="flex items-center w-full p-4 lg:p-6 py-6 border-b last:border-none "
                    >
                      <div className=" flex items-center gap-2 w-[85%]">
                        <PlusIcon />
                        <p className=" capitalize truncate">{item?.name}</p>
                      </div>
                      <div className=" w-[15%] flex items-center gap-6 justify-between">
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
                        <div className=" flex items-center gap-6 pr-10">
                          <div
                            className="cursor-pointer "
                            onClick={() => checkDetail(item)}
                          >
                            <EditIcon />
                          </div>
                          <div
                            className="cursor-pointer "
                            onClick={() => deleteCategoryHandler(item.id)}
                          >
                            <DeleteIcon className="text-red-600 w-6 h-6" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div> */}

                <div className="relative overflow-x-auto shadow sm:rounded-lg  ">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-600 ">
                    <thead className="text-xs text-gray-700 bg-gray-100 ">
                      <tr className="font-Inter">
                        {Headings.tableHeadings.map((heading, headingIndex) => (
                          <th
                            key={headingIndex}
                            scope="col"
                            className="px-6 py-4 whitespace-nowrap uppercase font-Inter"
                          >
                            {heading}
                          </th>
                        ))}
                      </tr>
                    </thead>

                    {categories?.data?.length === 0 ? (
                      <tbody>
                        <tr>
                          <td colSpan={100} className="">
                            <div className="flex gap-5 flex-col items-center justify-center py-40">
                              {/* <img src={AssignEmpty} alt="" /> */}

                              <p className="text-2xl font-medium font-gray-600">
                                No Categories Found
                              </p>
                              <Button
                                className="w-48 justify-center"
                                // onClick={() => {
                                //   setSearchQuery("");
                                //   fetchFeatureHandler(
                                //     "bookacrib-api-routes/v1/features/list-features"
                                //   );
                                // }}
                              >
                                Go Back
                              </Button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    ) : (
                      <tbody>
                        {categories?.data?.map((item, rowIndex) => (
                          <tr
                            key={rowIndex}
                            className="bg-white border-b text-gray-400  hover:bg-gray-50 [&_tr:last-child]:border-0 font-Inter"
                          >
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium whitespace-nowrap "
                            >
                              {rowIndex + 1}
                            </th>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                              <div className=" flex items-center gap-2 w-[85%]">
                                <PlusIcon />
                                <p className=" capitalize truncate">
                                  {item?.name}
                                </p>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {item?.description}
                            </td>

                            {/* <td className="px-6 py-4 whitespace-nowrap">
                             
                             
                            </td> */}
                            <td className="px-6 py-4 whitespace-nowrap">
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

                            <td
                              // onClick={() => checkUserDetail(item)}
                              className="px-6 py-4 whitespace-nowrap "
                            >
                              <div className=" flex items-center gap-6 pr-10">
                                <div
                                  className="cursor-pointer "
                                  onClick={() => checkDetail(item)}
                                >
                                  <EditIcon />
                                </div>
                                <div
                                  className="cursor-pointer "
                                  onClick={() => deleteCategoryHandler(item.id)}
                                >
                                  <DeleteIcon className="text-red-600 w-6 h-6" />
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    )}
                  </table>
                </div>
              </div>
            )}
          </>
        </div>
        <div className="py-5">
          {categories.length !== 0 && (
            <Pagination
              meta={categories.meta}
              handlePaginate={handlePaginate}
            />
          )}
        </div>
      </div>

      {openCreateCategory && (
        <AddCategoryModal setOpenModal={setOpenCreateCategory} />
      )}

      <div>
        {editCategory && (
          <div>
            {loading ? (
              <div className="min-h-[400px] flex items-center justify-center">
                {/* <Spinner /> */}
                ...
              </div>
            ) : (
              <EditCategoryModal
                setOpenModal={setEditCategory}
                categoryData={category?.data}
                loading={loading}
              />
            )}
          </div>
        )}
      </div>

      {deleteCategoryData && (
        <>
          <Notification
            message="Are you sure you want to delete this category?"
            type="warning"
            onCancel={() => setDeleteCategoryData(false)}
            onApprove={() => {
              handleDelete(category?.data);
              setDeleteCategoryData(false);
            }}
          />
        </>
      )}
    </>
  );
};

export default Categories;

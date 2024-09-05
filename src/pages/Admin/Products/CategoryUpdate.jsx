import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "../../../components/forms/Button";
import { LeftArrowIcons, PlusIcon } from "../../../assets/SvgIcons";
import { Input } from "../../../components/forms/Input";
import { TextArea } from "../../../components/forms/TextArea";
import HookForm from "../../../components/forms/Form";
import { categorySchema } from "src/schema/categorySchema";

import { useDispatch, useSelector } from "react-redux";

import {
  addNewCategory,
  fetchCategory,
  fetchCategorys,
} from "../../../Redux/category/categoriesThunk";
import { Label } from "../../../components/forms/Label";
import { useEffect } from "react";
import LoadingSpinner from "../../../components/Loading/LoadingSpinner";
import ErrorStatus from "src/components/ui/ErrorStatus";

const CategoryUpdate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { category, loading, error } = useSelector((state) => state.category);

  console.log("single category", category);

  useEffect(() => {
    dispatch(fetchCategory(id));
  }, [id, dispatch]);
  const defaultFormValue = {
    description: category?.data?.description,
    name: category?.data?.name,
  };
  const onSubmit = (data) => {
    const filteredFormData = {
      description: data?.description,
      name: data?.name,
    };

    console.log("filtered data", filteredFormData);
    dispatch(addNewCategory(filteredFormData));
    // alert(JSON.stringify(filteredFormData));

    // setOpenModal(false);
    dispatch(fetchCategorys());
    navigate("/admin/product/categories");
  };

  return (
    <div className="p-4">
      <div className=" flex items-center justify-between  pt-4 pb-8">
        <div className="flex items-center gap-3">
          <Link to="/admin/product/categories">
            <Button size="sm" outline color="gray">
              <LeftArrowIcons className="w-6 h-6" />
            </Button>
          </Link>
          <div className="">
            <h1 className=" text-2xl font-semibold text-gray-900 pb-1.5">
              Edit Category
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
            link="/admin/product/categories"
          />
        </div>
      ) : (
        <div className="relative p-4 w-full mx-auto  max-w-4xl max-h-full">
          <HookForm
            defaultValues={defaultFormValue}
            onSubmit={onSubmit}
            schema={categorySchema}
          >
            <div className="relative bg-white h-full rounded-xl shadow ">
              <div className="flex items-center justify-between p-4 md:px-5 border-b rounded-t ">
                <div>
                  <h1 className="text-lg font-semibold text-gray-900 ">
                    Update Category
                  </h1>
                </div>
                {/* <CloseModal setOpenModal={setOpenModal} /> */}
              </div>
              {/* contents below */}
              <div className=" h-[82vh]">
                {/* <ScrollArea className="h-full"> */}
                <div className="p-5">
                  <div className="">
                    <div className="">
                      <Input
                        name="name"
                        label="Category Name"
                        placeholder="Enter a category name"
                      />
                    </div>
                    <TextArea
                      name="description"
                      label="Description"
                      placholder="Enter a category description"
                    />

                    <Label text="Add Sub Category" />
                    <div className=" text-gray-600 text-sm px-4 pr-10 py-3 mt-2 mb-4 bg-gray-100 border-b flex items-center justify-between">
                      <p>Sub Category</p>
                      <p>Action</p>
                    </div>
                    <div className=" flex items-center justify-center w-full gap-6">
                      <div className=" w-[85%]">
                        <Input
                          name="starting_cost"
                          // label="Create New Sub-Category"
                          placeholder="Create New Sub-Category"
                          className=""
                        />
                      </div>
                      <div className="w-[15%] mb-6">
                        <Button size="md" outline color="gray">
                          <PlusIcon className="w-7 h-7" />
                        </Button>
                      </div>
                    </div>
                    <div className="border rounded-xl mt-2 mb-6 p-4 w-full flex items-center justify-between ">
                      <p className=" font-semibold text-gray-700">
                        Feature as Top Categories
                      </p>
                      <div className="text-sm  text-gray-600 ">
                        <label className="inline-flex items-center cursor-pointer ">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            value=""
                            defaultChecked
                          />
                          <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-primary-700"></div>
                        </label>
                      </div>
                    </div>
                    <div className="border rounded-xl p-4 w-full flex items-center justify-between ">
                      <p className=" font-semibold text-gray-700">
                        Publish Category
                      </p>
                      <div className="text-sm  text-gray-600 ">
                        <label className="inline-flex items-center cursor-pointer ">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            value=""
                            defaultChecked
                          />
                          <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-primary-700"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                {/* </ScrollArea> */}
              </div>

              <div className="p-4 border-t">
                <div className="flex items-center gap-2 justify-end">
                  <Button type="submit" size="xs">
                    Update Category
                  </Button>
                </div>
              </div>
            </div>
          </HookForm>
        </div>
      )}
    </div>
  );
};

export default CategoryUpdate;

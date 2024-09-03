// import { ScrollArea } from "src/components/forms/scroll-area";
import { Button } from "src/components/forms/Button";
import HookForm from "src/components/forms/Form";
// import { Input } from "components/UI/Form/Input";
import { Input } from "src/components/forms/Input";
import { TextArea } from "src/components/forms/TextArea";

import { useNavigate } from "react-router-dom";

import { categorySchema } from "src/schema/categorySchema";
import CloseModal from "./CloseModal";
import { Label } from "../forms/Label";
import { PlusIcon } from "../../assets/SvgIcons";

import { useDispatch } from "react-redux";
import {
  addNewCategory,
  fetchCategorys,
} from "../../Redux/category/categoriesThunk";

// eslint-disable-next-line react/prop-types
const AddCategoryModal = ({ setOpenModal }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const defaultFormValue = {
    description: "",
    name: "",
  };
  const onSubmit = (data) => {
    const filteredFormData = {
      description: data?.description,
      name: data?.name,
    };

    console.log("filtered data", filteredFormData);
    dispatch(addNewCategory(filteredFormData));
    // alert(JSON.stringify(filteredFormData));

    setOpenModal(false);
    dispatch(fetchCategorys());
    navigate("/product/categories");
  };

  return (
    <div className="w-full h-full fixed inset-0 bg-black/70 z-50 bg-opacity-50 backdrop-blur">
      <div
        aria-hidden="true"
        className=" overflow-y-auto overflow-x-hidden z-50 flex justify-end items-center w-full  h-[calc(100%-1rem)]  max-h-full "
      >
        <div className="relative p-4 w-full   max-w-2xl max-h-full">
          <HookForm
            defaultValues={defaultFormValue}
            onSubmit={onSubmit}
            schema={categorySchema}
          >
            <div className="relative bg-white h-[96vh] rounded-xl shadow ">
              <div className="flex items-center justify-between p-4 md:px-5 border-b rounded-t ">
                <div>
                  <h1 className="text-lg font-semibold text-gray-900 ">
                    Create New Category
                  </h1>
                </div>
                <CloseModal setOpenModal={setOpenModal} />
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
                    Save Category
                  </Button>
                </div>
              </div>
            </div>
          </HookForm>
        </div>
      </div>
    </div>
  );
};

export default AddCategoryModal;

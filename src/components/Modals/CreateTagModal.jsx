// import { ScrollArea } from "src/components/forms/scroll-area";
import { Button } from "src/components/forms/Button";
import HookForm from "src/components/forms/Form";

import { Input } from "src/components/forms/Input";
// import { TextArea } from "src/components/forms/TextArea";

import { useNavigate } from "react-router-dom";

import { tagSchema } from "src/schema/categorySchema";
import CloseModal from "./CloseModal";

import { useDispatch } from "react-redux";
import { addNewTag, fetchTags } from "../../Redux/tags/tagsThunk";
import toast from "react-hot-toast";

// eslint-disable-next-line react/prop-types
const CreateTagModal = ({ setOpenModal }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const defaultFormValue = {
    description: "",
    name: "",
  };
  const onSubmit = async (data) => {
    // const filteredFormData = {
    //   description: data?.description,
    //   name: data?.name,
    // };

    // console.log("filtered data", filteredFormData);
    // dispatch(addNewTag(data));
    // // alert(JSON.stringify(filteredFormData));

    // setOpenModal(false);
    // dispatch(fetchTags());
    // navigate("/admin/product/tags");

    try {
      const result = await dispatch(addNewTag(data)).unwrap();
      // console.log("add tag:", result);
      if (result.status >= 200 && result.status <= 300) {
        toast.success(result?.message);
        navigate("/admin/product/tags");
        dispatch(fetchTags());
      }
    } catch (error) {
      if (error?.status >= 400 && error?.status <= 499) {
        // const errorMessages = Object.values(error?.errors).flat().join(", ");
        toast.error(error.message, { duration: 6000 });
      }
    }
    setOpenModal(false);
  };

  return (
    <div className="w-full h-full fixed inset-0 bg-black/70 z-50 bg-opacity-50 ">
      <div
        aria-hidden="true"
        className=" overflow-y-auto overflow-x-hidden z-50 flex justify-end items-center w-full  h-full  max-h-full "
      >
        <div className="relative p-4 w-full   max-w-lg max-h-full">
          <HookForm
            defaultValues={defaultFormValue}
            onSubmit={onSubmit}
            schema={tagSchema}
          >
            <div className="relative bg-white h-[96vh] rounded-xl shadow ">
              <div className="flex items-center justify-between p-4 md:px-5 border-b rounded-t ">
                <div>
                  <h1 className="text-lg font-semibold text-gray-900 ">
                    Create New Tag
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
                        label="Tag Name"
                        placeholder="Enter a tag name"
                      />
                    </div>
                    {/* <TextArea
                      name="description"
                      label="Description"
                      placholder="Enter a category description"
                    /> */}
                  </div>
                </div>
                {/* </ScrollArea> */}
                <div className="p-4 border-t">
                  <div className="flex items-center gap-2 justify-end">
                    <Button type="submit" size="xs">
                      Save Tag
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </HookForm>
        </div>
      </div>
    </div>
  );
};

export default CreateTagModal;

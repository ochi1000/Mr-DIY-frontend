// import { ScrollArea } from "src/components/forms/scroll-area";
import { Button } from "src/components/forms/Button";
import HookForm from "src/components/forms/Form";

import { Input } from "src/components/forms/Input";
import { Toggle } from "src/components/forms/Toggle";
// import { TextArea } from "src/components/forms/TextArea";

import { useNavigate } from "react-router-dom";

import { attributeSchema } from "src/schema/categorySchema";
import CloseModal from "./CloseModal";

import { useDispatch } from "react-redux";
import {
  addNewAttribute,
  fetchAttributes,
} from "../../Redux/attributes/attributesThunk";
import toast from "react-hot-toast";

// eslint-disable-next-line react/prop-types
const CreateAttributesModal = ({ setOpenModal }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const defaultFormValue = {
    name: "",
  };
  const onSubmit = async (data) => {
    const filteredFormData = {
      name: data?.name,
      has_images: data?.has_images === true ? 1 : 0,
    };

    // console.log("filtered data", filteredFormData);
    // dispatch(addNewTag(data));
    // alert(JSON.stringify(data));

    // setOpenModal(false);
    // dispatch(fetchAttributes());
    // navigate("/admin/product/tags");

    try {
      const result = await dispatch(addNewAttribute(filteredFormData)).unwrap();
      // console.log("add Attribute:", result);
      if (result.status >= 200 && result.status <= 300) {
        toast.success(result?.message);
        navigate("/admin/product/attributes");
        dispatch(fetchAttributes());
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
            schema={attributeSchema}
          >
            <div className="relative bg-white h-[96vh] rounded-xl shadow ">
              <div className="flex items-center justify-between p-4 md:px-5 border-b rounded-t ">
                <div>
                  <h1 className="text-lg font-semibold text-gray-900 ">
                    Create Attribute
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
                        label="Attribute Name"
                        placeholder="Enter a attribute name"
                      />
                    </div>
                    <Toggle name="has_images" label="Has Images" />

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
                      Save Attribute
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

export default CreateAttributesModal;

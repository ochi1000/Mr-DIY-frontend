// import { ScrollArea } from "src/components/forms/scroll-area";
import { Button } from "src/components/forms/Button";
import HookForm from "src/components/forms/Form";

import { Input } from "src/components/forms/Input";
// import { Toggle } from "src/components/forms/Toggle";
// import { TextArea } from "src/components/forms/TextArea";

import { useNavigate } from "react-router-dom";

import CloseModal from "./CloseModal";

import { useDispatch } from "react-redux";

import toast from "react-hot-toast";
import { addressSchema } from "../../schema/productSchema";
import {
  addNewDeliveryAddress,
  fetchDeliveryAddresss,
} from "../../Redux/DeliveryAddress/deliveryAddressThunk";

// eslint-disable-next-line react/prop-types
const CreateAddressModal = ({ setOpenModal }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const defaultFormValue = {
    state: "",
    city: "",
    address: "",
  };
  const onSubmit = async (data) => {
    const filteredFormData = {
      state: data?.state,
      city: data?.city,
      address: data?.address,
    };

    // console.log("filtered data", filteredFormData);
    // dispatch(addNewTag(data));
    // alert(JSON.stringify(data));

    // setOpenModal(false);
    // dispatch(fetchAttributes());
    // navigate("/admin/product/tags");

    try {
      const result = await dispatch(
        addNewDeliveryAddress(filteredFormData)
      ).unwrap();
      // console.log("add Attribute:", result);
      if (result.status >= 200 && result.status <= 300) {
        toast.success(result?.message);
        navigate("/user/delivery-address");
        dispatch(fetchDeliveryAddresss());
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
            schema={addressSchema}
          >
            <div className="relative bg-white h-[96vh] rounded-xl shadow ">
              <div className="flex items-center justify-between p-4 md:px-5 border-b rounded-t ">
                <div>
                  <h1 className="text-lg font-semibold text-gray-900 ">
                    Create Delivery Address
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
                        name="state"
                        label="State"
                        placeholder="Enter a state"
                      />
                      <Input
                        name="city"
                        label="City"
                        placeholder="Enter a city"
                      />
                      <Input
                        name="address"
                        label="Address"
                        placeholder="Enter a address"
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
                      Save Address
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

export default CreateAddressModal;

/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  DeleteIcon,
  PlusIcon,
  UploadIconImage,
} from "../../../assets/SvgIcons";
import { getData } from "../../../utils/api";
import AsyncReactSelect from "../../../components/forms/Select/async-react-select";
import { Button } from "../../../components/forms/Button";
import { Tooltip } from "flowbite-react";
import { ImageModal } from "../../../components/forms/Upload/ImageUpload";

function ProductAttributes({
  attributes,
  setAttributes,
  updateDefaultAttribute,
}) {
  // const [attributes, setAttributes] = useState([]);

  // const [attributeId, setAttributeId] = useState("");

  const [value, setValue] = useState("");
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [storeAttribute, setStoreAttribute] = useState([]);
  const [showImageModal, setshowImageModal] = useState(false);
  const [getImagePreview, setGetImagePreview] = useState(null);

  // console.log("store attribute: ", storeAttribute);

  const getAttributes = (attribute_id) => {
    return storeAttribute?.filter(
      (attribute) => attribute?.id === attribute_id
    );
  };

  const [selectedAtrribute, setSelectedAtrribute] = useState(null);
  // console.log("selectedAtrribute: ", selectedAtrribute);

  const fetchProductAttrinutes = async () => {
    try {
      const response = await getData("admin/attribute");

      setStoreAttribute(response?.data);
      return response?.data;
    } catch (error) {
      const errorMessage = error;
      console.log("ERROR ATRRIBUTE", errorMessage);
      // return rejectWithValue(errorMessage?.response?.data);
    }
  };

  // console.log("ALL attributes: ", attributes);

  // const attributeName = getAttributes(selectedAtrribute?.id);
  // console.log("getAttribute:", attributeName[0]?.name);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAttribute = {
      attribute_id: selectedAtrribute?.id,
      value,
      imgs: images,
      // imgs: images.map((image) => image.name),
    };
    setAttributes([...attributes, newAttribute]);
    setSelectedAtrribute("");
    // setAttributeId("");
    setValue("");
    setImages([]);
    setPreviewImages([]);
  };

  const handleDelete = (index) => {
    const updatedAttributes = attributes.filter((attribute, i) => i !== index);
    setAttributes(updatedAttributes);
  };

  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    const imagePreviews = selectedImages.map((image) =>
      URL.createObjectURL(image)
    );
    setImages(selectedImages);
    setPreviewImages(imagePreviews);
  };

  const getSingleImage = (index) => {
    // const currentImage = images?.find(
    //   (_, indexImage) => indexImage === index
    // );
    const currentPreview = previewImages?.find(
      (_, indexImage) => indexImage === index
    );

    // setGetImage(currentImage);
    setGetImagePreview(currentPreview);

    // console.log("currentImage:", currentImage);
    setshowImageModal(true);
  };
  const deleteImage = (index) => {
    // setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setPreviewImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <>
      <div className=" flex items-start w-full gap-6">
        <div className="relative bg-white rounded-2xl shadow  lg:w-[70%]">
          <div className="flex items-center justify-between p-4 md:px-5 border-b rounded-t ">
            <div>
              <h1 className="text-lg font-semibold text-gray-900 ">
                Variants & Options
              </h1>
              <p className="text-gray-600 text-sm font-light">
                Customize the product variants, including size, color, etc
              </p>
            </div>
          </div>

          <div className="text-gray-600 text-sm px-4 py-3 mt-2 mb-4 bg-gray-100 border-b flex items-center">
            <p className="w-[45%]">Attribute</p>
            <p className="w-[45%]">Attribute Values</p>
            <p className="w-[10%]">Action</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="pl-5">
              <div className=" flex items-center justify-center w-full gap-4 ">
                <div className=" w-[45%]">
                  <div className="pb-6">
                    <AsyncReactSelect
                      selectedValue={selectedAtrribute}
                      setSelectedValue={setSelectedAtrribute}
                      fetchData={fetchProductAttrinutes}
                      placeholder="Select an attribute"
                      label="Product Attributes"
                    />
                  </div>
                </div>
                <div className=" w-[45%]">
                  <div className="pb-4 w-full ">
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Enter Value
                    </label>
                    <input
                      id="value"
                      type="text"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-3 py-4 outline-none sm:text-sm"
                    />
                  </div>
                </div>

                <div className="w-[10%] pr-6 pt-2">
                  <Button size="sm" type="submit" outline color="gray">
                    <PlusIcon className="w-7 h-7" />
                  </Button>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full px-3 mb-6">
                  <label
                    className="block tracking-wide text-gray-700 text-sm font-medium mb-1.5"
                    htmlFor="images"
                  >
                    Attribute Images
                  </label>
                  <div className=" relative max-w-[150px] rounded-md border p-4">
                    <div className=" absolute inset-0">
                      <input
                        className="appearance-none block w-[150px] opacity-0 h-[150px] bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="images"
                        type="file"
                        multiple
                        onChange={handleImageChange}
                      />
                    </div>
                    <div className="text-center  flex flex-col items-center justify-center">
                      <div className=" pb-2">
                        <UploadIconImage />
                      </div>
                      <p className=" text-sm tracking-tighter text-gray-600 pb-2 ">
                        <span className="text-primary-700 font-semibold">
                          Click to upload
                        </span>{" "}
                        or drag and drop
                      </p>
                      <p className=" text-xs tracking-tighter text-gray-600 dark:text-gray-400">
                        SVG, PNG, JPG or GIF (max. 800x400px)
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4 my-4">
                    {previewImages.map((image, imageIndex) => (
                      <div
                        key={imageIndex}
                        className="group relative rounded border p-2 flex"
                      >
                        <img
                          className="rounded max-h-[140px] max-w-full"
                          src={image}
                          alt="image-2"
                        />
                        <div className="absolute inset-2 bg-gray-900/[.7] group-hover:flex hidden text-xl items-center justify-center">
                          <span
                            className="text-gray-100 hover:text-gray-300 cursor-pointer p-1.5"
                            onClick={() => getSingleImage(imageIndex)}
                          >
                            <svg
                              stroke="currentColor"
                              fill="currentColor"
                              strokeWidth={0}
                              viewBox="0 0 20 20"
                              aria-hidden="true"
                              height="1em"
                              width="1em"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                              <path
                                fillRule="evenodd"
                                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                          <span
                            className="text-gray-100 hover:text-gray-300 cursor-pointer p-1.5"
                            onClick={() => deleteImage(imageIndex)}
                          >
                            <svg
                              stroke="currentColor"
                              fill="currentColor"
                              strokeWidth={0}
                              viewBox="0 0 20 20"
                              aria-hidden="true"
                              height="1em"
                              width="1em"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                        </div>
                      </div>
                    ))}
                    {/* {updateImages} */}
                  </div>

                  {/* <div className="flex flex-wrap">
                    {previewImages.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt="uploaded image"
                        className="w-20 h-20 object-cover mr-2 mt-2"
                      />
                    ))}
                  </div> */}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      {attributes.length !== 0 && (
        <div className=" p-4 bg-white rounded-md lg:w-[70%]">
          <div className="mt-4">
            <div className="mt-4">
              {attributes.map((attribute, index) => {
                const attributeName = getAttributes(attribute.attribute_id);
                // console.log("attributeName:", attributeName[0]?.name);
                return (
                  <div
                    key={index}
                    className="flex justify-between gap-4 items-center mb-2"
                  >
                    <div className="pb-4 w-full ">
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Enter Value
                      </label>
                      <input
                        id="value"
                        type="text"
                        disabled
                        placeholder={attributeName[0]?.name}
                        className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-3 py-4 outline-none sm:text-sm"
                      />
                    </div>
                    <div className="pb-4 w-full ">
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Enter Value
                      </label>
                      <input
                        id="value"
                        type="text"
                        disabled
                        placeholder={attribute.value}
                        className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-3 py-4 outline-none sm:text-sm"
                      />
                    </div>
                    <div className=" w-[15%]">
                      <span>
                        {/* {attributeName[0]?.name}: {attribute.value} */}(
                        {attribute.imgs.length} images)
                      </span>
                    </div>
                    <div className=" w-[10%]">
                      <Tooltip content="Remove Attribute">
                        <div
                          className="text-red-500 hover:text-red-700 cursor-pointer"
                          onClick={() => handleDelete(index)}
                        >
                          <DeleteIcon className="text-red-600 w-6 h-6" />
                        </div>
                      </Tooltip>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
      <div>{updateDefaultAttribute}</div>

      {showImageModal && (
        <ImageModal
          // getImage={getImage}
          getImagePreview={getImagePreview}
          setshowImageModal={setshowImageModal}
        />
      )}
    </>
  );
}

export default ProductAttributes;

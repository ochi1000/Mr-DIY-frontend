/* eslint-disable react/prop-types */
import { ScrollArea } from "src/components/forms/scroll-area.jsx";
import { formatDate } from "src/utils/constant";

import LoadingSpinner from "src/components/Loading/LoadingSpinner.jsx";
import CloseModal from "./CloseModal";
import { Button } from "../forms/Button";
import { Label } from "../forms/Label";
import { Badge } from "../forms/Badge";
import { DotIcon } from "../../assets/SvgIcons";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchCategorys } from "../../Redux/category/categoriesThunk";
import { formatDateTime } from "../../lib/constants";

const ViewTagModal = ({ setOpenModal, tagData, loading }) => {
  const dispatch = useDispatch();

  const fetchCategorysHandler = () => {
    dispatch(fetchCategorys());
  };
  useEffect(() => {
    fetchCategorysHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  // console.log("get cateeee", tagData);
  return (
    <div className="w-full h-full fixed inset-0 bg-black/70 z-50 bg-opacity-50 backdrop-blur">
      <div
        aria-hidden="true"
        className=" overflow-y-auto overflow-x-hidden z-50 flex justify-center items-center w-full  h-[calc(100%-1rem)] max-h-full "
      >
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          <div className="relative bg-white rounded-2xl shadow ">
            <div className="flex items-center justify-between p-4 md:px-5 border-b rounded-t ">
              <div>
                <h1 className="text-lg font-semibold text-gray-900 ">
                  Tag Details
                </h1>
              </div>
              <CloseModal setOpenModal={setOpenModal} />
            </div>
            {/* contents below */}
            <div className=" h-[300px] ">
              <ScrollArea className="h-full">
                {loading ? (
                  <div className="min-h-[400px] flex items-center justify-center">
                    <LoadingSpinner />
                  </div>
                ) : (
                  <div className="p-5 space-y-6 text-sm">
                    <div className=" space-y-1 flex items-center justify-between flex-wrap">
                      <Label text="Tag name" />
                      <p className="text-gray-900 text-base font-medium capitalize">
                        {tagData?.name}
                      </p>
                    </div>

                    <div className=" space-y-1 flex items-center justify-between flex-wrap">
                      <Label text="  Status" />
                      <div className=" whitespace-nowrap">
                        {tagData?.status === 1 ? (
                          <Badge
                            leftIcon={<DotIcon />}
                            rounded
                            color="success"
                            text="Active"
                          ></Badge>
                        ) : (
                          <Badge
                            leftIcon={<DotIcon />}
                            rounded
                            color="error"
                            text="In-Active"
                          ></Badge>
                        )}
                      </div>
                    </div>

                    {/* <div className=" space-y-1 flex items-center justify-between flex-wrap">
                      <Label text="Tags" />
                      <p className="text-gray-900  font-medium capitalize">
                        {tagData?.tags.length === 0 ? (
                          "No tags"
                        ) : (
                          <div>
                            {tagData?.tags?.map((tagItem, tagIndex) => (
                              <a
                                key={tagIndex}
                                href=""
                                className="group overflow-hidden flex justify-center items-center relative text-sm border border-purple/10 rounded-md py-1.5 before:inline-block before:absolute before:z-0 before:w-full before:h-full before:bg-primary-600 before:scale-x-0 group hover:before:scale-x-100 before:origin-right hover:before:origin-left before:transition-transform before:ease-out before:duration-300"
                              >
                                <span className="px-[18px] relative text-gray-700 text-xs font-medium z-20 transition-colors ease-in-out duration-300 group-hover:text-white">
                                  {tagItem}
                                </span>
                              </a>
                            ))}
                          </div>
                        )}
                      </p>
                    </div> */}

                    <div className=" space-y-1 flex items-center justify-between flex-wrap">
                      <Label text="Created Date" />
                      <p className="text-gray-900  font-medium">
                        {formatDate(tagData?.created_at)}
                      </p>
                    </div>
                    <div className=" space-y-1 flex items-center justify-between flex-wrap">
                      <Label text="Updated Date" />
                      <p className="text-gray-900  font-medium">
                        {formatDateTime(tagData?.updated_at)}
                      </p>
                    </div>
                  </div>
                )}
              </ScrollArea>
            </div>

            <div className="p-4 border-t">
              <div className="flex items-center gap-2 justify-end">
                <Button onClick={() => setOpenModal(false)} size="xs">
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTagModal;

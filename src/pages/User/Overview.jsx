import classNames from "classnames";
import { useState } from "react";
import EmptyStatus from "../../components/ui/EmptyStatus";
import SaveImage from "src/assets/images/No Saved.svg";
import ViewedImage from "src/assets/images/No Viewed.svg";
import SearchImage from "src/assets/images/No Search.svg";

const Overview = () => {
  const [detailsType, setDetailsType] = useState(0);
  const tabItems = [
    { id: 0, label: "Saved Items" },
    { id: 1, label: "Recently Viewed" },
    { id: 2, label: "Recently Searched" },
  ];
  return (
    <div className="p-4">
      <div className="">
        <div className=" flex items-center justify-between pb-4">
          <div className="pb-4 pt-1">
            <h1 className=" text-xl font-semibold text-gray-900 pb-1.5">
              {" "}
              User Overview
            </h1>
            <h5 className="text-gray-500 text-sm font-normal">
              Overview of the sales items, Recent view, Recent searched, etc
            </h5>
          </div>
          <div className="flex items-center gap-3"></div>
        </div>
        <div className="w-full ">
          <div className=" flex w-full overflow-auto mb-4 border-b gap-2 border-gray-200 ">
            {/* Map over the tabItems array to render the tab items */}
            {tabItems.map((item, index) => (
              <h4
                key={index}
                onClick={() => setDetailsType(item.id)}
                className={classNames(
                  "pb-3 px-2 text-sm font-medium cursor-pointer relative",
                  {
                    "border-b-[1.5px] border-primary-700 text-primary-700 font-semibold":
                      detailsType === item.id,
                  },
                  { "text-gray-500": detailsType !== item.id }
                )}
              >
                {item.label}
              </h4>
            ))}
          </div>
          <div className="">
            {detailsType === 0 && (
              <div className="">
                <EmptyStatus
                  image={SaveImage}
                  title="No saved items!"
                  message="You have not yet saved any items! All your saved items will appear here."
                  link="/user/dashboard"
                />
              </div>
            )}
            {detailsType === 1 && (
              <div className="">
                <EmptyStatus
                  image={ViewedImage}
                  title="No viewed items!"
                  message="You have not yet viewed any items! All your viewed items will appear here."
                  link="/user/dashboard"
                />
              </div>
            )}
            {detailsType === 2 && (
              <div className="">
                <EmptyStatus
                  image={SearchImage}
                  title="No searched items!"
                  message="You have not yet searched any items! All your searched items will appear here."
                  link="/user/dashboard"
                />
              </div>
            )}

            {/* Add conditions for rendering other tab contents based on detailsType */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;

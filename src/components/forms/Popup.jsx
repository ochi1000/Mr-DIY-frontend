import classNames from "classnames";

import PropTypes from "prop-types";

const Popup = ({ children, popUpClose, style, maxWidth = "max-w-xl" }) => {
  const handleClose = (event) => {
    event.stopPropagation(); // Prevent click event from bubbling up
    popUpClose(); // Close the popup
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 bg-opacity-50 z-50 backdrop-blur">
      <div
        className={classNames(
          "w-full h-auto max-h-full bg-white rounded-xl relative animate-fadeIn",
          maxWidth,
          style
        )}
      >
        <div
          onClick={handleClose}
          className="absolute top-4 right-4 cursor-pointer"
        >
          <button
            type="button"
            className="text-primary-600 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        <div className="w-full h-full p-1 overflow-hidden overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

Popup.propTypes = {
  children: PropTypes.any.isRequired,
  popUpClose: PropTypes.func.isRequired,
  style: PropTypes.string,
  maxWidth: PropTypes.string,
};

export default Popup;

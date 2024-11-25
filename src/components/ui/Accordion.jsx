/* eslint-disable react/prop-types */
import { useState } from "react";

const Accordion = ({ title, description, defaultState }) => {
  const [isOpen, setIsOpen] = useState(defaultState || false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="">
      <button
        onClick={toggleAccordion}
        className="flex items-center justify-between w-full px-4 py-2 font-medium text-left bg-slate-100/80 hover:bg-slate-200/60 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg focus:outline-none focus-visible:ring focus-visible:ring-slate-500 focus-visible:ring-opacity-75 "
        id="headlessui-disclosure-button-:rm:"
        type="button"
      >
        <span>{title}</span>
        <span className={`transform transition-transform `}>
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
              data-slot="icon"
              className="w-4 h-4 text-slate-600 dark:text-slate-400"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
              data-slot="icon"
              className="w-4 h-4 text-slate-600 dark:text-slate-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          )}
        </span>
      </button>

      {/* Accordion Content */}
      {isOpen && (
        // <div className="px-4 py-2 text-gray-600 bg-white border-t border-gray-300">
        //   {description}
        // </div>
        <div className="p-4 pt-3  text-slate-600 text-sm dark:text-slate-300 leading-6">
          {description}
        </div>
      )}
    </div>
  );
};
export default Accordion;

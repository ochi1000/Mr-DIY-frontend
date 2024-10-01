/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { useState } from "react";
import Select from "react-select";

// const fruits = [
//   { value: "chocolate", label: "Chocolate" },
//   { value: "strawberry", label: "Strawberry" },
//   { value: "vanilla", label: "Vanilla" },
//   { value: "orange", label: "Orange" },
//   { value: "apple", label: "Apple" },
// ];

const styles = {
  multiValue: (base, state) => {
    return state.data.isFixed ? { ...base, opacity: "0.5" } : base;
  },
  multiValueLabel: (base, state) => {
    return state.data.isFixed
      ? { ...base, color: "#626262", paddingRight: 6 }
      : base;
  },
  multiValueRemove: (base, state) => {
    return state.data.isFixed ? { ...base, display: "none" } : base;
  },
  option: (provided, state) => ({
    ...provided,
    fontSize: "14px",
  }),
};

const ReactSelectOption = ({
  selectedOptions,
  setSelectedOptions,
  data,
  placeholder,
  name,
}) => {
  // Declare the state to hold selected options
  // const [selectedOptions, setSelectedOptions] = useState([
  //   fruits[2],
  //   fruits[3],
  // ]);

  // Handle selection changes
  const handleChange = (selected) => {
    setSelectedOptions(selected);
  };

  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
      <div>
        <Select
          isClearable={false}
          defaultValue={selectedOptions}
          styles={styles}
          isMulti
          name={name}
          options={data}
          className="react-select"
          placeholder={placeholder}
          classNamePrefix="select"
          onChange={handleChange} // Set onChange to handle selection changes
        />
      </div>
      {/* Display selected options */}
      {/* <div>
        <h3>Selected Fruits:</h3>
        <ul>
          {selectedOptions &&
            selectedOptions.map((option) => (
              <li key={option.value}>{option.label}</li>
            ))}
        </ul>
      </div> */}
    </div>
  );
};

export default ReactSelectOption;

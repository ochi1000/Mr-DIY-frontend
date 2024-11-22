/* eslint-disable react/prop-types */
const CustomRadioInput = ({ label, value, checked, onChange, name }) => {
  return (
    <label className="flex items-center cursor-pointer gap-2">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="hidden" // Hide the default radio button
      />
      <span
        className={`w-5 h-5 flex items-center justify-center border-2 rounded-full ${
          checked
            ? "bg-primary-600 border-primary-600"
            : "bg-white border-gray-400"
        }`}
      >
        {checked && (
          <svg
            className="size-5 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="6" />
          </svg>
        )}
      </span>
      <span className="text-gray-700">{label}</span>
    </label>
  );
};

export default CustomRadioInput;

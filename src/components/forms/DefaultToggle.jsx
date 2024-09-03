/* eslint-disable react/prop-types */
const DefaultToggle = ({ defaultChecked, onClick, label, name }) => {
  return (
    <div className="text-sm flex items-center gap-2  text-gray-600 ">
      <label className="inline-flex items-center cursor-pointer ">
        <input
          type="checkbox"
          className="sr-only peer"
          name={name}
          value=""
          defaultChecked={defaultChecked}
          onClick={onClick}
        />
        <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-primary-700"></div>
      </label>
      {label && <p>{label}</p>}
    </div>
  );
};

export default DefaultToggle;

/* eslint-disable react/prop-types */

const Button = ({ title, rightIcon }) => {
  return (
    <button className="nc-Button relative h-auto inline-flex gap-1.5 items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium py-3 px-4 sm:py-3 sm:px-6  ttnc-ButtonPrimary disabled:bg-opacity-90 bg-primary-900 hover:bg-primary-800 text-slate-50  shadow-xl flex-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0 ">
      {title}

      {rightIcon}
    </button>
  );
};

export default Button;

import COLOR from "utils/colors";
export const styles = {
  base: [
    " peer-focus:ring-1 relative w-11 h-6 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all  ",
  ],

  variant: {
    active: {
      [COLOR.PRIMARY]: ["peer-checked:bg-primary-700"],
      [COLOR.PRIMARY_ALT]: ["peer-checked:bg-primary-900"],
      [COLOR.GRAY]: ["peer-checked:bg-gray-700"],

      [COLOR.SUCCESS]: ["peer-checked:bg-success-700"],
      [COLOR.ERROR]: ["peer-checked:bg-error-700"],
      [COLOR.WARNING]: ["peer-checked:bg-warning-700"],
    },
  },
};

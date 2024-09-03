/* eslint-disable react/prop-types */
import { useFormContext } from "react-hook-form";
import classNames from "classnames";
import { ErrorMessage } from "../ErrorMessage";
import { Label } from "../Label";
import { styles } from "./Toggle.styles";

export const Toggle = ({
  checked,
  className,
  disabled,
  label,
  name,
  color = "primary",
}) => {
  const { register } = useFormContext();
  return (
    <>
      <div
        className={classNames(
          "inline-flex items-center ",
          { "cursor-not-allowed ": disabled },
          { "cursor-pointer": !disabled },
          { "pointer-events-none": checked }
        )}
      >
        <label
          className={classNames("inline-flex items-center  ", {
            "cursor-pointer": !disabled,
          })}
        >
          <input
            type="checkbox"
            className="sr-only peer"
            name={name}
            checked={checked}
            disabled={disabled}
            {...register(name)}
            id={name}
            value={true}
          />
          <div
            className={classNames(
              "relative w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all",
              styles.variant.active[color],
              className
            )}
          ></div>
        </label>

        {label && (
          <Label htmlFor={name} text={label} className="cursor-pointer ms-3" />
        )}
      </div>

      <ErrorMessage name={name} />
    </>
  );
};

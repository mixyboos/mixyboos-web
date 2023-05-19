import React from "react";

const defaultClasses =
  "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-slate-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string;
  classes?: string;
  obfuscate?: boolean;
  showCopy?: boolean;
}
const Input = ({
  id,
  type = "text",
  label,
  value,
  readOnly = false,
  placeholder,
  classes = defaultClasses,
  ...rest
}: InputProps) => {
  return (
    <div className="mb-3 pt-0">
      <label
        className="mb-2 block text-sm font-bold text-gray-500"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        name={id}
        type={type}
        readOnly={readOnly}
        value={value}
        placeholder={placeholder}
        className={classes}
        {...rest}
      ></input>
    </div>
  );
};

export default Input;

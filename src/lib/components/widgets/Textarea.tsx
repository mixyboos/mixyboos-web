import React from "react";

const defaultClasses =
  "block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
interface InputProps
  extends React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  label: string;
  classes?: string;
  obfuscate?: boolean;
  showCopy?: boolean;
}
const Textarea = ({
  id,
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
      <textarea
        name={id}
        rows={3}
        readOnly={readOnly}
        value={value}
        placeholder={placeholder}
        className={classes}
        {...rest}
      ></textarea>
    </div>
  );
};

export default Textarea;

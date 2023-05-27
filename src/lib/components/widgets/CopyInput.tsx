import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { HiOutlineDuplicate } from "react-icons/hi";

const defaultClasses =
  "relative w-full px-3 py-4 text-base text-gray-600 placeholder-gray-400 bg-white border-0 rounded shadow outline-none focus:outline-none focus:ring";

interface ICopyInputProps {
  id: string;
  type: string;
  label: string;
  value: string;

  placeholder?: string;
  readOnly?: boolean;
  classes?: string;
  obfuscate?: boolean;

  onChange?: (str: string) => void;
}
const Input = ({
  id,
  label,
  value,
  type = "text",
  readOnly = false,
  onChange,
}: ICopyInputProps) => {
  return (
    <div className="mb-3 pt-0">
      <label
        className="mb-2 block text-sm font-bold text-gray-500"
        htmlFor={id}
      >
        {label}
      </label>

      <div className="relative">
        <input
          type={type}
          id={id}
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
          readOnly={readOnly}
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-slate-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="Search"
          required
        />

        <button
          data-tooltip-target="tooltip-default"
          type="submit"
          title={label}
          className="ho absolute bottom-2.5  right-2.5 rounded-lg px-4 py-2 text-sm font-medium focus:ring-0 focus:ring-4 focus:ring-offset-0 "
        >
          <Tooltip content="Copy" animation="duration-300">
            <CopyToClipboard text={value} onCopy={() => alert("Copied")}>
              <HiOutlineDuplicate className="h-6 w-6 text-gray-400 hover:text-gray-600 focus:ring-0 focus:ring-offset-0" />
            </CopyToClipboard>
          </Tooltip>
        </button>
      </div>
    </div>
  );
};

export default Input;

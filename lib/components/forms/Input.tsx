import React from 'react';

const defaultClasses =
  'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500';
const defaultTextAreaClasses =
  'block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500';
interface IInputProps {
  id: string;
  type: string;
  label: string;
  value: string;

  placeholder?: string;
  readOnly?: boolean;
  classes?: string;
  obfuscate?: boolean;
  showCopy?: boolean;

  onChange?: (str: string) => void;
}
const Input = ({
  id,
  type = 'text',
  label,
  value,
  readOnly = false,
  placeholder,
  classes = defaultClasses,
  onChange,
  obfuscate = false,
  showCopy = false,
}: IInputProps) => {
  return (
    <div className="pt-0 mb-3">
      <label
        className="block mb-2 text-sm font-bold text-gray-500"
        htmlFor={id}
      >
        {label}
      </label>
      {type === 'text' ? (
        <input
          id={id}
          type={type}
          readOnly={readOnly}
          value={value}
          placeholder={placeholder}
          className={classes}
          onChange={(e) => onChange && onChange(e.target.value)}
        ></input>
      ) : (
        <textarea
          id={id}
          rows={3}
          readOnly={readOnly}
          value={value}
          placeholder={placeholder}
          className={defaultTextAreaClasses}
          onChange={(e) => onChange && onChange(e.target.value)}
        ></textarea>
      )}
    </div>
  );
};

export default Input;

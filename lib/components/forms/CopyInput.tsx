import React from 'react';
import { DocumentDuplicateIcon } from '@heroicons/react/20/solid';
import { Tooltip } from 'flowbite-react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const defaultClasses =
  'relative w-full px-3 py-4 text-base text-gray-600 placeholder-gray-400 bg-white border-0 rounded shadow outline-none focus:outline-none focus:ring';

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
  type = 'text',
  readOnly = false,
  onChange,
}: ICopyInputProps) => {
  return (
    <div className="pt-0 mb-3">
      <label
        className="block mb-2 text-sm font-bold text-gray-500"
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
          className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search"
          required
        />

        <button
          data-tooltip-target="tooltip-default"
          type="submit"
          title={label}
          className="absolute right-2.5 bottom-2.5  ho focus:ring-4 focus:ring-0 focus:ring-offset-0 font-medium rounded-lg text-sm px-4 py-2 "
        >
          <Tooltip
            content="Copy"
            animation="duration-300"
          >
            <CopyToClipboard
              text={value}
              onCopy={() => alert('Copied')}
            >
              <DocumentDuplicateIcon className="w-6 h-6 text-gray-400 hover:text-gray-600 focus:ring-0 focus:ring-offset-0" />
            </CopyToClipboard>
          </Tooltip>
        </button>
      </div>
    </div>
  );
};

export default Input;

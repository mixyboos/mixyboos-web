import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import { TiWarningOutline } from "react-icons/ti";

export const notice = (title: string, body: string) => {
  toast.custom(
    (t) => (
      <div
        id="toast-success"
        className="mb-4 flex w-full max-w-xs items-center rounded-lg bg-white p-4 text-gray-500 shadow dark:bg-slate-800 dark:text-gray-400"
        role="alert"
      >
        <div className="flex">
          <div className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-500 dark:bg-blue-900 dark:text-blue-300">
            <TiWarningOutline className="h-5 w-5" fill="currentColor" />
          </div>
          <div className="ml-3 text-sm font-normal">
            <span className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">
              {title}
            </span>
            <div className="mb-2 text-sm font-normal">{body}</div>
          </div>
          <button
            type="button"
            className="-mx-1.5 -my-1.5 ml-auto inline-flex h-8 w-8 rounded-lg bg-white p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-900 focus:ring-2 focus:ring-gray-300 dark:bg-slate-800 dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white"
            data-dismiss-target="#toast-interactive"
            aria-label="Close"
            onClick={() => toast.dismiss(t.id)}
          >
            <span className="sr-only">Close</span>
            <IoClose className="h-5 w-5" fill="currentColor" />
          </button>
        </div>
      </div>
    ),
    { id: "unique-notification", position: "top-center", duration: 4000 }
  );
};

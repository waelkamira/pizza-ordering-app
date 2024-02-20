import React, { useState } from 'react';

export default function ConfirmDelete({ onDelete, children, prop }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button
        className="hover:bg-red-500 hover:text-white"
        type="button"
        onClick={() => setIsOpen(true)}
      >
        Delete
      </button>
      {isOpen && (
        <div className="absolute w-full height-full py-96 top-0 left-0 bottom-0 bg-black/80  flex justify-center items-center rounded-lg border shadow-lg">
          <div className="absolute max-w-96 height-full bg-gray-600 px-56 py-10  rounded-lg flex flex-col items-center justify-center gap-4 ">
            <div className="w-96 p-4">
              <h1 className="text-white">
                This Will Delete It Permanently, Are You Sure?
              </h1>
            </div>
            <div className="flex gap-4">
              {' '}
              <button
                type="button"
                className="bg-white min-w-44 hover:bg-primary hover:text-white text-nowrap "
                onClick={() => {
                  onDelete(prop);
                  setIsOpen(false);
                }}
              >
                {children}
              </button>
              <button
                type="button"
                className="bg-white min-w-44 hover:bg-primary hover:text-white text-nowrap"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

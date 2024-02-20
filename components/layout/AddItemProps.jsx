import React, { useState } from 'react';
import { FaTrashRestoreAlt } from 'react-icons/fa';
import { FaCirclePlus } from 'react-icons/fa6';
import { MdOutlineDoubleArrow } from 'react-icons/md';

export default function AddItemProps({ name, label, props, setProps }) {
  const [isOpen, setIsOpen] = useState(false);

  function handleAddItemPropsForm(e) {
    setProps([...props, { name: '', price: '' }]);
  }

  function handleUpdateProps(e, indexToUpdate, prop) {
    const newValue = e.target.value;
    const newProps = [...props];
    newProps[indexToUpdate][prop] = newValue;
    setProps(newProps);
  }

  function handleDelete(indexToDelete) {
    setProps(props.filter((item, index) => index !== indexToDelete));
    console.log('indexToDelete', indexToDelete);
  }

  function handleIsOpen() {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }
  return (
    <div className="bg-gray-500 rounded-lg p-2 ">
      <div
        className="p-1 bg-primary place-content-end float-end rounded-md"
        onClick={handleIsOpen}
      >
        <MdOutlineDoubleArrow className="rotate-90 text-white" />
      </div>

      <label className="text-white font-semibold mb-8 text-xl ">
        {name} <span>{props?.length}</span>
      </label>

      {isOpen && (
        <>
          <div className="mt-2">
            {props?.length > 0 &&
              props?.map((size, index) => {
                return (
                  <div>
                    <div className="flex gap-2 items-center" key={index}>
                      <div>
                        <h1 className="text-sm text-white">Name:</h1>
                        <input
                          type="text"
                          name=""
                          id=""
                          placeholder="Name"
                          value={size.name}
                          onChange={(e) => handleUpdateProps(e, index, 'name')}
                        />
                      </div>
                      <div>
                        <h1 className="text-sm text-white">Price:</h1>
                        <input
                          type="text"
                          name=""
                          id=""
                          placeholder="price"
                          value={size.price}
                          onChange={(e) => handleUpdateProps(e, index, 'price')}
                        />
                      </div>
                      <div
                        className=" bg-white p-2 rounded-lg mt-2 cursor-pointer text-primary"
                        onClick={() => handleDelete(index)}
                      >
                        <FaTrashRestoreAlt />
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          <div>
            <button
              type="button"
              className="text-white flex gap-2 justify-center items-center"
              onClick={() => handleAddItemPropsForm()}
            >
              <FaCirclePlus className="text-primary" />
              {label}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

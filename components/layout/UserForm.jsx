import React, { useState } from 'react';
import EditableImage from './EditableImage';
import toast from 'react-hot-toast';
export default function UserForm({
  routeName,
  handleProfileInfoUpdate,
  props,
  setProps,
}) {
  return (
    <div className="flex gap-4 items-start justify-center p-4 rounded-lg">
      <EditableImage routeName={routeName} props={props} setProps={setProps} />
      <form
        className="grow flex flex-col justify-center items-center"
        onSubmit={handleProfileInfoUpdate}
      >
        <label className="text-start w-full">First And Last Name:</label>
        <input
          type="text"
          value={props.name}
          onChange={(e) => setProps({ ...props, name: e.target.value })}
          placeholder="Your Name"
        />
        <label className="text-start w-full">Email:</label>
        <input type="text" disabled value={props?.email} />
        <label className="text-start w-full">Phone Number:</label>
        <input
          type="number"
          value={props.phoneNumber}
          placeholder="Phone Number"
          onChange={(e) => setProps({ ...props, phoneNumber: e.target.value })}
        />
        <label className="text-start w-full">Street Address:</label>
        <input
          type="text"
          value={props.streetAddress}
          placeholder="Street Address"
          onChange={(e) =>
            setProps({ ...props, streetAddress: e.target.value })
          }
        />

        <div className=" flex justify-center items-center gap-4  m-0 px-0">
          <div>
            <label className="text-start w-full">Postal Cod:</label>
            <input
              style={{ marginLeft: 0 }}
              type="number"
              value={props.postalCod}
              placeholder="Postal Cod"
              onChange={(e) =>
                setProps({ ...props, postalCod: e.target.value })
              }
            />
          </div>
          <div>
            <label className="text-start w-full">City:</label>
            <input
              style={{ marginRight: 0 }}
              type="text"
              value={props.city}
              placeholder="City"
              onChange={(e) => setProps({ ...props, city: e.target.value })}
            />
          </div>
        </div>
        <label className="text-start w-full">Country:</label>
        <input
          type="text"
          value={props.country}
          placeholder="Country"
          onChange={(e) => setProps({ ...props, country: e.target.value })}
        />
        <button className="bg-primary text-white m-1" type="submit">
          Save
        </button>
      </form>
    </div>
  );
}

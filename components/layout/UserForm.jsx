import { useState } from 'react';
import UseProfile from '../UseProfile';
import EditableImage from './EditableImage';
export default function UserForm({
  handleProfileInfoUpdate,
  props,
  setProps,
  routeProp,
}) {
  const { data } = UseProfile();
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:items-start justify-center p-4 rounded-lg">
      <div className="">
        <EditableImage props={props} routeProp={routeProp} />
      </div>
      <form
        name="form"
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

        {data.admin && (
          <div className="inline-flex gap-4  border w-full p-3 rounded-xl mb-2 items-center">
            <label htmlFor="admin" className="text-start w-full text-md">
              Admin:
            </label>
            <input
              className="hover:accent-primary size-6 bg-gray-600"
              id="admin"
              type="checkbox"
              checked={props.admin}
              onChange={(e) => {
                setProps({ ...props, admin: e.target.checked });
                setIsChecked(e.target.checked);
              }}
            />
          </div>
        )}

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
              value={props.postalCode}
              placeholder="Postal Cod"
              onChange={(e) =>
                setProps({ ...props, postalCode: e.target.value })
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

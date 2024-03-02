import React from 'react';

export default function Address({ data, disabled = false }) {
  return (
    <div>
      <div>
        <label className="text-white">Phon Number</label>
        <input
          disabled={disabled}
          type="text"
          placeholder="Phon Number"
          value={data?.phoneNumber}
        />
      </div>
      <div>
        <label className="text-white">Street Address</label>
        <input
          disabled={disabled}
          type="text"
          placeholder="Street Address"
          value={data?.streetAddress}
        />
      </div>
      <div className="flex gap-4">
        <div>
          <label className="text-white">Postal Code</label>
          <input
            disabled={disabled}
            type="text"
            placeholder="Postal Code"
            value={data?.postalCode}
          />
        </div>
        <div>
          <label className="text-white">City</label>
          <input
            disabled={disabled}
            type="text"
            placeholder="City"
            value={data?.city}
          />
        </div>
      </div>
      <div>
        <label className="text-white">Country</label>
        <input
          disabled={disabled}
          type="text"
          placeholder="Country"
          value={data?.country}
        />
      </div>
    </div>
  );
}

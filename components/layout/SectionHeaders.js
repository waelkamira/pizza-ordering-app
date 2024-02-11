import React from 'react';

export default function SectionHeaders({ subHeader, mainHeader }) {
  return (
    <div>
      {' '}
      <h3 className="uppercase text-gray-600 font-semibold leading-4">
        {subHeader}
      </h3>
      <h2 className="text-primary text-4xl font-bold italic">{mainHeader}</h2>
    </div>
  );
}

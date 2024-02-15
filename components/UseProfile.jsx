import React, { useEffect, useState } from 'react';

export default function UseProfile() {
  const [loading, setLoading] = useState(true);
  const [data, setIsData] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetch('/api/profile').then((response) => {
      response.json().then((data) => {
        setIsData(data);
        // console.log(data);
      });
    });

    setLoading(false);
  }, []);
  // console.log(data, loading);
  return { data, loading };
}

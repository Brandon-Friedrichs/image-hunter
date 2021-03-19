import React, { useState, useEffect } from 'react';

export default function useTimedToggle(interval) {
  const [status, setStatus] = useState(false);

  function toggle() {
    setStatus(true);
  }

  useEffect(() => {
    let timeout;

    if (status && interval) {
      timeout = setTimeout(() => setStatus(false), interval);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [status, interval]);

  return [status, toggle];
}

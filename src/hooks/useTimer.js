import React, { useRef, useState } from 'react'

export default function useTimer() {
  const [timer, setTimer] = useState(0);
  const countRef = useRef(null);

  function start() {
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
  }

  function stop() {
    clearInterval(countRef.current);
  }

  function reset() {
    clearInterval(countRef.current);
    setTimer(0);
  }
  
  return [timer, start, stop, reset];
}

import { useRef, useState } from 'react'

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

  function formatTime(time) {
    const getSeconds = `0${Math.round(time % 60)}`.slice(-2);
    const minutes = `${Math.floor(time / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(time / 3600)}`.slice(-2);
  
    return `${getHours}:${getMinutes}:${getSeconds}`;
  }
  
  
  return [timer, formatTime, start, stop, reset];
}

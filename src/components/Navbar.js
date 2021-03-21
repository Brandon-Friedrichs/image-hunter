import React from 'react'
import { Card } from 'react-bootstrap';

export default function Navbar({ timer }) {

  const formatTime = (time) => {
    const getSeconds = `0${Math.round(time % 60)}`.slice(-2);
    const minutes = `${Math.floor(time / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(time / 3600)}`.slice(-2);
  
    return `${getHours}:${getMinutes}:${getSeconds}`;
  }
  
  return (
    <div 
      style={{
        position: 'fixed',
        width: '100%',
        height: '3rem',
        color: 'white',
        backgroundColor: 'navy'
      }}
    >
      {formatTime(timer)}
    </div>
  )
}

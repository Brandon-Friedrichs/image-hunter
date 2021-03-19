import React from 'react'

export default function Notification({ text, bgc }) {
  return (
    <div 
      style={{
        position: 'fixed',
        top: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        padding: '0.5rem 1rem',
        borderRadius: '0.5rem',
        color: 'white',
        backgroundColor: bgc 
      }} >
      {text}
    </div>
  )
}

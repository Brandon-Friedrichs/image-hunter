import React from 'react'

export default function Navbar({ timer }) {

  return (
    <div 
      style={{
        display: 'flex',
        position: 'fixed',
        width: '100%',
        height: '3rem',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        backgroundColor: 'navy',
      }}
    >
      <h3><strong>{timer}</strong></h3>
    </div>
  )
}

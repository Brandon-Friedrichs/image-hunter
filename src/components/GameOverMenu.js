import React from 'react'

export default function GameOverMenu() {
  return (
    <div
      style={{
        display: 'flex',
        position: 'fixed',
        width: '100%',
        height: '100%',
        top: '3rem',
        left: '50%',
        transform: 'translateX(-50%)',
        padding: '0.5rem 1rem',
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
        color: 'white',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
      }}
    >
      <h2>Game Over</h2>

    </div>
  )
}
 
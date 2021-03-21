import React from 'react';
import { Button } from 'react-bootstrap';

export default function StartMenu({ startGame }) {
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
        zIndex: '1',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
      }}
    >
      <Button onClick={startGame} >Start Game</Button>
    </div>
  )
}

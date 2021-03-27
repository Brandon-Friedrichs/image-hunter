import React from 'react';
import { Card, Button } from 'react-bootstrap';
import Highscores from './Highscores';

export default function GameOverMenu({ timer, formatTime, restartGame, openGameOverMenu }) {

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
      <Card 
        style={{ 
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          borderRadius: '5%'
        }}
      >
        <Card.Body>
          <h2 className='mb-2' >Game Over</h2>
          <Highscores timer={timer} formatTime={formatTime} />
          <Button className='mt-4' onClick={restartGame} >Play Again</Button>
        </Card.Body>
      </Card>

    </div>
  )
}
 
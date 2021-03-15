import React, { useState } from 'react'
import { ListGroup, Button, Alert } from 'react-bootstrap';

export default function Game() {
  const [menu, setMenu] = useState('hidden');
  const [pageX, setPageX] = useState(0);
  const [pageY, setPageY] = useState(0);

  function toggleMenu() {
    if (menu === 'hidden') setMenu('visible');
    else if (menu === 'visible') setMenu('hidden');
  }

  function handleClick(e) {
    if (menu === 'hidden') console.log(e.pageX);
    toggleMenu();
    setPageX(e.pageX - 40);
    setPageY(e.pageY - 40);
  }

  return (
    <div onClick={handleClick} >
      <div
        style={{
          display: 'flex',
          width: '5rem',
          height: '5rem',
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'hsla(0,0%,100%,.3)',
          border: '5px dashed white',
          borderRadius: '50%',
          visibility: menu,
          top: pageY,
          left: pageX
        }}
      >
        <ListGroup
          style={{
            display: 'flex',
            width: '8rem',
            textAlign: 'center',
            left: '100',
            cursor: 'pointer',
            transform: 'translate(70%,70%)'
          }}
        >
          <ListGroup.Item className='btn-light' >Venusaur</ListGroup.Item>
          <ListGroup.Item className='btn-light' >Sonic</ListGroup.Item>
          <ListGroup.Item className='btn-light' >Alien</ListGroup.Item>
        </ListGroup>
      </div>
      <img className='mw-100' src='./pixellandscape.png' alt='' />
    </div>
  )
}

import React, { useState, useRef } from 'react'
import { ListGroup, Button, Alert } from 'react-bootstrap';
import { firestore } from '../firebase';
import useNotification from '../hooks/useNotification';
import Notification from './Notification';

export default function Game() {
  const [menu, setMenu] = useState('hidden');
  const [pageX, setPageX] = useState(0);
  const [pageY, setPageY] = useState(0);
  const imgRef = useRef();
  const [notification, setNotification, openNotification, toggleNotification] = useNotification(
    { text: '', bgc: 'red' },
    3000
  );

  function toggleMenu() {
    if (menu === 'hidden') setMenu('visible');
    else if (menu === 'visible') setMenu('hidden');
  }

  function handleClick(e) {
    toggleMenu();
    if (menu === 'hidden') {
      console.log(e.pageX, e.pageY);
      setPageX(e.pageX);
      setPageY(e.pageY);
    }
  }

  async function checkForCharacter(e) {
    const char = e.target.textContent;
    const dbCoords = await getCoordsFromDb(char, pageX, pageY);
    console.log(dbCoords)

    const width = imgRef.current.offsetWidth;
    const height = imgRef.current.offsetHeight;

    // Convert to relative form based on screen size.
    // Needs to be fixed.
    const relX = pageX / width;
    const relY = pageY / height;
    // console.log(relX, relY)

    // Testing the max relative distance from origin (deltaX = 0.042, deltaY = 0.01).
    const testX = Math.abs(relX - dbCoords.x / width) < 0.042;
    const testY = Math.abs(relY - dbCoords.y / height) < 0.042;
    console.log(testX, testY);

    if (testX && testY) {
      setNotification({ text: ` You found ${char}!`, bgc: 'green' });
      toggleNotification();
    } else if (!testX || !testY) {
      setNotification({ text: `That's not ${char}, keep looking!`, bgc: 'red'});
      toggleNotification();
    }
  }

  async function getCoordsFromDb(character, x, y) {
    const coordsRef = firestore.collection('coords').doc(character);
    const coords = await coordsRef.get().then((doc) => {
      if (doc) {
        console.log('Retrieving character coordinates');
        return doc.data();
      } else {
        console.log('Character coordinates not found');
      }
    })
    return coords;
  }

  return (
    <div onClick={handleClick} ref={imgRef} >
      {openNotification && <Notification text={notification.text} bgc={notification.bgc} ></Notification>}
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
          top: pageY - 40,
          left: pageX- 40
        }}
      >
        <ListGroup onClick={checkForCharacter}
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

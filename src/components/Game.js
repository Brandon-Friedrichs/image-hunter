import React, { useState, useEffect, useRef } from 'react'
import { firestore } from '../firebase';
import Navbar from './Navbar';
import useTimer from '../hooks/useTimer';
import useNotification from '../hooks/useNotification';
import Notification from './Notification';
import StartMenu from './StartMenu';
import GameOverMenu from './GameOverMenu';
import CharacterMenu from './CharacterMenu';

export default function Game() {
  const [menu, setMenu] = useState('hidden');
  const [openGameOverMenu, setOpenGameOverMenu] = useState(false);
  const [charTracker, setCharTracker] = useState([]);
  const [pageX, setPageX] = useState(0);
  const [pageY, setPageY] = useState(0);
  const [openStartMenu, setOpenStartMenu] = useState(true);
  const imgRef = useRef();
  const [timer, formatTime, startTimer, stopTimer, resetTimer] = useTimer();
  const [notification, setNotification, openNotification, toggleNotification] = useNotification(
    { text: '', bgc: 'red' },
    3000
  );

  async function startGame() {
    console.log('Starting game')
    setOpenStartMenu(false);
    startTimer();
    const charTrackerData =  await getCharsFromDb();
    setCharTracker(charTrackerData);
  }

  async function restartGame() {
    console.log('Restarting game')
    setOpenGameOverMenu(false);
    resetTimer();
    startTimer();
    const charTrackerData = await getCharsFromDb();
    setCharTracker(charTrackerData);
  }

  function toggleMenu() {
    if (menu === 'hidden') setMenu('visible');
    else if (menu === 'visible') setMenu('hidden');
  }

  function handleClick(e) {
    toggleMenu();
    if (menu === 'hidden') {
      setPageX(e.pageX);
      setPageY(e.pageY);
    }
  }

  function characterFound(charFound) {
    const updatedCharTracker = charTracker.map((character) => {
      if (character.id === charFound) {
        return { ...character, found: true };
      } else {
        return character;
      }
    })
    setCharTracker(updatedCharTracker);
  }
  
  useEffect(() => {
    if (charTracker.length && charTracker.every((character) => character.found === true)) handleWin();
  }, [charTracker])
  
  function handleWin() {
    stopTimer();
    setOpenGameOverMenu(true);
  }

  async function checkForCharacter(e) {
    const char = e.target.textContent;
    const dbCoords = await getCoordsFromDb(char, pageX, pageY);

    const width = imgRef.current.offsetWidth;
    const height = imgRef.current.offsetHeight;

    // Convert to relative form based on screen size.
    const relX = pageX / width;
    const relY = (pageY - 50) / height;

    // Testing the max relative distance from origin (deltaX = 0.042, deltaY = 0.01).
    const testX = Math.abs(relX - dbCoords.x) < 0.042;
    const testY = Math.abs(relY - dbCoords.y) < 0.03;

    if (testX && testY) {
      setNotification({ text: ` You found ${char}!`, bgc: 'green' });
      toggleNotification();
      characterFound(char);
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

  async function getCharsFromDb() {
    const charsRef = firestore.collection('charTracker');
    const chars = await charsRef.get().then((querySnapshot) => {
      let charsData = [];
      querySnapshot.forEach((doc) => {
        charsData.push(doc.data())
      })
      const loadedCharacters = charsData.map((character) => {
        const obj = { id: character.name, found: false};
        return obj
      })
      return loadedCharacters;
    })
    return chars;
  }

  return (
    <div ref={imgRef} >
      <Navbar timer={formatTime(timer)}></Navbar>
      {openStartMenu && <StartMenu startGame={startGame} ></StartMenu>}
      {openNotification && <Notification text={notification.text} bgc={notification.bgc} ></Notification>}
      {openGameOverMenu && <GameOverMenu timer={timer} formatTime={formatTime} restartGame={restartGame} openGameOverMenu={openGameOverMenu} ></GameOverMenu>}
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
        onClick={toggleMenu}
      >
        <CharacterMenu checkForCharacter={checkForCharacter} charTracker={charTracker} ></CharacterMenu>
      </div>
      <img 
        style={{
          maxWidth: '100vw',
          marginTop: '3rem'
        }}
        onClick={handleClick}
        src='./pixellandscape.png' 
        alt='' 
      />
    </div>
  )
}

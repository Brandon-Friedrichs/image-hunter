import React from 'react';
import { ListGroup } from 'react-bootstrap';


export default function CharacterMenu({ checkForCharacter, charTracker }) {
  const characterButtons = charTracker.filter((character) => !character.found).map((character) => {
    return <ListGroup.Item key={character.id} className='btn-light' >{character.id}</ListGroup.Item>
  });

  return (
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
      {characterButtons}

    </ListGroup>
    )
}

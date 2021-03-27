import React, { useRef, useState, useEffect } from 'react';
import { firestore } from '../firebase';
import { Form, ListGroup, Button } from 'react-bootstrap';
import useFirestore from '../hooks/useFirestore';

export default function Highscores({ timer, formatTime }) {
  const nameRef = useRef();
  const [showForm, setShowForm] = useState(false);
  const [hasAddedHighscore, setHasAddedHighscore] = useState(false);
  const [highscores] = useFirestore('highscores');
  const scoresRef = firestore.collection('highscores');

  useEffect(() => {
    if (highscores !== null && !hasAddedHighscore) {
      const maxScore = Math.max(...highscores.map((score) => score.time));
      const isHighscore = highscores.length < 10 ? true : timer < maxScore;
      if (isHighscore) {
        setShowForm(true);
      }
    }
  }, [highscores, hasAddedHighscore, setShowForm])

  async function addScore(e) {
    try {
      e.preventDefault();
      await scoresRef.add({
        name: nameRef.current.value,
        time: timer
      });
      setHasAddedHighscore(true);
      setShowForm(false);
    } catch (error) {
      console.error(error);
    }
  }

  const highscoresList = highscores !== null && highscores.map((score) => (
    <ListGroup.Item 
      style={{
        maxWidth: '220px',
        height: '50px'
      }}
      key={score.id} 
      variant='primary' >
        {score.name} - {formatTime(score.time)
    }</ListGroup.Item>
  ));

  return (
    <div>
      <h2>High Scores</h2>
      <ListGroup
        style={{
          width: '400px',
          maxHeight: '250px',
          flexWrap: 'wrap',
          marginBottom: '1em',
          alignContent: 'center'
        }}
      >
        {highscores !== null && highscores.length < 1 ? (
          <span>No highscores recorded</span>
        ) : (
          highscoresList
        )}
      </ListGroup>
      {showForm ? (
        <Form onSubmit={addScore} >
          <h5>Add Your High Score</h5>
          <h4>Time</h4>
          <h3>{formatTime(timer)}</h3>

          <Form.Group id='name' >
            <Form.Label>Name</Form.Label>
            <Form.Control type='text' ref={nameRef} maxLength='12' required></Form.Control>
          </Form.Group>
          <Button type='submit'>Submit Score</Button>
        </Form>
      ) : (
        <h3>{formatTime(timer)}</h3>
      )}
    </div>
  )
}

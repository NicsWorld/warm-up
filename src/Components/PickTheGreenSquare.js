import './App.css';
import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { AnimatePresence, motion } from "framer-motion";

function PickGreenSquare() {
  const [squares, setSquares] = useState([]);
  const [rows, setRows] = useState([]);
  const [start, setStart] = useState(false);
  const [selectedRow, setSelectedRow] = useState([]);
  const [selectedSquare, setSelectedSquare] = useState([]);
  const [isInitialModalOpen, setInitialModalOpen] = useState(false);
  const [isGameOverModalOpen, setGameOverModalOpen] = useState(false);
  const [difficulty, setDifficulty] = useState(undefined);
  const [speed, setSpeed] = useState(0);
  const [score, setScore] = useState(0);
  const [intervalID, setIntervalID] = useState();
  const [ticks, setTicks] = useState(0);

  useEffect(() => {
    setInitialModalOpen(true);
    Modal.setAppElement('.App');
  }, []);

  useEffect(() => {
    if(difficulty === "easy"){
      setSpeed(1500);
    }
    if(difficulty === "medium") {
      setSpeed(1000);
    }
    if(difficulty === "hard") {
      setSpeed(750);
    }
    if(start) {
      let numberArray = [];
      let rowArray = [];
      for(let i = 0; i < 5; i++) {
        numberArray.push(i);
        rowArray.push(i)
      }
      setSquares(numberArray);
      setRows(rowArray);
    }
    if(!start) {
      clearInterval(intervalID);
    }
  }, [start, difficulty]);

  function pickSquareAndRow() {
    const randomSquare = squares[Math.floor(Math.random()*squares.length)];
    const randomRow = rows[Math.floor(Math.random()*rows.length)];

    if (randomSquare === selectedSquare && randomRow === selectedRow) {
      console.log("same square and row");
      pickSquareAndRow();
    }
    setSelectedSquare(randomSquare);
    setSelectedRow(randomRow);
  }

  useEffect(() => {
    if(speed && start) {
      const interval = setInterval(() => {
        pickSquareAndRow();
        setTicks(ticks + 1);
        checkIfGameIsOver();
      }, speed);
      setIntervalID(interval);
      return () => clearInterval(interval);
    }

  }, [rows, squares, speed, score, ticks, start]);

  function checkIfGameIsOver() {
    if(score !== ticks) {
      console.log('game over!');
      // endGame();
    }
  }

  function endGame() {
    setGameOverModalOpen(true);
    setStart(false);
  }
  
  function handleAccurateClick() {
    console.log("speed: ", speed);
    setScore(score + 1);
    setSpeed(speed - 10);
  }
  
  function closeInitialModal() {
    setInitialModalOpen(false);
    setStart(true);
  }

  function handleDifficultySelection(choice) {
    setDifficulty(choice);
    closeInitialModal();
  }
  function reset() {
    setScore(0);
    setTicks(0);
    setStart(false);
    setSpeed(0);
    setSelectedRow([]);
    setSelectedSquare([]);
    setGameOverModalOpen(false);
    setInitialModalOpen(true);
  }

  const introModal = () => (
      <Modal
        isOpen={isInitialModalOpen}
        onRequestClose={closeInitialModal}
        className="initial-modal"
        contentLabel="Warm up"
        overlayClassName="overlay"
      >
      <h2>Choose a difficulty</h2>
      <div className="btn-container">
        <AnimatePresence>
        <motion.button 
              whileHover={{ scale: 1.1 }} 
              whileTap={{ scale: 0.9}}
              onClick={() => handleDifficultySelection("easy")} 
              className="btn-primary easy">Easy</motion.button>
        <motion.button 
              whileHover={{ scale: 1.1 }} 
              whileTap={{ scale: 0.9}}
              onClick={() => handleDifficultySelection("medium")} className="btn-primary medium">Medium</motion.button>
        <motion.button             
              whileHover={{ scale: 1.1 }} 
              whileTap={{ scale: 0.9}}
              onClick={() => handleDifficultySelection("hard")} 
              className="btn-primary hard">Hard</motion.button>
              </AnimatePresence>
      </div>
      <p>Click on the <span className="greentext">green</span> square as soon as possible!</p>
      </Modal>
  );
  const gameOverModal = () => (
      <Modal
        isOpen={isGameOverModalOpen}
        onRequestClose={closeInitialModal}
        className="gameover-modal"
        contentLabel="You lose!"
        overlayClassName="overlay"
      >
      <h2>Game over! You Lose<span className="loser">r</span>!</h2>
      <div className="score-container">
        <div>Your score: {score}</div>
        <button onClick={() => reset()} className="btn-primary">Play again?</button>
      </div>
      <p></p>
    </Modal>
  );

  return (
    <div className="App">
      <header className="App-header">
        {introModal()}
        {gameOverModal()}
        <div className="square-container">
        {rows.map((row, rowIndex) => {
          return (
            <div key={rowIndex} className="row">
              {squares.map((square, squareIndex) => {
                if(selectedRow === rowIndex && selectedSquare === squareIndex) {
                  return (
                    <div onMouseDown={() => handleAccurateClick()} key={rowIndex+squareIndex} className="random square"></div>
                    );
                } else {
                  return (
                    <div onMouseDown={() => endGame()} key={rowIndex+squareIndex} className="square"></div>
                    );  
                }
              })}
             </div> 
          );
        })}
        </div>
      </header>
    </div>
  );
}

export default PickGreenSquare;

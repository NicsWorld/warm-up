import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [squares, setSquares] = useState([]);
  const [rows, setRows] = useState([]);
  const [selectedRow, setSelectedRow] = useState([]);
  const [selectedSquare, setSelectedSquare] = useState([]);
 
  useEffect(() => {
    let numberArray = [];
    let rowArray = [];
    for(let i = 0; i < 5; i++) {
      numberArray.push(i);
      rowArray.push(i)
    }
    setSquares(numberArray);
    setRows(rowArray);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedSquare(squares[Math.floor(Math.random()*squares.length)]);
      setSelectedRow(rows[Math.floor(Math.random()*rows.length)]);
    }, 1950);
    return () => clearInterval(interval);
  }, [squares,  rows]);

  return (
    <div className="App">
      <header className="App-header">
        <div className="square-container">
        {rows.map((row, rowIndex) => {
          return (
            <div key={rowIndex} className="row">
              {squares.map((square, squareIndex) => {
                if(selectedRow === rowIndex && selectedSquare === squareIndex) {
                  return (
                    <div key={rowIndex+squareIndex} className="random square"></div>
                    );
                } else {
                  return (
                    <div key={rowIndex+squareIndex} className="square"></div>
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

export default App;

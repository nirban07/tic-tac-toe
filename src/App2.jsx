import "./App.css";

import { useState } from "react";
function Square({ value, onClick }) {
  return <button onClick={onClick}>{value}</button>;
}

function App2() {
  let [squares, setSquares] = useState(Array(9).fill(null));
  let [isXNext, setIsXNext] = useState(true);

  let [liPointer, setLiPointer] = useState(null);

  let [history, setHisotry] = useState([Array(9).fill(null)]);

  let winnerStatus = calculateWinner(squares);

  function handleClick(value, valuesIndex) {
    let newValues = squares.slice();
    if (winnerStatus != undefined) {
      return;
    }

    if (newValues[valuesIndex] !== null) {
      return;
    }
    if (newValues[valuesIndex] === null) {
      newValues[valuesIndex] = isXNext ? "X" : "O";
    }
    setIsXNext(!isXNext);
    setSquares(newValues);
    // clear history till index in which the li is last clicked
    if (liPointer != null) {
      setHisotry(history.slice(0, liPointer + 2));
      setLiPointer(null);
    }
    history.push(newValues);
  }
  function goBack(historyIndex) {
    setSquares(history[historyIndex]);
    setLiPointer(historyIndex);
  }

  return (
    <div>
      <div>
        {winnerStatus != undefined ? (
          <div>Winner is {winnerStatus}</div>
        ) : (
          <div> Next player is {isXNext ? "X" : "O"}</div>
        )}
      </div>
      <div className="container">
        {squares.map((value, valuesIndex) => (
          <Square
            key={valuesIndex}
            value={value}
            onClick={() => handleClick(value, valuesIndex)}
          />
        ))}
      </div>
      <div>
        <h4>History</h4>
        <ul>
          {history.map((arr, index) => (
            <li onClick={() => goBack(index)} key={index}>
              Go to step #{index}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
function calculateWinner(boxes) {
  let winnerGird = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < winnerGird.length; i++) {
    let [a, b, c] = winnerGird[i];
    if (boxes[a] === boxes[b] && boxes[b] === boxes[c]) {
      return boxes[a];
    }
  }
}

export default App2;

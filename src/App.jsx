import { useState } from "react";

import "./App.css";
// app is game
function Square({ value, handleClick }) {
  return (
    <>
      <button onClick={handleClick}>{value}</button>
    </>
  );
}
function App() {
  const [value, setValue] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  let [history, setHisotry] = useState([Array(9).fill(null)]);
  let [currentMove, setCurrentMove] = useState(1);
  let winnerStatus = calculateWinner(value);
  if (winnerStatus) {
    let winner = "The winner is " + winnerStatus;
    console.log(winner);
  }

  function handleClick(index, item) {
    setCurrentMove((premove) => premove + 1);
    let newArray = value.slice();
    if (winnerStatus) {
      return;
    }
    if (item === !null) {
      return;
    }
    if (item === null) {
      newArray[index] = isXNext ? "X" : "O";
      setIsXNext(!isXNext);
    }
    history.push(newArray);
    console.log(currentMove);
    console.log(history);
    console.log(history.slice(0, currentMove));
    setHisotry(history.slice(0, currentMove));
    setValue(newArray);
  }
  console.log(currentMove);

  // function updateHistory(i) {
  //   setHisotry(history.slice(0,i))
  // }
  function goBack(val, i) {
    setValue(val);
    setCurrentMove(i);
  }
  return (
    <>
      {winnerStatus ? (
        <div>{"the winner is " + winnerStatus}</div>
      ) : (
        <div>Next user is {isXNext ? "X" : "O"} </div>
      )}
      <div className="container">
        {value.map((item, index) => {
          return (
            <Square
              key={index}
              value={item}
              handleClick={() => handleClick(index, item)}
            />
          );
        })}
      </div>
      <div>
        <h4>History</h4>
        <ul>
          {history.map((val, i) => {
            return (
              <li onClick={() => goBack(val, i)} key={i}>
                Go back to #{i}
              </li>
            );
          })}
        </ul>
      </div>
    </>
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
export default App;

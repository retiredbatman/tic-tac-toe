import React, { Fragment, useState } from "react";

const winningSeqs = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8]
];

export default () => {
  const initialBoard = [["", "", ""], ["", "", ""], ["", "", ""]];
  const [board, setBoard] = useState(initialBoard);
  const [canClick, setCanClick] = useState(true);
  const [winningSeq, setWinningSeq] = useState([]);
  const [reset, setReset] = useState(false);
  const flatBoard = () => board.reduce((acc, val) => acc.concat(val));

  const checkVictory = letter => {
    const board = flatBoard();
    return winningSeqs.some(([a, b, c]) => {
      if (board[a] === letter && board[b] === letter && board[c] === letter) {
        setWinningSeq([a, b, c]);
        return true;
      }
      return false;
    });
  };

  const makeTurn = (cell, letter) => {
    const row = Math.floor(cell / 3);
    const col = cell % 3;
    const newBoard = [...board];
    newBoard[row][col] = letter;
    setBoard(newBoard);
  };

  const computerTurn = () => {
    const emptyCells = flatBoard().reduce((acc, val, index) => {
      !val && acc.push(index);
      return acc;
    }, []);
    const randomCell = Math.floor(Math.random() * emptyCells.length);
    setTimeout(() => {
      makeTurn(emptyCells[randomCell], "O");
      !checkVictory("O") ? setCanClick(true) : setReset(true);
    }, 1000);
  };

  const handleClick = index => {
    setCanClick(false);
    makeTurn(index, "X");
    !checkVictory("X") ? computerTurn() : setReset(true);
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setCanClick(true);
    setWinningSeq([]);
    setReset(false);
  };
  return (
    <Fragment>
      <h1>Tic Tac Toe</h1>
      <div className="container">
        {flatBoard().map((b, index) => (
          <div
            className={`cell ${winningSeq.includes(index) ? "winner" : ""}`}
            id={`cell${index}`}
            onClick={() => canClick && handleClick(index)}
          >
            {b}
          </div>
        ))}
      </div>
      {reset && <button onClick={resetGame}>Reset</button>}
    </Fragment>
  );
};

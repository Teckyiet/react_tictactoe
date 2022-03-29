import React, { Component, useState } from "react";
import Board from "./board";
import History from "./history";

const arraySquares = [
  { id: 1, filler: "" },
  { id: 2, filler: "" },
  { id: 3, filler: "" },
  { id: 4, filler: "" },
  { id: 5, filler: "" },
  { id: 6, filler: "" },
  { id: 7, filler: "" },
  { id: 8, filler: "" },
  { id: 9, filler: "" },
];

const Game = () => {
  const winningArray = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  const [totalSquares, setTotalSquare] = useState([
    { id: 1, filler: "" },
    { id: 2, filler: "" },
    { id: 3, filler: "" },
    { id: 4, filler: "" },
    { id: 5, filler: "" },
    { id: 6, filler: "" },
    { id: 7, filler: "" },
    { id: 8, filler: "" },
    { id: 9, filler: "" },
  ]);
  const [playerInput, setPlayerInput] = useState("O");
  const [verifyMove, setVerifyMove] = useState("");
  const [gameEnd, setGameEnd] = useState(false);
  const [winner, setWinner] = useState("");

  const [restartBtn, setRestartBtn] = useState("restart-btn-hide");

  const [history, setHistory] = useState([]);

  const handleBoxClick = (boxId) => {
    if (gameEnd) {
      return;
    }
    setVerifyMove("");

    /* ------------------------- Find clicked square ------------------------ */
    const targetBox = totalSquares.filter((box) => {
      return box.id == boxId;
    });

    /* --------------- Prevent occupied square to be refilled --------------- */
    if (targetBox[0].filler != "") {
      return setVerifyMove("Invalid Move");
    }

    /* ------------------------ Swapping player turn ------------------------ */
    const input = () => {
      if (playerInput == "O") {
        setPlayerInput("X");
        return playerInput;
      }
      setPlayerInput("O");
      return playerInput;
    };

    /* ---------------------  Creating new state array --------------------- */
    const index = totalSquares.indexOf(targetBox[0]);
    targetBox[0].filler = input();
    totalSquares.splice(index, 1, targetBox[0]);
    setTotalSquare(totalSquares);

    recordHistoryMoves(boxId);
    winValidation();
    return;
  };

  /* -------------------------- **External Functions** -------------------------- */
  const winValidation = () => {
    const emptySquares = totalSquares.filter((square) => {
      return square.filler == "";
    });
    for (let i = 0; i < winningArray.length; i++) {
      const [a, b, c] = winningArray[i];
      if (
        totalSquares[a].filler &&
        totalSquares[a].filler == totalSquares[b].filler &&
        totalSquares[a].filler == totalSquares[c].filler
      ) {
        setGameEnd(true);
        setRestartBtn("restart-btn");
        return setWinner(totalSquares[a].filler + " is the winner.");
      }
    }
    if (emptySquares.length == 0) {
      setGameEnd(true);
      setRestartBtn("restart-btn");
      return setWinner("Game draw!!");
    }
  };

  const recordHistoryMoves = (indexOfClickedSquare) => {
    const allMoves = totalSquares.filter((x) => {
      return x.filler !== "";
    });
    const latestMove = allMoves.filter((x) => x.id === indexOfClickedSquare);
    arraySquares.splice(indexOfClickedSquare - 1, 1, ...latestMove);
    setHistory((pre) => [...pre, [...arraySquares]]);
  };

  const handlePageReload = () => {
    window.location.reload(true);
  };

  const handleLoadState = (num) => {
    return setTotalSquare(history[num]);
  };

  /* -------------------------------- Rendering ------------------------------- */
  return (
    <div className='Game'>
      <h1>Tic Tac Toe</h1>
      <h3>Current player turn: {playerInput}</h3>

      <div className='gameboard'>
        <Board
          key='board--1'
          arraySquares={totalSquares}
          passBoxClick={handleBoxClick}></Board>

        <div className='info-wrapper'>
          <h4>{verifyMove}</h4>
          <h2>{winner}</h2>
          <button className={restartBtn} onClick={handlePageReload}>
            Another game?
          </button>
        </div>

        <div className='history-log'>
          <h3>Previous Moves:</h3>
          <div className='historyBtn-wrapper'>
            {history.map((historyMove, index) => {
              return (
                <History
                  key={"H" + index}
                  value={index}
                  loadState={handleLoadState}>
                  Move #{index + 1}
                </History>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;

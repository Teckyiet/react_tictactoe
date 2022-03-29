import React from "react";
import Square from "./square";

const Board = ({ arraySquares, passBoxClick }) => {
  return (
    <div className='board'>
      {arraySquares.map((square, index) => {
        return (
          <Square
            key={index}
            square={square}
            onBoxClick={passBoxClick}></Square>
        );
      })}
    </div>
  );
};

export default Board;

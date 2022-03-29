import React from "react";

const Square = ({square, onBoxClick}) => {
    const { filler, id } = square;

  const style = filler ? `square ${filler}` : `square`;

  return (
    <div className={style} onClick={() => onBoxClick(id)}>
      {filler} 
    </div>
  );
};

export default Square;

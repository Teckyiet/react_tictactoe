import React from "react";

const History = ({ loadState, children, value }) => {
  return (
      <button
        className='historyBtn'
        onClick={() => {
          loadState(value);
        }}>
        {children}
      </button>
  );
};

export default History;

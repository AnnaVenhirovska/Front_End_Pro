import React from "react";
import "./block-name.css";

const BlockName = ({ text, matchedBlock }) => {
  return (
    <div
      className = {`block-name ${
        text === matchedBlock ? 'highlighted-block' : ''
      }`}
    >
      {text}
    </div>
  );
};

export default BlockName;
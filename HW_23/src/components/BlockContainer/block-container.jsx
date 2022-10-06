import React, { useState } from "react";
import BlockName from "../BlockName/block-name";

const nameList = ["Anna", "Teacher", "John", "Jack", "Jain"];

const BlockContainer = () => {
  const [matchedBlock, setMatchedBlock] = useState("");

  const onChangeHandler = (event) => {
    const textEntered = event.target.value;
    const findMatch = nameList.find(
      (name) => name.toLowerCase() === textEntered.toLowerCase()
    );
    setMatchedBlock(findMatch);
  };

  return (
    <>
      <h3> &#128571; My First React Task &#128515; </h3>
      <hr />
      <input onChange = {onChangeHandler} type="text" placeholder="Enter text" />
      {nameList.map((name, index) => (
        <BlockName
          key = {`BlockName${index}`}
          text = {name}
          matchedBlock = {matchedBlock}
        />
      ))}
    </>
  );
};

export default BlockContainer;
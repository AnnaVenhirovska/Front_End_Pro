import "./App.css";
import { React, useState } from "react";
import CustomDivElem from "./components/BlockContainer/block-container";
import { randomColor } from "./utils";
import HeaderButtons from "./components/HeaderButtons/header-buttons";

const App = () => {
  let blocksStorage = localStorage.getItem("blocksList");
  if (blocksStorage === null) blocksStorage = [];
  else blocksStorage = JSON.parse(blocksStorage);

  const [blocks, setBlocks] = useState(blocksStorage);

  const handleClick = (event) => {
    let generatedColor = randomColor();
    while (generatedColor === "#fff") {
      generatedColor = randomColor();
    }
    setBlocks((previous) => {
      const newItems = [
        ...previous,
        {
          blockWidth: 100,
          blockHeight: 100,
          color: generatedColor,
          screenX: event.clientX - 50,
          screenY: event.clientY - 50,
        },
      ];
      localStorage.setItem("blocksList", JSON.stringify(newItems));
      return newItems;
    });
  };

  const ModifyBlock = (BlockID, Color, Width, Height) => {
    setBlocks((previous) => {
      let outputBlocks = [...previous];
      outputBlocks[BlockID].color = Color;
      outputBlocks[BlockID].blockWidth = Width;
      outputBlocks[BlockID].blockHeight = Height;
      localStorage.setItem("blocksList", JSON.stringify(outputBlocks));
      return outputBlocks;
    });
  };

  return (
    <>
      <HeaderButtons setBlocks={(value) => setBlocks(value)} />
      <div onClick={handleClick} className="container-blocks">
        {blocks.map((block, index) => (
          <CustomDivElem
            key={`BlockName${index}`}
            itemKey={`BlockName${index}`}
            ScreenX={block.screenX}
            ScreenY={block.screenY}
            Width={block.blockWidth}
            Height={block.blockHeight}
            backgroundcolor={block.color}
            ModifyBlockFunction={ModifyBlock}
          />
        ))}
      </div>
    </>
  );
};

export default App;
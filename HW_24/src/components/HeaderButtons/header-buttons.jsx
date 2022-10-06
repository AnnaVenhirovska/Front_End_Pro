import React, { useRef } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { randomNumber } from "../../utils";

const HeaderButtons = ({ setBlocks }) => {
  const intervalInstance = useRef(null);

  const randomizeBlock = (objectInstance) => {
    const screenWidth = document.body.clientWidth,
      screenHeight = document.body.clientHeight;

    let xPos = objectInstance.screenX,
      yPos = objectInstance.screenY;
    xPos += randomNumber(-7, 7);

    if (xPos < 0) xPos = 0;

    if (xPos + objectInstance.blockWidth > screenWidth)
      xPos = screenWidth - objectInstance.blockWidth;

    yPos += randomNumber(-7, 7);
    if (yPos < 67) yPos = 67;

    if (yPos + objectInstance.blockHeight > screenHeight)
      yPos = screenHeight - objectInstance.blockHeight;

    objectInstance.screenX = xPos;
    objectInstance.screenY = yPos;
    return objectInstance;
  };

  const ShakeBlocks = () => {
    setBlocks((previous) => {
      let outputBlocks = [...previous];
      for (let i = 0; i < outputBlocks.length; i++) {
        outputBlocks[i] = randomizeBlock(outputBlocks[i]);
      }
      localStorage.setItem("blocksList", JSON.stringify(outputBlocks));
      return outputBlocks;
    });
  };

  const ToggleShake = () => {
    if (intervalInstance.current === null) {
      intervalInstance.current = setInterval(ShakeBlocks, 400);
      ShakeBlocks();
    } else {
      clearInterval(intervalInstance.current);
      intervalInstance.current = null;
    }
  };

  const ResetApp = (setBlocks) => {
    setBlocks([]);
    localStorage.setItem("blocksList", "[]");
  };

  return (
    <Stack
      position="relative"
      padding="15px"
      backgroundColor="darkseagreen"
      zIndex="2"
      direction="row"
      spacing={1}
      height="4vh"
    >
      <Button
        variant="contained"
        onClick={() => {
          ResetApp(setBlocks);
        }}
      >
        Reset Elements
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          ToggleShake();
        }}
        color="error"
      >
        Shake
      </Button>
    </Stack>
  );
};

export default HeaderButtons;
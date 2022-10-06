import { React, useState, useRef } from 'react';
import { Box, Button, Popper, Fade, TextField } from "@mui/material"

const CustomDivElem = ({ itemKey, ScreenX, ScreenY, Width, Height, backgroundcolor, ModifyBlockFunction }) => {
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const inputElementsParent = useRef();

    const handleClick = (event) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
        setOpen(previous => !previous);
    };

    const handleSubmit = () => {

        const blockIndex = Array.prototype.indexOf.call(anchorEl.parentNode.children, anchorEl);

        if (blockIndex >= 0) {
            const inputElements = inputElementsParent.current.querySelectorAll("input");

            const blockColor = inputElements[0].value;
            let blockWidth = parseInt(inputElements[1].value);
            let blockHeight = parseInt(inputElements[2].value);

            if (isNaN(blockHeight))
                blockHeight = 100;

            if (isNaN(blockWidth))
                blockWidth = 100;

            ModifyBlockFunction(blockIndex, blockColor, blockWidth, blockHeight);
        }

        setOpen(false);
    };

    return (
        <Box
            onClick={handleClick}
            key={`box${itemKey}`}
            sx={{
                top: ScreenY,
                left: ScreenX,
                opacity: 0,
                position: 'absolute',
                width: Width,
                height: Height,
                backgroundColor: backgroundcolor,
                cursor: "pointer",
                borderRadius: '4px',
                transition: "background-color 0.4s linear, opacity 0.4s linear, top 0.4s linear, left 0.4s linear, width 0.4s linear, height 0.4s linear",
            }}
        >
            <Popper
                ref={inputElementsParent}
                open={open}
                anchorEl={anchorEl}
                placement={"top"}
                onClick={(e) => e.stopPropagation()}
                transition
                sx={{
                    zIndex: "4",
                    borderRadius: "4px"
                }}
            >
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} sx={{ borderRadius: "4px" }}>
                        <Box p={1} bgcolor="white">
                            <TextField
                                label="Color"
                                variant="outlined"
                                type="text"
                                defaultValue={backgroundcolor}
                                sx={{
                                    width: "100px"
                                }}
                            />
                            <TextField
                                label="Width"
                                variant="outlined"
                                type="number"
                                defaultValue={Width}
                                sx={{
                                    width: "100px"
                                }}
                            />
                            <TextField
                                label="Height"
                                variant="outlined"
                                type="number"
                                defaultValue={Height}
                                sx={{
                                    width: "100px"
                                }}
                            />
                            <hr />
                            <Button variant="contained" onClick={handleSubmit}>
                                Apply changes
                            </Button>
                        </Box>
                    </Fade>
                )}
            </Popper>
        </Box>
    );
};

export default CustomDivElem;
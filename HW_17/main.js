(function() {
    if (!localStorage.indicator || !localStorage.indicator.includes("counterOne") || !localStorage.indicator.includes("counterTwo")) {
        localStorage.indicator = JSON.stringify({
            counterOne: 0,
            counterTwo: 0
        })
    }
    const indicatorParsed = JSON.parse(localStorage.indicator);

    document.querySelector('#count1').innerHTML = indicatorParsed.counterOne;
    if ('counterOnecolor' in indicatorParsed)
    document.querySelector('#block1').style.background = indicatorParsed.counterOnecolor;

    document.querySelector('#count2').innerHTML = indicatorParsed.counterTwo;
    if ('counterTwocolor' in indicatorParsed)
    document.querySelector('#block2').style.background = indicatorParsed.counterTwocolor;

    const clickerElements = document.getElementsByClassName('clicker');
    for (let i = 0; i < clickerElements.length; i++) {
        const myID = parseInt(clickerElements[i].name);
        clickerElements[i].addEventListener('click', () => increaseCounter(myID));
    }

    const clearElements = document.getElementsByClassName('clear');
    for (let i = 0; i < clearElements.length; i++) {
        const myID = parseInt(clearElements[i].name);
        clearElements[i].addEventListener('click', () => clearCounter(myID));
    }

    const setElements = document.querySelector('.set');

    setElements.addEventListener('click', () => {
        const inputs = setElements.parentNode.children;
        const counterID = parseInt(inputs[0].value);
              value = parseInt(inputs[1].value);

        if (isNaN(counterID) || isNaN(value) || counterID > 2 || counterID < 1)
        return;

        setBlockValue(counterID, value);
    });

    function increaseCounter(butID) {

        const indicatorParsed = JSON.parse(localStorage.indicator);
        let butKey = "counterOne";
        if (butID === 2)
            butKey = "counterTwo";

        indicatorParsed[butKey]++;

        setBlockValue(butID, indicatorParsed[butKey]);
    }

    function setBlockValue(butID, counterValue) {
        const indicatorParsed = JSON.parse(localStorage.indicator);

        let butKey = "counterOne";
        let blockID = "block1";
        if (butID === 2) {
            butKey = "counterTwo";
            blockID = "block2";
        }

        if (indicatorParsed[butKey] === counterValue)
        return;

        blockID = document.getElementById(blockID);

        indicatorParsed[butKey] = counterValue;

        if (indicatorParsed[butKey] != 0 && indicatorParsed[butKey] < 50) {
            const blockColor = "rgb(" + randomColor() + ")";
            indicatorParsed[butKey + "color"] = blockColor;
            blockID.style.background = blockColor;
        }
        else {
            delete indicatorParsed[butKey + "color"];
            blockID.style.backgroundColor = null;
        }
        localStorage.indicator = JSON.stringify(indicatorParsed);
        document.querySelector('#count' + butID).innerHTML = indicatorParsed[butKey];
    }

    function clearCounter(butID) {
        setBlockValue(butID, 0);
    }

    function randomColor() {
        function randomValue() {
            return Math.floor(Math.random() * 255) + 1;
        }
        return randomValue() + "," + randomValue() + "," + randomValue();
    }

}());
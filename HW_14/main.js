(function() {
    const sliderElement = document.getElementById('slider'),
          inputElement = document.getElementById("input"),
          visualBlock1 = document.getElementById("block1"),
          visualBlock2 = document.getElementById("block2"),
          valueLabel = document.getElementById("valueLabel"),
          comissionLabel = document.getElementById("comissionLabel");

    sliderElement.addEventListener("input", valueChanged);
    inputElement.addEventListener("input", valueChanged);

    function valueChanged(e) {
        let newValue;
        if (e.target === sliderElement) {
            newValue = sliderElement.value;
            inputElement.value = newValue;
        }
        else if (e.target === inputElement) {
            newValue = parseInt (inputElement.value);
            if (isNaN(newValue)) {
                if (inputElement.value.length === 0) {
                    newValue = sliderElement.value = sliderElement.min;
                }
                else {
                    newValue = sliderElement.value;
                    inputElement.value = newValue;
                }
            }
            else if (newValue < sliderElement.min) {
                newValue = sliderElement.min;
                inputElement.value = newValue;
            }
            else if (newValue > sliderElement.max) {
                newValue = sliderElement.max;
                inputElement.value = newValue;
            }
            sliderElement.value = newValue;
        }

        visualBlock1.style.height = newValue + "px";

        let comission;
        if (newValue < 20)
        comission = (newValue / 100) * 2;
        else if (newValue < 50)
        comission = (newValue / 100) * 4;
        else if (newValue < 75)
        comission = (newValue / 100) * 6;
        else if (newValue <= 100)
        comission = (newValue / 100) * 8;

        valueLabel.innerText = newValue;
        comissionLabel.innerText = comission.toFixed(2);

        visualBlock2.style.height = comission + "px";
    }

}());
window.onload = function() {

    const inputs = document.querySelectorAll(".input"),
          textArea = document.querySelector(".textzone");

    setInterval( function() {
        let text = "";

        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].value != "") {
                text += inputs[i].value;
                if (i < inputs.length - 1) {
                    text += ", ";
                }
            }
        }

        textArea.value = text;
    }, 3000);
}
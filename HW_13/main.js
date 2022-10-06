function clockOn() {
    
    let pageLoad_TimeStamp, 
        spansContainer;

    pageLoad_TimeStamp = Date.now();
    setInterval(clockTick, 1000);

    spansContainer = document.createElement('div');
    spansContainer.append(document.createElement('span'));
    spansContainer.append(document.createElement('span'));
    document.body.append(spansContainer);

    clockTick();

    function clockTick() {
        const timePassed = Math.round((Date.now() - pageLoad_TimeStamp) / 1000);

        const clock = new Date(timePassed * 1000);

        const result = clock.getUTCHours().toString().padStart(2, 0) + ":" + clock.getUTCMinutes().toString().padStart(2, 0) + ":" + clock.getUTCSeconds().toString().padStart(2, 0);

        const titleContent = new Date().toLocaleTimeString() + " - " + result;

        document.title = titleContent;

        const spanElements = document.getElementsByTagName("span");
        for (let i = 0; i < spanElements.length; i++)
        spanElements[i].innerHTML = titleContent + "<br>";

    }
}

clockOn();
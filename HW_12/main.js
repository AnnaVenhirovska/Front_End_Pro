data = {
    name: 'menu',
    type: 'column',
    items: [
        {
            title: 'title 1',
            handler: 'ActionAdd'
        },
        {
            title: 'title 2',
            handler: 'ActionSaveAs',
            items: [
                { title: 'inner 1' }, { title: 'inner 2' }
            ]
        },
        {
            title: 'title 3',
            handler: 'ActionExit'
        }
    ]
}

function showArguments() {
    if (arguments[0].length > 0)
    console.log(arguments[0]);
}

const actions = {
    ActionAdd: function () {
        console.log("CALLED ActionAdd");
        showArguments(arguments);
    },
    ActionSaveAs: function () {
        console.log("CALLED ActionSaveAs");
        showArguments(arguments);
    },
    ActionExit: function () {
        console.log("CALLED ActionExit");
        showArguments(arguments);
    }
}

function drawDropDown() {
    if (data.type === 'column') {
        drawDropDownProcess(false);
    } else if (data.type === 'row') {
        drawDropDownProcess(true);
    }
}

function drawDropDownProcess(horizontal) {
    const menuHandler = document.createElement("ul");

    if (horizontal)
    menuHandler.className = "HorizontaldropDown";
    else
    menuHandler.className = "VerticaldropDown";

    for (let i = 0; i < data.items.length; i++) {
        const callFunction = data.items[i].handler;

        const menuItem = document.createElement("li");

        menuItem.innerText = data.items[i].title;

        if ('items' in data.items[i]) {
            const innerNav = document.createElement("ul");
            innerNav.className = "innerNav";

            for (let j = 0; j < data.items[i].items.length; j++) {
                const innerItem = document.createElement("li");
                innerItem.className = "hoverableItem";
                innerItem.innerText = data.items[i].items[j].title;

                innerNav.append(innerItem);
            }
            menuItem.append(innerNav);
        }
        menuItem.onclick = function (target) {
            if (target.target.className === "hoverableItem") {
                actions[callFunction]( target.target.innerText);
            } else {
                actions[callFunction]();
            }
        }
        menuHandler.append(menuItem);
    }
    document.body.append(menuHandler);
}

drawDropDown();
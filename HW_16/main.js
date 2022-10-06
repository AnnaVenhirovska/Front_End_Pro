class GameCharacter {
    constructor(targetElement, step, h, animated = false) {
        this.animated = animated,
        this.aniamating = false,
        this.upArrow = 38,
        this.downArrow = 40,
        this.leftArrow = 37,
        this.rightArrow = 39,
        this.jumpKey = 32,
        this.keyCrunch = 17,
        this.crunching = false,
        this.h = h,
        this.step = step,
        this.gameHeight = window.innerHeight,
        this.gameWidth = window.innerWidth,
        this.targetElement = targetElement,
        this.myX = 0,
        this.myY = 0,
        this.characterWidth = 100,
        this.characterHeight = 100
    };

    start() {

        let characterStyle = "position: fixed; ";

        if (!this.animated) {
            characterStyle += "width: " + this.characterWidth + "px; ";
            characterStyle += "height: " + this.characterHeight + "px; ";
        }

        characterStyle += "background-color: red; ";

        this.myX = Math.round(((this.gameWidth / 2) - (this.characterWidth / 2)));
        this.myY = Math.round(((this.gameHeight / 2) - (this.characterHeight / 2)));

        characterStyle += "top: " + this.myY + "px; ";
        characterStyle += "left: " + this.myX + "px; ";

        if (this.animated) {
            characterStyle += "transition: left 0.2s ease, top 0.2s ease, right 0.2s ease, bottom 0.2s ease; ";
            characterStyle += "right: " + (this.gameWidth - this.myX - this.characterWidth) + "px; ";
            characterStyle += "bottom: " + (this.gameHeight - this.myY - this.characterHeight) + "px; ";
        }

        characterStyle += "border-radius: 4px";

        this.targetElement.style = characterStyle;
    };

    Movement = {
        MoveLeft: function () {
            if (this.aniamating)
                return;

            if (this.animated) {
                this.moveAnimated.MoveLeft.call(this);
                return;
            }

            let newX = this.myX - this.step;
            if (newX < 0)
                newX = 0;

            this.targetElement.style.left = newX + "px";
            this.myX = newX;
        },
        MoveRight: function () {
            if (this.aniamating)
                return;

            if (this.animated) {
                this.moveAnimated.MoveRight.call(this);
                return;
            }

            let newX = this.myX + this.step;
            if ((newX + this.characterWidth) > this.gameWidth)
                newX = (this.gameWidth - this.characterWidth);

            this.targetElement.style.left = newX + "px";
            this.myX = newX;
        },
        MoveUp: function () {

            if (this.aniamating)
                return;

            if (this.animated) {
                this.moveAnimated.MoveUp.call(this);
                return;
            }

            if (this.crunching)
                return;
            let newY = this.myY - this.step;
            if (newY < 0)
                newY = 0;

            this.targetElement.style.top = newY + "px";
            this.myY = newY;
        },
        MoveDown: function () {
            if (this.aniamating)
                return;

            if (this.animated) {
                this.moveAnimated.MoveDown.call(this);
                return;
            }

            if (this.crunching)
                return;

            let newY = this.myY + this.step;

            if ((newY + this.characterHeight) > this.gameHeight)
                newY = (this.gameHeight - this.characterHeight);

            this.targetElement.style.top = newY + "px";
            this.myY = newY;
        }
    };

    moveAnimated = {
        MoveLeft: function () {
            if (this.animating || !this.animated)
                return;

            this.aniamating = true;

            let newX = this.myX - this.step;
            if (newX < 0)
                newX = 0;

            let stepTaken = this.myX - newX;

            this.targetElement.style.left = newX + "px";
            this.myX = newX;

            setTimeout(function (instance) {
                instance.targetElement.style.right = (instance.gameWidth - instance.myX - instance.targetElement.clientWidth + stepTaken) + "px";

                setTimeout(function (instance) {
                    instance.aniamating = false;
                }, 180, instance);
            }, 180, this);

        },
        MoveRight: function () {
            if (this.animating || !this.animated)
                return;

            this.aniamating = true;

            let rightMargin = parseInt(this.targetElement.style.right);
            let newRight = rightMargin - this.step;
            if (newRight < 0)
                newRight = 0;

            let stepTaken = rightMargin - newRight;

            this.targetElement.style.right = newRight + "px";

            setTimeout(function (instance) {
                let newX = (instance.gameWidth - newRight - instance.targetElement.clientWidth + stepTaken);

                instance.targetElement.style.left = newX + "px";
                instance.myX = newX;

                setTimeout(function (instance) {
                    instance.aniamating = false;
                }, 180, instance);
            }, 180, this);
        },
        MoveUp: function () {
			if (this.animating || !this.animated)
                return;
			
            if (this.crunching)
                return;

            this.aniamating = true;

            let newY = this.myY - this.step;
            if (newY < 0)
                newY = 0;

            this.targetElement.style.top = newY + "px";
            this.myY = newY;

            setTimeout(function (instance) {
                instance.targetElement.style.bottom = (instance.gameHeight - instance.myY - instance.characterHeight) + "px";

                setTimeout(function (instance) {
                    instance.aniamating = false;
                }, 180, instance);
            }, 180, this);
        },
		MoveDown: function() {
            this.aniamating = true;

            let newBottom = parseInt(this.targetElement.style.bottom) - this.step;
            if (newBottom < 0)
                newBottom = 0;

            this.targetElement.style.bottom = newBottom + "px";

            setTimeout(function (instance) {
                let newY = (instance.gameHeight - newBottom - instance.characterHeight);
                instance.targetElement.style.top = newY + "px";
                instance.myY = newY;

                setTimeout(function (instance) {
                    instance.aniamating = false;
                }, 180, instance);
            }, 180, this);
        }
    };

    jump() {
        if (this.aniamating || this.crunching)
            return;

        this.aniamating = true;

        let newY = this.myY - this.h;
        if (newY < 0)
            newY = 0;

        this.targetElement.style.top = newY + "px";

        if (!this.animated) {
            setTimeout(function (instance) {
                instance.targetElement.style.top = instance.myY + "px";
                instance.aniamating = false;
            }, 300, this);
        } else {
            setTimeout(function (instance) {
                instance.targetElement.style.bottom = parseInt(instance.targetElement.style.bottom) + instance.h + "px";

                setTimeout(function (instance) {
                    instance.targetElement.style.bottom = parseInt(instance.targetElement.style.bottom) - instance.h + "px";

                    setTimeout(function (instance) {
                        instance.targetElement.style.top = instance.myY + "px";

                        setTimeout(function (instance) {
                            instance.aniamating = false;
                        }, 180, instance);
                    }, 180, instance);
                }, 400, instance);
            }, 180, this);
        }
    };

    crunch() {
        if (this.aniamating || this.crunching)
            return;

        if (!this.animated) {
            const newX = this.myX - ((this.characterWidth / 100) * 7.5);
            this.targetElement.style.left = newX + "px";
            this.myX = newX;

            const newY = this.myY + ((this.characterHeight / 100) * 20);
            this.targetElement.style.top = newY + "px";
            this.myY = newY;

            this.targetElement.style.height = ((this.characterHeight / 100) * 60) + "px";
            this.targetElement.style.width = ((this.characterWidth / 100) * 115) + "px";
        } else {
            const widthAbstract = ((this.characterWidth / 100) * 7);
            this.myX -= widthAbstract;
            this.targetElement.style.left = this.myX + "px";

            const rightInt = parseInt(this.targetElement.style.right);
            this.targetElement.style.right = (rightInt - widthAbstract) + "px";

            const heightAbstract = ((this.characterHeight / 100) * 20);
            this.targetElement.style.top = (this.myY + heightAbstract) + "px";

            const bottomInt = parseInt(this.targetElement.style.bottom);
            this.targetElement.style.bottom = (bottomInt + heightAbstract) + "px";
        }

        this.crunching = true;
    };

    standUp() {
        if (this.aniamating || !this.crunching)
            return;

        if (!this.animated) {
            const newX = this.myX + ((this.characterWidth / 100) * 7.5);
            this.targetElement.style.left = newX + "px";
            this.myX = newX;

            const newY = this.myY - ((this.characterHeight / 100) * 20);
            this.targetElement.style.top = newY + "px";
            this.myY = newY;

            this.targetElement.style.height = this.characterHeight + "px";
            this.targetElement.style.width = this.characterWidth + "px";
        } else {
            const widthAbstract = ((this.characterWidth / 100) * 7);
            this.myX += widthAbstract;
            this.targetElement.style.left = this.myX + "px";

            const rightInt = parseInt(this.targetElement.style.right);
            this.targetElement.style.right = (rightInt + widthAbstract) + "px";

            const heightAbstract = ((this.characterHeight / 100) * 20);
            this.targetElement.style.top = this.myY + "px";

            const bottomInt = parseInt(this.targetElement.style.bottom);
            this.targetElement.style.bottom = (bottomInt - heightAbstract) + "px";
        }

        this.crunching = false;

    };

    randomColor() {
        function randomValue() {
            return Math.floor(Math.random() * 255) + 1;
        }
        this.targetElement.style.backgroundColor = `rgb(${randomValue()}, ${randomValue()}, ${randomValue()})`;
    };

    dispose() {

        this.animated = null;
        this.aniamating = null;
        this.upArrow = null;
        this.downArrow = null;
        this.leftArrow = null;
        this.rightArrow = null;
        this.jumpKey = null;
        this.keyCrunch = null;
        this.crunching = null;
        this.h = null;
        this.step = null;
        this.gameHeight = null;
        this.gameWidth = null;
        this.targetElement.style = "";
        this.targetElement.remove();
        this.targetElement = null;
        this.myX = null;
        this.myY = null;
        this.characterWidth = null;
        this.characterHeight = null;
    };

    OnKeyUp(e) {
        if (e.keyCode === this.keyCrunch) {
            this.standUp();

            console.log("Stand Up");
        }
    }

    OnKeyDown(e) {
        if (e.keyCode === this.leftArrow) {
            this.Movement.MoveLeft.call(this);

            console.log("LEFT");
        } else if (e.keyCode === this.rightArrow) {
            this.Movement.MoveRight.call(this);

            console.log("RIGHT");
        } else if (e.keyCode === this.upArrow) {
            this.Movement.MoveUp.call(this);

            console.log("UP");
        } else if (e.keyCode === this.downArrow) {
            this.Movement.MoveDown.call(this);

            console.log("DOWN");
        } else if (e.keyCode === this.jumpKey) {
            this.jump();

            console.log("JUMP");
        } else if (e.keyCode === this.keyCrunch) {
            this.crunch();

            console.log("Sit")
        }
    }
};

const gameCharacter = new GameCharacter(document.getElementById("character"), 20, 50, true);
gameCharacter.start();
document.addEventListener("keydown", function (e) {
    gameCharacter.OnKeyDown.call(gameCharacter, e);
});
document.addEventListener("keyup", function (e) {
    gameCharacter.OnKeyUp.call(gameCharacter, e);
});

class MenuActions {
    constructor(list, handlers, menuContainer, targetContainer = document) {
        this.handlers = handlers;
        this.menuContainer = menuContainer;
        this.targetContainer = targetContainer;

        this.prepareItems(list);
        this.initHandlers();
    }

    prepareItems(source) {
        this.menuContainer.innerHTML = `${source.map((item) => `<div class="item" data-id = "${item.id}">${item.title}</div>`).join('') }`;
    }

    enable() {
        this.menuContainer.classList.add('active');
    }

    disable() {
        this.menuContainer.classList.remove('active');
    }

    positioning(x, y) {
        this.menuContainer.style.left = `${x}px`;
        this.menuContainer.style.top = `${y}px`;
    }

    initHandlers() {
        this.targetContainer.addEventListener('contextmenu', event => {
            event.preventDefault();
            event.stopPropagation();

            this.positioning(event.clientX + 10, event.clientY + 10);
            this.enable();

            let reposition = false;

            let xPositionInPage = event.clientX + 10 + this.menuContainer.clientWidth;

            if (xPositionInPage > window.innerWidth) {
                xPositionInPage = window.innerWidth - this.menuContainer.clientWidth - 10;
                reposition = true;
            } else {
                xPositionInPage = event.clientX + 10;
            }

            let yPositionInPage = event.clientY + 10 + this.menuContainer.clientHeight;

            if (yPositionInPage > window.innerHeight) {
                yPositionInPage = window.innerHeight - this.menuContainer.clientHeight - 10;
                reposition = true;
            } else {
                yPositionInPage = event.clientY + 10;
            }

            if (reposition)
                this.positioning(xPositionInPage, yPositionInPage);
        });

        this.menuContainer.addEventListener('click', (event) => {
            const id = event.target.dataset.id;

            if (!this.handlers[id]) {
                return console.warn('No handlers for id - ', id);
            }
            this.handlers[id](this.targetContainer);
        });

        document.addEventListener('click', () => {
            this.disable();
        });
    }
};

window.addEventListener('load', () => {
    const blockList = [{
            title: "Jump",
            id: 'b1'
        }, {
            title: "Change color",
            id: 'b2'
        }, {
            title: "Delete",
            id: 'b3'
        }
    ];

    const blackMenuHandlers = {
        b1: () => gameCharacter.jump(),
        b2: () => gameCharacter.randomColor(),
        b3: () => gameCharacter.dispose()
    };
    const block = document.querySelector('#character');
    const blockMenu = document.querySelector('.block-menu');
    new MenuActions(blockList, blackMenuHandlers, blockMenu, block);
});
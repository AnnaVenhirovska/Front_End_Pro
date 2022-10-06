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

    if(!this.animated) {  
        characterStyle += "width: " + this.characterWidth + "px; ";
        characterStyle += "height: " + this.characterHeight + "px; ";           
    }

    characterStyle += "background-color: red; ";

    this.myX = Math.round(((this.gameWidth / 2) - (this.characterWidth / 2))); 
    this.myY = Math.round (((this.gameHeight / 2) - (this.characterHeight / 2)));

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


    move(side) {
        if (this.aniamating)
        return;

        if (this.animated) {
            this.moveAnimated(side);
            return;
        }

        if ('left' in side === true) {
            let newX = this.myX - this.step;
            if (newX < 0)
                newX = 0;
            
            this.targetElement.style.left = newX + "px";
            this.myX = newX;
        }
        if ('right' in side === true) {
            let newX = this.myX + this.step;
            if ((newX + this.characterWidth) > this.gameWidth)
                 newX = (this.gameWidth - this.characterWidth);

            this.targetElement.style.left = newX + "px";
            this.myX = newX;
        }

        if(this.crunching)
        return;

        if ('up' in side === true) {
            let newY = this.myY - this.step;
            if (newY < 0)
                newY = 0;

            this.targetElement.style.top = newY + "px";
            this.myY = newY;
        }

        if ('down' in side === true) {
            let newY = this.myY + this.step;

            if((newY + this.characterHeight) > this.gameHeight)
                newY = (this.gameHeight - this.characterHeight);

            this.targetElement.style.top = newY + "px";
            this.myY = newY;
        }
    };

    moveAnimated(side) {

        if (this.animating || !this.animated)
        return;

        if ('left' in side === true) {
           this.aniamating = true;

        let newX = this.myX - this.step;
        if (newX < 0)
            newX = 0;

        let stepTaken = this.myX - newX;

        this.targetElement.style.left = newX + "px";
        this.myX = newX;

        setTimeout(function(instance) {
            instance.targetElement.style.right = (instance.gameWidth - instance.myX - instance.targetElement.clientWidth + stepTaken) + "px";

            setTimeout(function(instance) {
                instance.aniamating = false;
            }, 180, instance);
        }, 180, this);
           
       }

       if ('right' in side === true) {
           this.aniamating = true;

           let rightMargin = parseInt(this.targetElement.style.right);
           let newRight = rightMargin - this.step;
           if (newRight < 0)
               newRight = 0;

            let stepTaken = rightMargin - newRight;

            this.targetElement.style.right = newRight + "px";

            setTimeout(function(instance) {
                let newX = (instance.gameWidth - newRight - instance.targetElement.clientWidth + stepTaken);

                instance.targetElement.style.left = newX + "px";
                instance.myX = newX;

                setTimeout(function(instance) {
                    instance.aniamating = false;
                }, 180, instance);
            }, 180, this);
       }

       if (this.crunching)
       return;

       if ('up' in side === true) {
           this.aniamating = true;

           let newY = this.myY - this.step;
           if (newY < 0)
               newY = 0;

           this.targetElement.style.top = newY + "px";
           this.myY = newY;

           setTimeout(function(instance) {
               instance.targetElement.style.bottom = (instance.gameHeight - instance.myY - instance.characterHeight) + "px";

               setTimeout(function(instance) {
                   instance.aniamating = false;
               }, 180, instance);
           }, 180, this);
       }

       if ('down' in side === true) {
           this.aniamating = true;

           let newBottom = parseInt(this.targetElement.style.bottom) - this.step;
           if (newBottom < 0)
               newBottom = 0;
            
            this.targetElement.style.bottom = newBottom + "px";

            setTimeout(function(instance) {
                let newY = (instance.gameHeight - newBottom - instance.characterHeight);
                instance.targetElement.style.top = newY + "px";
                instance.myY = newY;

                setTimeout(function(instance) {
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
            setTimeout(function(instance) {
                instance.targetElement.style.top = instance.myY + "px";
                instance.aniamating = false;
            }, 300, this);
        }
        else {
            setTimeout(function(instance) {
                instance.targetElement.style.bottom = parseInt(instance.targetElement.style.bottom) + instance.h + "px";

                setTimeout(function(instance) {
                    instance.targetElement.style.bottom = parseInt(instance.targetElement.style.bottom) - instance.h + "px";

                    setTimeout(function(instance) {
                        instance.targetElement.style.top = instance.myY + "px";

                        setTimeout(function(instance) {
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
        }
        else {
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
        }
        else {
            const widthAbstract = ((this.characterWidth / 100) * 7);
            this.myX += widthAbstract;
            this.targetElement.style.left = this.myX + "px";

            const rightInt = parseInt(this.targetElement.style.right);
            this.targetElement.style.right = (rightInt + widthAbstract) + "px";

            const heightAbstract = ((this.characterHeight / 100) * 20);
            this.targetElement.style.top = this.myY  + "px";
            
            const bottomInt = parseInt(this.targetElement.style.bottom);
            this.targetElement.style.bottom = (bottomInt - heightAbstract) + "px";
        }

        this.crunching = false;

    };
};

const gameCharacter = new GameCharacter(document.getElementById("character"), 20, 50, true);
gameCharacter.start();

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

function keyUp(e) {
    if (e.keyCode === gameCharacter.keyCrunch) {
        gameCharacter.standUp();

        console.log("Stand Up");
    }
}

function keyDown(e) {
    if (e.keyCode === gameCharacter.leftArrow) {
        gameCharacter.move({left:true});

        console.log("LEFT");
    }
    else if (e.keyCode === gameCharacter.rightArrow) {
        gameCharacter.move({right:true});

        console.log("RIGHT");
    }
    else if (e.keyCode === gameCharacter.upArrow) {
        gameCharacter.move({up:true});

        console.log("UP");
    }
    else if (e.keyCode === gameCharacter.downArrow) {
        gameCharacter.move({down:true});

        console.log("DOWN");
    }
    else if (e.keyCode === gameCharacter.jumpKey) {
        gameCharacter.jump();

        console.log("JUMP");
    }
    else if (e.keyCode === gameCharacter.keyCrunch) {
        gameCharacter.crunch();

        console.log("Sit")
    }
};
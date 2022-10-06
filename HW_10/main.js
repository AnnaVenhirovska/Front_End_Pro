class SuperArray {
    constructor(n, m, { min, max}) {
        this.n = n;
        this.m = m;
        this.min = min;
        this.max = max;
        this.marker = null;
        this.arr = [];
        this.randomGenerator = () =>
        Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
        this.fill();
    }

    fill() {
        for (let i = 0; i < this.n; i++) {
            this.arr[i] = [];
            for (let j = 0; j < this.m; j++) {
                this.arr[i][j] = this.randomGenerator();
            }
        }
    };

    render(separator) {
        for (let i = 0; i < this.n; i++) {
            for (let j = 0; j < this.m; j++) {
                this.arr[i][j] + " ";
            }
        }
        document.write(this.arr.join("<br />"), ("<br />"), separator, "<br />" );
    };

    clear(direction, k) {
        if (direction === "row") {
            for (let i = 0; i < this.m; i++) {
                this.arr[k][i] = 0;
            }
        } else if (direction === "column") {
            for (let i = 0; i < this.n; i++) {
                this.arr[i][k] = 0;
            }
        }
    };

    setMarker({ x, y}) {
        this.marker = [this.arr[x][y], x, y];
        this.arr[x][y] = "&";
    };

    goTo({ x, y }) {
        let markerValue = this.marker[0],
            markerX = this.marker[1],
            markerY = this.marker[2];

        this.arr[markerX][markerY] = markerValue;

        this.marker = [this.arr[x][y], x, y];
        this.arr[x][y] = "&";
    };

    shift({direction}) {
        if (direction === "left") {
            let markerValue = this.marker[0], x = this.marker[1], y = this.marker[2];
            if (y === 0) {
                this.arrp[x][y] = markerValue;

                let newMarkerY = this.m - 1;

                this.marker = [this.arr[x][newMarkerY], x, newMarkerY];
                this.arr[x][newMarkerY] = "&";
            } else {
                this.arr[x][y] = markerValue;

                let newMarkerY = y - 1;
                
                this.marker = [this.arr[x][newMarkerY], x, newMarkerY];
                this.arr[x][newMarkerY] = "&";
            }
        } else if (direction === "right") {
            let markerValue = this.marker[0], x = this.marker[1], y = this.marker[2];
            if (y === this.m - 1) { 
                this.arr[x][y] = markerValue;

                let newMarkerY = 0;

                this.marker = [this.arr[x][newMarkerY], x, newMarkerY];
                this.arr[x][newMarkerY] = "&";
            } else {
                this.arr[x][y] = markerValue;

                let newMarkerY = y + 1;

                this.marker = [this.arr[x][newMarkerY], x, newMarkerY];
                this.arr[x][newMarkerY] = "&";
            }
        } else if (direction === "top") {
            let markerValue = this.marker[0], x = this.marker[1], y = this.marker[2];
            if (x === 0) {
                this.arr[x][y] = markerValue;

                let newMarkerX = this.n - 1;

                this.marker = [this.arr[newMarkerX][y], newMarkerX, y];
                this.arr[newMarkerX][y] = "&";
            } else {
                this.arr[x][y] = markerValue;

                let newMarkerX = x - 1;

                this.marker = [this.arr[newMarkerX][y], newMarkerX, y];
                this.arr[newMarkerX][y] = "&";
            }
        } else if (direction === "bottom") {
            let markerValue = this.marker[0], x = this.marker[1], y = this.marker[2];
            if (x === this.n - 1) {
                this.arr[x][y] = markerValue;

                let newMarkerX = 0;

                this.marker = [this.arr[newMarkerX][y], newMarkerX, y];
                this.arr[newMarkerX][y] = "&";
            } else {
                this.arr[x][y] = markerValue;

                let newMarkerX = x + 1;

                this.marker = [this.arr[newMarkerX][y], newMarkerX, y];
                this.arr[newMarkerX][y] = "&";
            }
        }
    };

}

let createdArray = new SuperArray(10, 10, {min: 10, max: 55});
console.log(createdArray);

createdArray.clear("column", 2);

createdArray.setMarker({x: 6, y: 9});

createdArray.goTo({x: 2, y: 4});

createdArray.shift({direction: "bottom"});

createdArray.render("------------------------------------");
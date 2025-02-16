var robot = require('robotjs'); // include modules that exist in seperate files

function main() {
    sleep(4000);

    let btn = findHex();
    robot.moveMouseSmooth(btn.x, btn.y);
}

function findHex() {
    var x = 0, y = 0, width = 2560, height = 1600;
    let img = robot.screen.capture(x,y,width,height);

    var hexColors = ["f4bf4f","f4bf4e"];

    let stepX = 10;
    let stepY = 10;

    for (let i = 0; i < width; i += stepX) {
        for (let j = 0; j < height; j += stepY) {
            var sampleColor = img.colorAt(i, j);

            if (hexColors.includes(sampleColor)) {
                let adjustedCoords = coordAdjustment.divide(i,j);
                console.log(sampleColor + " found at " + adjustedCoords.x + ", " + adjustedCoords.y);

                return {x : adjustedCoords.x, y : adjustedCoords.y};    
            }
        } 
    } return false;
}

var coordAdjustment = {
    multiply : function(x, y) {
        return { 
            x: Math.floor(x * 2), 
            y: Math.floor(y * 2) 
        }
    },
    divide : function(x,y) {
        return {
            x: Math.floor(x / 2), 
            y: Math.floor(y / 2) 
        }
    }
}

function sleep(ms) {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)),0,0,ms)
}

function getRandomInt(min,max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

main();

/* 
TODO

Make it where once that coordinate no longer equals the specified
hex value, it repeats the findRock() function and starts the process
over, therefore creating a loop.

Also, see if there's any way to speed up the findRock() process.
*/
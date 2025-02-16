var robot = require('robotjs'); // include modules that exist in seperate files

function main() {
    sleep(4000);

    let btn = findRock();
    robot.moveMouseSmooth(btn.x, btn.y);
    robot.mouseClick();
}

function findRock() {
    var x = 0, y = 0, width = 2560, height = 1600;
    let img = robot.screen.capture(x,y,width,height);

    var rockColors = ["7b706f","4d4646","605757","6b6261","6e6463","756b6a","675d5d","574f4e"];

    let stepX = 10;
    let stepY = 10;

    for (let i = 0; i < width; i += stepX) {
        for (let j = 0; j < height; j += stepY) {
            var sampleColor = img.colorAt(i, j);

            if (rockColors.includes(sampleColor)) {
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
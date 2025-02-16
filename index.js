// import the robotjs library
var robot = require('robotjs'); // include modules that exist in seperate files

function main() {
    
    console.log("Starting...");
    sleep(4000);

    while (true) {
        
        var rock = findRock();

        if (rock == false) {
            console.log("No rock found");
            break;
        }

        // let coords = coordAdjustment.divide(rock.x,rock.y)

        robot.moveMouseSmooth(rock.x,rock.y); 
        robot.mouseClick();
        sleep(8000);

    }
    
    console.log("Done.");

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
            x: Math.floor(x / 4), 
            y: Math.floor(y / 4) 
        }
    }
}

function testScreenCapture() {
    sleep(4000);

    // var hexColors = {
    //     hex1 : 
    // }

    let coords = getAdjustedCoordinates(37, 43);
    let img = robot.screen.capture(0,0,2560,1600);
    console.log(img.colorAt(coords.x, coords.y));
}

function testScreenSize() {
    let screenSize = robot.getScreenSize(0,0);
    console.log(screenSize);
}

function findRock() {
    var x = 0, y = 0, width = 1440, height = 900;
    let img = robot.screen.capture( x, y, width, height);

    var rockColors = ["7b706f","4d4646","605757","6b6261","6e6463","756b6a","675d5d","574f4e"];

    for(let i = 0; i < 1000; i++) {
        var randomX = getRandomInt(0, (width-1));
        var randomY = getRandomInt(0, (height-1));

        // let coords = coordAdjustment.multiply(randomX, randomY);
        let coords = {x : randomX, y: randomY}

        var samepleColor = img.colorAt(coords.x,coords.y);

        if (rockColors.includes(samepleColor)) {
            console.log("BEFORE OFFSET: Found rock at: " + coords.x + " " + coords.y + ". Color: " + samepleColor);

            var screenX = coords.x + x;
            var screenY = coords.y + y;

            // let coords = coordAdjustment.multiply(screenX, screenY);

            console.log("Found rock at: " + screenX + " " + screenY + ". Color: " + samepleColor);
            
            return {x: screenX, y: screenY};
        }
    }
    return false;
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
// testScreenCapture();
// testScreenSize();


// error with clicking on the rocks
// changed the x and y on the find rock function by subtracting 100 from each
// seems to still not be working but difficult to tell
// See if you can make out the areas that it's detecting, like where the rocks likely are
// because a couple of the clicks are actually close, but just miss them.
// we're almost there I think

// latest terminal

/*
Starting...
Found rock at: 753 550. Color: 4d4646
Found rock at: 755 554. Color: 4d4646
Found rock at: 996 589. Color: 675d5d
Found rock at: 1086 384. Color: 756b6a
Found rock at: 758 567. Color: 4d4646
Found rock at: 503 421. Color: 574f4e
Found rock at: 1134 331. Color: 675d5d
Found rock at: 701 366. Color: 6e6463
Found rock at: 589 472. Color: 6b6261
Found rock at: 477 431. Color: 7b706f
Found rock at: 1173 372. Color: 6b6261
Found rock at: 551 516. Color: 675d5d
Found rock at: 487 458. Color: 605757
Found rock at: 989 594. Color: 675d5d
Found rock at: 612 418. Color: 574f4e
Found rock at: 1087 369. Color: 6b6261
Found rock at: 824 591. Color: 4d4646
Found rock at: 1120 382. Color: 574f4e
Found rock at: 1139 367. Color: 756b6a
Found rock at: 1103 397. Color: 6e6463
Found rock at: 1112 404. Color: 675d5d
Found rock at: 629 459. Color: 574f4e
Found rock at: 777 309. Color: 7b706f
Found rock at: 822 592. Color: 4d4646
Found rock at: 1132 427. Color: 4d4646
Found rock at: 788 300. Color: 6e6463
No rock found
Done.
*/
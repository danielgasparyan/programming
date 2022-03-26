
//! Requiring modules  --  START
var Grass = require("./modules/Grass.js");
var GrassEater = require("./modules/GrassEater.js");
var AntiGrassEatersRob = require("./modules/AntiGrassEatersRob.js");
var TestRob = require("./modules/TestRob.js");
var Merac =require("./modules/Merac.js");
var Factory = require("./modules/Factory.js");
let random = require('./modules/random');
//! Requiring modules  --  END


//! Setting global arrays  --  START
grassArr = [];
grassEaterArr = [];
antiGrassEatersRobArr = [];
testRobArr = [];
meracArr = [];
factoryArr = [];
matrix = [];
//! Setting global arrays  -- END




//! Creating MATRIX -- START
function matrixGenerator(matrixSize, grass, grassEater, AntiGrassEatersRob, TestRob, Factory) {
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = [];
        for (let o = 0; o < matrixSize; o++) {
            matrix[i][o] = 0;
        }
    }
    for (let i = 0; i < grass; i++) {
        let customX = Math.floor(random(matrixSize)); // 0-9
        let customY = Math.floor(random(matrixSize)); // 4
        matrix[customY][customX] = 1;
    }
    for (let i = 0; i < grassEater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 2;
    }
    for (let i = 0; i < AntiGrassEatersRob; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 3;
    }
    for (let i = 0; i < TestRob; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 4;
    }
    for (let i = 0; i < Merac; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 5;
    }
    for (let i = 0; i < Factory; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 6;
    }

}
matrixGenerator(20, 0, 0, 0, 0, 1);
//! Creating MATRIX -- END



//! SERVER STUFF  --  START
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);
//! SERVER STUFF END  --  END



function creatingObjects() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 2) {
                var grassEater = new GrassEater(x, y);
                grassEaterArr.push(grassEater);
            } else if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                grassArr.push(grass);
            } else if (matrix[y][x] == 3){
                var antiGrassEatersRob = new AntiGrassEatersRob(x,y);
                antiGrassEatersRobArr.push(antiGrassEatersRob);
            } else if(matrix[y][x] == 4){
                var testRob = new TestRob(x,y);
                testRobArr.push(testRob);
            } else if(matrix[y][x]==5){
                var merac = new Merac(x,y);
                meracArr.push(merac);
            } else if(matrix[y][x]==6){
                var factory = new Factory(x,y);
                factoryArr.push(factory);
            }

        }
    }
}
creatingObjects();

function game() {
    if (grassArr[0] !== undefined) {
        for (var i in grassArr) {
            grassArr[i].mul();
        }
    }
    if (grassEaterArr[0] !== undefined) {
        for (var i in grassEaterArr) {
            grassEaterArr[i].eat();
        }
    }
    if (antiGrassEatersRobArr[0] !== undefined) {
        for (var i in antiGrassEatersRobArr) {
            antiGrassEatersRobArr[i].destroy();
        }
    }
    if (testRobArr[0] !== undefined) {
        for (var i in testRobArr) {
            testRobArr[i].destroy();
        }
    }
    if (meracArr[0] !== undefined) {
        for (var i in meracArr) {
            meracArr[i].die();
        }
    }
    if (factoryArr[0] !== undefined) {
        for (var i in factoryArr) {
            factoryArr[i].produce();
        }
    }

    //! Object to send
    let sendData = {
        matrix: matrix,
        grassCounter: grassArr.length
    }

    //! Send data over the socket to clients who listens "data"
    io.sockets.emit("data", sendData);
}



setInterval(game, 500)
whether = "Garun";

var exanak = require("./Modules/exanak");
//! Requiring modules  --  START
var Grass = require("./modules/Grass.js");
var GrassEater = require("./modules/GrassEater.js");
var AntiGrassEatersRob = require("./modules/AntiGrassEatersRob.js");
var TestRob = require("./modules/TestRob.js");
var Merac = require("./modules/Merac.js");
var Factory = require("./modules/Factory.js");
let random = require('./modules/random');
//! Requiring modules  --  END
let fs = require('fs')

//! Setting global arrays  --  START
let t = 0
let t1 = 0
grassArr = [];
grassEaterArr = [];
antiGrassEatersRobArr = [];
testRobArr = [];
meracArr = [];
factoryArr = [];
matrix = [];
//! Setting global arrays  -- END

setInterval(exanak, 7500)



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
matrixGenerator(20, 2, 5, 0, 0, 1);


function Cycle(time, grass, grassEater, antiGrassEatersRob, testRob, merac, factory) {
    t++
    t1++
    if (t == time) {
        generator(grass, grassEater, antiGrassEatersRob, testRob, merac, 0)
        t = 0
    }
    if (t1 == time * 30) {
        generator(0, 0, 0, 0, 0, factory)
        t1 = 0
    }
}
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
            } else if (matrix[y][x] == 3) {
                var antiGrassEatersRob = new AntiGrassEatersRob(x, y);
                antiGrassEatersRobArr.push(antiGrassEatersRob);
            } else if (matrix[y][x] == 4) {
                var testRob = new TestRob(x, y);
                testRobArr.push(testRob);
            } else if (matrix[y][x] == 5) {
                var merac = new Merac(x, y);
                meracArr.push(merac);
            } else if (matrix[y][x] == 6) {
                var factory = new Factory(x, y);
                factoryArr.push(factory);
            }

        }
    }
}
creatingObjects();
// function poxel(){
//     if (whether=="Garun") {
//          whether="Amar"
//     }
//     else if(whether=="Amar"){
//         whether="Ashun"
//     }
//     else if(whether=="Ashun"){
//          whether = "Dzmer"
//     }
//     else{
//          whether ="Garun"
//     }
// }
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
    Cycle(6, 1, 1, 0, 0, 0, 1)

    //! Object to send
    let sendData = {
        matrix: matrix,
        grassCounter: grassArr.length,
        grassEaterCounter: grassEaterArr.length,
        antiGrassEatersRobCounter: antiGrassEatersRobArr.length,
        testRobCounter: testRobArr.length,
        meracCounter: meracArr.length,
        factoryCounter: factoryArr.length,
        whether: whether
    }

    //! Send data over the socket to clients who listens "data"
    io.sockets.emit("data", sendData);
}


// io.sockets.emit('exanak',whether)
setInterval(game, 500)


//
function kill() {
    grassArr = [];
    grassEaterArr = []
    antiGrassEatersRobArr = []
    testRobArr = []
    meracArr = []
    factoryArr = []
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            matrix[y][x] = 0;
        }
    }
}
function generator(grass, grassEater, antiGrassEatersRob, testRob, merac, factory) {
    for (let i = 0; i < grass; i++) {
        const x = Math.round(Math.random() * (matrix.length - 1));
        const y = Math.round(Math.random() * (matrix.length - 1));
        if (matrix[y][x] == 0 && [x, y] !== grassArr[i]) {
            matrix[y][x] = 1;
            grassArr.push(new Grass(x, y));
        }
        if (grassArr == [] && matrix[y][x] == 0) {
            matrix[y][x] = 1;
            grassArr.push(new Grass(x, y));
        }
    }
    for (let i = 0; i < grassEater; i++) {
        const x = Math.round(Math.random() * (matrix.length - 1));
        const y = Math.round(Math.random() * (matrix.length - 1));
        if (matrix[1][0] == 0) {
            matrix[y][x] = 2;
            grassEaterArr.push(new GrassEater(x, y));
        }
    }
    for (let i = 0; i < antiGrassEatersRob; i++) {
        const x = Math.round(Math.random() * (matrix.length - 1));
        const y = Math.round(Math.random() * (matrix.length - 1));
        matrix[y][x] = 3;
        antiGrassEatersRobArr.push(new AntiGrassEatersRob(x, y));
    }
    for (let i = 0; i < testRob; i++) {
        const x = Math.round(Math.random() * (matrix.length - 1));
        const y = Math.round(Math.random() * (matrix.length - 1));
        matrix[y][x] = 4;
        testRobArr.push(new TestRob(x, y));
    }
    for (let i = 0; i < merac; i++) {
        const x = Math.round(Math.random() * (matrix.length - 1));
        const y = Math.round(Math.random() * (matrix.length - 1));
        if (matrix[y][x] == 0 && [x, y] !== meracArr[i]) {
            matrix[y][x] = 5;
            meracArr.push(new Merac(x, y));
        }
        if (matrix[y][x] == 0 && meracArr[i] == []) {
            matrix[y][x] = 5;
            meracArr.push(new Merac(x, y));
        }

    }
    for (let i = 0; i < factory; i++) {
        const x = Math.round(Math.random() * (matrix.length - 1));
        const y = Math.round(Math.random() * (matrix.length - 1));
        if (matrix[y][x] == 0 && [x, y] !== factoryArr[i]) {
            matrix[y][x] = 6;
            factoryArr.push(new Factory(x, y));
        }
        if (matrix[y][x] == 0 && factoryArr[i] == []) {
            matrix[y][x] = 6;
            factoryArr.push(new Factory(x, y));
        }

    }

}
function generateGrass() {
    for (let i = 0; i < 1; i++) {
        const x = Math.round(Math.random() * (matrix.length - 1));
        const y = Math.round(Math.random() * (matrix.length - 1));
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1;
            grassArr.push(new Grass(x, y));
        }
    }
}
function generateGrassEater(){
    for (let i = 0; i < 1; i++) {
        const x = Math.round(Math.random() * (matrix.length - 1));
        const y = Math.round(Math.random() * (matrix.length - 1));
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2;
            grassEaterArr.push(new GrassEater(x, y));
        }
    }
}
function generateAntiGrassEatersRob(){
    for (let i = 0; i < 1; i++) {
        const x = Math.round(Math.random() * (matrix.length - 1));
        const y = Math.round(Math.random() * (matrix.length - 1));
        if(matrix[y][x] == 0){
            matrix[y][x] = 3;
            antiGrassEatersRobArr.push(new AntiGrassEatersRob(x, y));
        }
        
    }
}
function generateTestRob(){
    for (let i = 0; i < 1; i++) {
        const x = Math.round(Math.random() * (matrix.length - 1));
        const y = Math.round(Math.random() * (matrix.length - 1));
        if(matrix[y][x] == 0){
            matrix[y][x] = 3;
            testRobArr.push(new TestRob(x, y));
        }
        
    }
}
function generateMerac(){
    for (let i = 0; i < 1; i++) {
        const x = Math.round(Math.random() * (matrix.length - 1));
        const y = Math.round(Math.random() * (matrix.length - 1));
        if (matrix[y][x] == 0 && [x, y] !== meracArr[i]) {
            matrix[y][x] = 5;
            meracArr.push(new Merac(x, y));
        }
        if (matrix[y][x] == 0 && meracArr[i] == []) {
            matrix[y][x] = 5;
            meracArr.push(new Merac(x, y));
        }

    }
}
function generateFactory(){
    for (let i = 0; i < 1; i++) {
        const x = Math.round(Math.random() * (matrix.length - 1));
        const y = Math.round(Math.random() * (matrix.length - 1));
        if (matrix[y][x] == 0 && [x, y] !== factoryArr[i]) {
            matrix[y][x] = 6;
            factoryArr.push(new Factory(x, y));
        }
        if (matrix[y][x] == 0 && factoryArr[i] == []) {
            matrix[y][x] = 6;
            factoryArr.push(new Factory(x, y));
        }

    }
}

io.on('connection', function (socket) {
    creatingObjects();
    socket.on("kill", kill);
    socket.on('grassEaterGenerator', generateGrassEater)
    socket.on("antiGrassEatersRobGenerator", generateAntiGrassEatersRob);
    socket.on('grassGenerator', generateGrass)
    socket.on('testRobGenerator', generateTestRob)
    socket.on("meracGenerator", generateMerac);
    socket.on('factoryGenerator', generateFactory)
});
// io.on('connection', function (socket) {
//     creatingObjects();
//     socket.on("generator", generator);
// });
//   Create static Json
var statistics = {};
setInterval(function () {
    statistics.grass = grassArr.length;
    statistics.grassEater = grassEaterArr.length;
    statistics.antiGrassEatersRob = antiGrassEatersRobArr.length;
    statistics.testRob = testRobArr.length;
    statistics.merac = meracArr.length;
    statistics.factory = factoryArr.length;
    fs.writeFile("statistics.json", JSON.stringify(statistics), function () {
    })
}, 1000)




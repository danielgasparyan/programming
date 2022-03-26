function setup() {

    var socket = io();

    var side = 15;

    var matrix = [];

    //! Getting DOM objects (HTML elements)
    // let grassCountElement = document.getElementById('grassCount');
    // let grassEaterCountElement = document.getElementById('grassEaterCount');

    //! adding socket listener on "data" <-- name, after that fire 'drawCreatures' function 

    socket.on("data", drawCreatures);

    function drawCreatures(data) {
        //! after getting data pass it to matrix variable
        matrix = data.matrix;
        // grassCountElement.innerText = data.grassCounter;
        //! Every time it creates new Canvas woth new matrix size
        createCanvas(matrix[0].length * side, matrix.length * side)
        //! clearing background by setting it to new grey color
        background('#acacac');
        //! Draw grassCount and grassEaterCount to HTML (use DOM objects to update information, yes, and use .innerText <- function)

        //! Drawing and coloring RECTs
        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] == 1) {
                    fill("green");
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 2) {
                    fill("orange");
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 0) {
                    fill('#acacac');
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 3) {
                    fill('red');
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 4) {
                    fill('blue');
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 5) {
                    fill('yellow');
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 6) {
                    fill('brown');
                    rect(j * side, i * side, side, side);
                }
            }
        }
    }
}


















// let matrix = [];
// let t = 0
// let t1 = 0
// let side = 15;
// let grassArr = [];
// let grassEatersArr = [];
// let antiGrassEatersRobArr = [];
// let testRobArr = [];
// let meracArr = [];
// let factoryArr = [];
// function Cycle(time,grass,grassEater,antiGrassEatersRob,testRob,factory){
//     t++
//     t1++
//     if(t==time){
//         generator(grass,grassEater,antiGrassEatersRob,testRob,0)
//         t=0
//     }
//     if (t1==time*10) {
//         generator(0,0,0,0,factory) 
//         t1=0
//     }
// }
// function generetor(grass, grassEater, antiGrassEatersRob, testRob, factory, matrixSize) {
//     for (let i = 0; i < matrixSize; i++) {
//         matrix.push([]);
//         for (let j = 0; j < matrixSize; j++) {
//             matrix[i].push(0)
//         }
//     }
//     for (let i = 0; i < grass; i++) {
//         const x = Math.round(Math.random() * (matrixSize - 1));
//         const y = Math.round(Math.random() * (matrixSize - 1));
//             if (matrix[y][x]==0 && [x,y]!==grassArr[i]){
//             matrix[y][x] = 1;
//             grassArr.push(new Grass(x, y));
//             }
//             if (grassArr==[] && matrix[y][x]==0) {
//             matrix[y][x] = 1;
//             grassArr.push(new Grass(x, y));
//             }
//     }
//     for (let i = 0; i < grassEater; i++) {
//         const x = Math.round(Math.random() * (matrixSize - 1));
//         const y = Math.round(Math.random() * (matrixSize - 1));
//        if(matrix[y][x]==0){
//         matrix[y][x] = 2;
//         grassEatersArr.push(new grassEaters(x, y));
//        }
        
//     }
//     for(let i = 0; i<antiGrassEatersRob; i++){
//         const x = Math.round(Math.random() * (matrixSize - 1));
//         const y = Math.round(Math.random() * (matrixSize - 1));
//         matrix[y][x] = 3;
//         antiGrassEatersRobArr.push(new AntiGrassEatersRob(x,y));
//     }
//     for(let i = 0; i<testRob; i++){
//         const x = Math.round(Math.random() * (matrixSize - 1));
//         const y = Math.round(Math.random() * (matrixSize - 1));
        
//         matrix[y][x] = 4;
//         testRobArr.push(new TestRob(x,y));
    
// }
//     for(let i = 0; i<factory; i++){
//         const x = Math.round(Math.random() * (matrixSize - 1));
//         const y = Math.round(Math.random() * (matrixSize - 1));
//         if(matrix[y][x]==0 && [x,y]!==factoryArr[i]){
//         matrix[y][x] = 6;
//         factoryArr.push(new Factory(x,y));
//         }
//         if(matrix[y][x]==0 && factoryArr[i]==[]){
//         matrix[y][x] = 6;
//         factoryArr.push(new Factory(x,y));
//         }
    
// }
// }
// function generator(grass, grassEater, antiGrassEatersRob, testRob, factory) {
//     for (let i = 0; i < grass; i++) {
//         const x = Math.round(Math.random() * (matrix.length-1));
//         const y = Math.round(Math.random() * (matrix.length-1));
//             if (matrix[y][x]==0 && [x,y]!==grassArr[i]){
//             matrix[y][x] = 1;
//             grassArr.push(new Grass(x, y));
//             }
//             if (grassArr==[] && matrix[y][x]==0) {
//             matrix[y][x] = 1;
//             grassArr.push(new Grass(x, y));
//             }
//     }
//     for (let i = 0; i < grassEater; i++) {
//        const x = Math.round(Math.random() * (matrix.length-1));
//         const y = Math.round(Math.random() * (matrix.length-1));
//         if (matrix[1][0]==0) {
//             matrix[y][x] = 2;
//             grassEatersArr.push(new grassEaters(x, y));
//         } 
//     }
//     for(let i = 0; i<antiGrassEatersRob; i++){
//         const x = Math.round(Math.random() * (matrix.length-1));
//         const y = Math.round(Math.random() * (matrix.length-1));
//         matrix[y][x] = 3;
//         antiGrassEatersRobArr.push(new AntiGrassEatersRob(x,y));
//     }
//     for(let i = 0; i<testRob; i++){
//         const x = Math.round(Math.random() * (matrix.length-1));
//         const y = Math.round(Math.random() * (matrix.length-1));
//         matrix[y][x] = 4;
//         testRobArr.push(new TestRob(x,y));
// }
//     for(let i = 0; i<factory; i++){
//         const x = Math.round(Math.random() * (matrix.length-1));
//         const y = Math.round(Math.random() * (matrix.length-1));
//         if(matrix[y][x]==0 && [x,y]!==factoryArr[i]){
//         matrix[y][x] = 6;
//         factoryArr.push(new Factory(x,y));
//         }
//         if(matrix[y][x]==0 && factoryArr[i]==[]){
//         matrix[y][x] = 6;
//         factoryArr.push(new Factory(x,y));
//         }
    
// }
// }
// function setup() {
//     generetor(100, 1, 0, 0, 1, 20)
//     frameRate(6)
//     createCanvas(matrix[0].length * side, matrix.length * side);
//     background('#acacac');
// }
// function draw() {
//     for (let y = 0; y < matrix.length; y++) {
//         for (let x = 0; x < matrix[y].length; x++) {
//             for(let i in grassArr){
//                 if (matrix[y][x] == 1) {
//                 fill("green");
//                 }
//                 if(x==grassArr[i].x && y==grassArr[i].y){
//                     fill("green")
//                 }
//             }
//             if (matrix[y][x] == 0) {
//                 fill("#acacac");
//             }
//             else if (matrix[y][x] == 2) {
//                 fill("yellow")
//             }
//             else if (matrix[y][x] == 3) {
//                 fill("black")
//             }
//             else if (matrix[y][x] == 4) {
//                 fill("brown")
//             }
//             else if (matrix[y][x] == 5) {
//                 fill("pink");
//             }
//             else if (matrix[y][x] == 6) {
//                 fill("red")
//             }
//             rect(x * side, y * side, side, side);
//         }
//     }
//     for (let i in grassArr) {
//         grassArr[i].mul();
//     }
//     for (let i in grassEatersArr) {
//         grassEatersArr[i].eat()
//     }
//     for (let i in antiGrassEatersRobArr) {
//         antiGrassEatersRobArr[i].destroy()
//     }
//     for (let i in testRobArr) {
//         testRobArr[i].destroy()
//     }
//     for (let i in meracArr) {
//         meracArr[i].die()
//     }
//     for (let i in factoryArr) {
//         factoryArr[i].produce()
//     }
//     Cycle(6,1,1,0,0,1)

// }
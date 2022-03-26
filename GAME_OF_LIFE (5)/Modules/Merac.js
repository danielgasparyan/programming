var LiveForm = require("./LiveForm");
var random = require("./random");

module.exports=class Merac extends LiveForm{
    constructor(x, y) {
        // this.x = x;
        // this.y = y;
        super(x,y);
        this.energy = 20;
        // this.multiply = 0;
        // this.directionsA = []
    }
    // getNewCordinates() {
    //     this.directions = [
    //         [this.x - 1, this.y - 1],
    //         [this.x, this.y - 1],
    //         [this.x + 1, this.y - 1],
    //         [this.x - 1, this.y],
    //         [this.x + 1, this.y],
    //         [this.x - 1, this.y + 1],
    //         [this.x, this.y + 1],
    //         [this.x + 1, this.y + 1]
    //     ];
    // }
    // chooseCell(character) {
    //     this.getNewCordinates()
    //     let found = [];
    //     for (let i in this.directions) {
    //         let x = this.directions[i][0];
    //         let y = this.directions[i][1];
    //         if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
    //             if (matrix[y][x] == character) {
    //                 found.push(this.directions[i]);
    //             }
    //         }
    //     }
    //     return found;
    // }
    die() {
        for (var i in meracArr) {
            if (this.x == meracArr[i].x && this.y == meracArr[i].y && this.energy == 0) {
                meracArr.splice(i, 1)
                matrix[this.y][this.x] = 0
            }
        }
        this.energy--
        
    }
}
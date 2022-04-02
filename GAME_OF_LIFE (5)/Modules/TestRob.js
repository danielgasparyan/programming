var LiveForm = require("./LiveForm");
var random = require("./random");
var Merac = require("./Merac.js")




module.exports =class TestRob extends LiveForm{
    constructor(x, y) {
        // this.x = x;
        // this.y = y;
        super(x,y)
        this.energy = 30;
        // this.multiply = 0;
        this.directions = [];
    }
    getNewCordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCordinates()
        // let found = [];
        // for (let i in this.directions) {
        //     let x = this.directions[i][0];
        //     let y = this.directions[i][1];
        //     if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
        //         if (matrix[y][x] == character) {
        //             found.push(this.directions[i]);
        //         }
        //     }
        // }
        return super.chooseCell(character);
    }
    getNewCordinatesA() {
        this.directionsA = [
            [this.x - 2, this.y - 2],
            [this.x - 1, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 1, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y - 1],
            [this.x + 2, this.y - 1],
            [this.x - 2, this.y],
            [this.x + 2, this.y],
            [this.x - 2, this.y + 1],
            [this.x + 2, this.y + 1],
            [this.x - 2, this.y + 2],
            [this.x - 1, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 1, this.y + 2],
            [this.x + 2, this.y + 2],
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCellA(character) {
        this.getNewCordinatesA()
        let found = [];
        for (let i in this.directionsA) {
            let x = this.directionsA[i][0];
            let y = this.directionsA[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directionsA[i]);
                }
            }
        }
        return found;
    }
    destroy() {
        const grassEatersCells = random(this.chooseCellA(2))
        const grassCell = random(this.chooseCellA(1))
        const emptyCells = random(this.chooseCellA(0))
        if (grassEatersCells) {
            var x = grassEatersCells[0];
            var y = grassEatersCells[1];
            for (var i in grassEaterArr) {
                if (x == grassEaterArr[i].x && y == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }
            meracArr.push(new Merac(x,y))
            matrix[y][x]=5
            this.energy--
        }
        if (this.energy <= 0) {
            this.die()
        }
        else {
            this.move()
        }
    }
    move() {
        const emptyCells = random(this.chooseCell(0));
        const grassCells = random(this.chooseCell(1));
        if (grassCells) {
            let x = grassCells[0];
            let y = grassCells[1];
            matrix[this.y][this.x] = 1;
        matrix[y][x] = 4;
        this.x = x;
        this.y = y;
    }
        else if (emptyCells) {
            let x = emptyCells[0];
            let y = emptyCells[1];
            matrix[this.y][this.x] = 0;
        matrix[y][x] = 4;
        this.x = x;
        this.y = y;
    }
}
    die() {
        for (var i in testRobArr) {
            if (this.x == testRobArr[i].x && this.y == testRobArr[i].y) {
                testRobArr.splice(i, 1);
                break;
            }
        }
        matrix[this.y][this.x] = 0
    }
}

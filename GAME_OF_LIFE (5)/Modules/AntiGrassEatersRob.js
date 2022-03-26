var LiveForm = require("./LiveForm");
var random = require("./random.js");

module.exports = class AntiGrassEatersRob extends LiveForm{
    constructor(x, y) {
        // this.x = x;
        // this.y = y;
        super(x,y);
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
    destroy() {
        const grassEatersCells = random(this.chooseCell(2))
        if (grassEatersCells) {
            var x = grassEatersCells[0];
            var y = grassEatersCells[1];
            for (let i in grassArr) {
                if (this.x == grassArr[i].x && this.y == grassArr[i].y) {
                    matrix[this.y][this.x] = 1;
                }
            }
            matrix[this.y][this.x]=0
            this.x = x;
            this.y = y;
            for (var i in grassEaterArr) {
                if (x == grassEaterArr[i].x && y == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }
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
            matrix[y][x] = 3;
            this.x = x;
            this.y = y;
        }
        else if (emptyCells) {
            let x = emptyCells[0];
            let y = emptyCells[1];
            matrix[this.y][this.x] = 0;
            matrix[y][x] = 3;
            this.x = x;
            this.y = y;
    }
}
    die() {
        for (var i in antiGrassEatersRobArr) {
            if (this.x == antiGrassEatersRobArr[i].x && this.y == antiGrassEatersRobArr[i].y) {
                antiGrassEatersRobArr.splice(i, 1);
                break;
            }
        }
        matrix[this.y][this.x] = 0
    }
}

var LiveForm = require("./LiveForm");
var random = require("./random.js");
var TestRob = require("./TestRob");
var AntiGrassEatersRob = require("./AntiGrassEatersRob");




module.exports = class Factory extends LiveForm {
    constructor(x, y) {
        // this.x = x;
        // this.y = y;
        super(x,y);
        this.energy = 30;
        // this.multiply = 0;
        // this.directions = [];
        this.en = this.energy;
        this.eng = this.energy;
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
    getCordinates() {
        let X = [this.x - 1, this.x, this.x + 1];
        let Y = [this.y - 1, this.y, this.y + 1];
        let x = random(X);
        let y = random(Y);
        if (x>=0 && y >=0) {
            let xy = [x, y]
            return xy;
        }
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
    produce() {
        let produceCell = [this.getCordinates(), this.getCordinates()];
        if (produceCell[0][0] >= 0 && produceCell[0][1] >= 0 && produceCell[0] !== produceCell[1] && produceCell[0] !== [this.x, this.y] && produceCell[1] !== [this.x, this.y] && matrix[produceCell[0][1], produceCell[0][0]] != undefined && matrix[produceCell[1][1], produceCell[1][0]] != undefined) {
            if (produceCell[0] !== [this.x, this.y] && produceCell[1] !== [this.x, this.y]) {
                if (this.energy == this.en - 10) {
                let freeCell = [produceCell[0][0], produceCell[0][1]]
                matrix[this.y][this.x]=6
                matrix[freeCell[1]][freeCell[0]] = 4;
                matrix[this.y][this.x]=6
                testRobArr.push(new TestRob(freeCell[0], freeCell[1]))
                
                this.en = this.en - 10;
            }
            if (this.energy == this.eng - 15) {
                let freeCell = [produceCell[1][0], produceCell[1][1]]
                matrix[this.y][this.x]=6
                matrix[freeCell[1]][freeCell[0]] = 3;
                matrix[this.y][this.x]=6
                antiGrassEatersRobArr.push(new AntiGrassEatersRob(freeCell[0], freeCell[1]))
                
                this.eng = this.eng - 15;

                this.energy--;
            }
            if (this.energy <= 0) {
                this.die()
            }
            else {
                this.energy--;
            }
            }
            
        }
    }
    die() {
        for (var f in factoryArr) {
            if (this.x == factoryArr[f].x && this.y == factoryArr[f].y) {
                for(let i in grassArr){
                    if (this.x==grassArr[i].x && this.y==grassArr[i].y) {
                        matrix[this.y][this.x]=1
                        factoryArr.splice(f, 1)
                    } 
                    else {
                    matrix[this.y][this.x] = 0
                    factoryArr.splice(f, 1)
                    }
                
                }
                
            }
        }
    }
}
class LivingCreature {
    constructor(x, y, index){
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.index = index;
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
    chooseCell(ch) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length){
                if (matrix[y][x] == ch) {
                    found.push(this.directions[i]);
                }
            }   
        }
        return found;
    }
}




class Grass extends LivingCreature{
    
    
    mul() {
        const newCell = random(this.chooseCell(0));
        if (this.multiply >= 5 && newCell) {
            matrix[newCell[1]][newCell[0]] = 1;
            grassArr.push(new Grass(newCell[0], newCell[1]));
            this.multiply = 0
        }
        this.multiply++;
    }
}
class grassEaters extends LivingCreature{
    constructor(x, y) {
        // this.x = x;
        // this.y = y;
        // this.energy = 8;
        // this.multiply = 0;
        // this.directions = []
        super(x, y);
        this.energy = 8;
        
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
    eat() {
        const newCells = random(this.chooseCell(1));
        if (newCells) {
            var newX = newCells[0];
            var newY = newCells[1];
            matrix[newY][newX] = 2;
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            
            this.energy++
            if (this.energy >= 12) {
                this.mul()
            }
        }
        else {
            this.move()
        }
    }
    mul() {
        let newCell = random(this.chooseCell(0))
        if (newCell) {
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[newY][newX] = 2;
            grassEatersArr.push(new grassEaters(newCell[0], newCell[1]));
        }
        this.energy = 8;
    }
    move() {
        const emptCells = random(this.chooseCell(0));
        if (emptCells) {
            let newX = emptCells[0];
            let newY = emptCells[1];
            matrix[newY][newX] = 2;
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
        }
        this.energy--
        if (this.energy <= 0) {
            this.die()
        }
    }
    die() {
        for (var i in grassEatersArr) {
            if (this.x == grassEatersArr[i].x && this.y == grassEatersArr[i].y) {
                grassEatersArr.splice(i, 1);
                break;
            }
        }
        matrix[this.y][this.x] = 0
    }
}
class AntiGrassEatersRob {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 30;
        this.multiply = 0;
        this.directions = []
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
        let found = [];
        for (let i in this.directions) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
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
            for (var i in grassEatersArr) {
                if (x == grassEatersArr[i].x && y == grassEatersArr[i].y) {
                    grassEatersArr.splice(i, 1);
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
class TestRob {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 30;
        this.multiply = 0;
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
        let found = [];
        for (let i in this.directions) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
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
            for (var i in grassEatersArr) {
                if (x == grassEatersArr[i].x && y == grassEatersArr[i].y) {
                    grassEatersArr.splice(i, 1);
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
class Merac {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 20;
        this.multiply = 0;
        this.directionsA = []
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
        let found = [];
        for (let i in this.directions) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
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
class Factory {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 30;
        this.multiply = 0;
        this.directions = [];
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
        let found = [];
        for (let i in this.directions) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
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
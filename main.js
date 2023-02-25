const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(field) {
        this._field = field;
    }

    print() {
        for (const line of this._field) {
            let lineStr = ''
            for (const cell of line) {
                lineStr += cell;
            }
            console.log(lineStr);
        }
    }

    checkStatus(inp) {
        const curRow = this._field.findIndex(row => row.find(char => char == '*') != undefined);
        const curCol = this._field[curRow].findIndex(char => char == '*');
        if (inp == 'w') {
            if (curRow == 0 || this._field[curRow - 1][curCol] == 'O') {
                console.log('Game Over!');
                return 'lose';
            } else if (this._field[curRow - 1][curCol] == '^') {
                console.log('You Won!')
                return 'win';
            } else {
                return 'continue';
            }
        } else if (inp == 's') {
            if (curRow == this._field.length - 1 || this._field[curRow + 1][curCol] == 'O') {
                console.log('Game Over!');
                return 'lose';
            } else if (this._field[curRow + 1][curCol] == '^') {
                console.log('You Won!')
                return 'win';
            } else {
                return 'continue';
            }
        } else if (inp == 'a') {
            if (curCol == 0 || this._field[curRow][curCol - 1] == 'O') {
                console.log('Game Over!');
                return 'lose';
            } else if (this._field[curRow][curCol - 1] == '^') {
                console.log('You Won!')
                return 'win';
            } else {
                return 'continue';
            }
        } else if (inp == 'd') {
            if (curCol == this._field[0].length - 1 || this._field[curRow][curCol + 1] == 'O') {
                console.log('Game Over!');
                return 'lose';
            } else if (this._field[curRow][curCol + 1] == '^') {
                console.log('You Won!')
                return 'win';
            } else {
                return 'continue';
            }
        } else {
            console.log('Your input is invalid. Please try one of \"w, a, s ,d\".');
            return 'continue';
        }
    }

    update(inp) {
        const curRow = this._field.findIndex(row => row.find(char => char == '*') != undefined);
        const curCol = this._field[curRow].findIndex(char => char == '*');
        if (inp == 'w') {
            this._field[curRow][curCol] = '░'
            this._field[curRow - 1][curCol] = '*'
        } else if (inp == 's') {
            this._field[curRow][curCol] = '░'
            this._field[curRow + 1][curCol] = '*'
        } else if (inp == 'a') {
            this._field[curRow][curCol] = '░'
            this._field[curRow][curCol - 1] = '*'
        } else if (inp == 'd') {
            this._field[curRow][curCol] = '░'
            this._field[curRow][curCol + 1] = '*'
        }
    }

    static generateField(height, width, percentage) {
        const newField = [];
        for (let i = 0; i < height; i++) {
            const newRow = [];
            for (let n = 0; n < width; n ++) {
                if (Math.random() * 100 >= percentage) {
                    newRow.push('░');
                } else {
                    newRow.push('O');
                }
            }
            newField.push(newRow);
        }
        newField[0][0] = '*';
        let goalRow = Math.floor(Math.random() * height);
        while (goalRow == 0) {
            goalRow = Math.floor(Math.random() * height);
        }
        let goalCol = Math.floor(Math.random() * width);
        while (goalCol == 0) {
            goalCol = Math.floor(Math.random() * width);
        }
        newField[goalRow][goalCol] = '^';
        return newField;
    }
}


const myField = new Field(Field.generateField(5, 5, 20));

console.log('Use \"w, a, s, d\" keys to move yourself. Your goal is to get to the hat \"^\".');

let status = 'continue';

while (status == 'continue' ) {
    myField.print();
    const input = prompt('Enter direction: ');
    status = myField.checkStatus(input);
    myField.update(input)
}
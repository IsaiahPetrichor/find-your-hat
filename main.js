const prompt = require('prompt-sync')({sigint: true});

const hat = 'Д';
const hole = '⏼';
const fieldCharacter = '░';
const pathCharacter = '⋽';

class Field {
  constructor(field) {
    this.field = field;
    this.x = 0;
    this.y = 0;
    this.win = false;
    this.loss = false;
  }
  print() {
    for (let i = 0; i < this.field.length; i++) {
      console.log(this.field[i].join(""));
    }
  }
  playGame() {
    console.log("Move your path '⋽' through the field '░' to get your hat 'Д'. make sure to \navoid the holes! '⏼'");
    while (this.win === false && this.loss === false) {
      this.print();
      let direction = prompt('Which direction do you want to move?');
      if (direction === "u") {
        this.y--;
      } else if (direction === "d") {
        this.y++;
      } else if (direction === "l") {
        this.x--;
      } else if (direction === "r") {
        this.x++;
      } else {
        console.log("Invalid Input!");
      }
      this.location(this.x, this.y);
      }
    }
  location(currentX, currentY) {
    if (currentX < 0 || currentX >= this.field[0].length) {
      console.log("Out of bounds!");
      this.loss = true;
    }
    if (currentY < 0 || currentY >= this.field.length) {
      console.log("Out of bounds!");
      this.loss = true;
    } else if (this.field[currentY][currentX] === hole) {
      console.log("You fell in a hole!");
      this.loss = true;
    } else if (this.field[currentY][currentX] === hat) {
      console.log("You found your hat!");
      this.win = true;
    } else {
      this.field[currentY].splice(currentX, 1, pathCharacter);
    }
  }
  static generateField(h, w, holes) {
    let newField = [];
    for (let i = 0; i < h; i++) {
      newField.push([fieldCharacter]);
      for (let j = 0; j < w; j++) {
      newField[i].push(fieldCharacter);
      }
    }
    for (let k = 1; k <= holes; k++) {
      let randX = Math.floor(Math.random() * newField[0].length);
      let randY = Math.floor(Math.random() * newField.length);
      if (randX !== 0 || randY !== 0) {
        newField[randY].splice(randX, 1, hole);
      }
    }
    let randX = Math.floor(Math.random() * newField[0].length);
    let randY = Math.floor(Math.random() * newField.length);
    if (randX !== 0 || randY !== 0) {
      newField[randY].splice(randX, 1, hat);
    }
    newField[0].splice(0, 1, pathCharacter);
    return newField;
  }
}

let gameField = new Field(Field.generateField(20, 50, 250));
gameField.playGame();
//Find the Hat!

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(height, width, holePercentage) {
    this.field = Field.generateField(height, width, holePercentage);
    this.playerX = 0;
    this.playerY = 0;
    this.xLimit = this.field[0].length - 1;
    this.yLimit = this.field.length - 1;
    }
  
  print() {
    console.log(this.field.map(arr => arr.join("")).join("\n"));
  }
  
  startGame() {
    this.print();
    console.log('Choose a direction to move in to find your hat [^]. Watch out for the holes [O]! Enter [u, d, l, r]');
    process.stdin.on('data', (userInput) => {
      let input = userInput.toString().trim().toLowerCase(5, 5);
      this.handleInput(input);
    });
  }

  handleInput(input) {
        switch (input) {
          case 'u':
            this.playerY -= 1;
            this.handleMove(this.playerY, this.playerX);
            break;
          case 'd':
            this.playerY += 1;
            this.handleMove(this.playerY, this.playerX);
            break;
          case 'l':
            this.playerX -= 1;
            this.handleMove(this.playerY, this.playerX);
            break;
          case 'r':
            this.playerX += 1;
            this.handleMove(this.playerY, this.playerX);
            break;
          default: console.log('Invalid input, try again using u for up, d for down, l for left, or r for right.');
      this.print();
        }
    }

  handleMove(y, x) {
    this.checkLossWin(y, x);
    if (y >= 0 && y <= this.yLimit && x >= 0 && x <= this.xLimit) {
      this.field[y][x] = pathCharacter;
      this.print();
    }
  }

  checkLossWin(y, x) {
    if (this.playerX < 0 || this.playerX > this.xLimit || this.playerY < 0 || this.PlayerY > this.yLimit) {
      this.handleLoss('You fell off the edge!');
    } else if (this.field[y][x] === hole) {
      this.handleLoss('You fell down a hole!')
    } else if (this.field[y][x] === hat) {
        this.handleWin();
    }
  }

  handleLoss(lossReason) {
    console.log(`Oh no! ${lossReason} You lose...`);
    process.exit(0);
  }

  handleWin() {
    console.log('Congratulations, you found your hat!');
    process.exit(0);
  }

  static generateField(height, width, holePercentage) {
    const fieldArea = height * width;
    const numOfHoles = Math.ceil(fieldArea * (holePercentage / 100));
    console.log(numOfHoles);
    //let xAxis = Array(width).fill(fieldCharacter, 0);
    //let yAxis = Array(height).fill(xAxis, 0);
    let yAxis = []
    for (let i = 1; i <= height; i++) {
      yAxis.push(Array(width).fill(fieldCharacter, 0));
    }

    yAxis[0][0] = pathCharacter;

    let exceptionsList = ['0.0'];
    const rng = (n) => {
      return Math.floor(Math.random() * n)
    }

    let hatLocation = {};

    do {
      hatLocation.y = rng(height);
    } while (hatLocation.y <= 1);
    do {
      hatLocation.x = rng(width);
    } while (hatLocation.x <= 1);
    yAxis[hatLocation.y][hatLocation.x] = hat;
    let hatString = `${hatLocation.y}.${hatLocation.x}`;
    exceptionsList.push(hatString);

    let holeLocation = {};

    for (let h = 1; h <= numOfHoles; ) {
      holeLocation.y = rng(height);
      holeLocation.x = rng(width);
      let holeLocationString = `${holeLocation.y}.${holeLocation.x}`
      if (!exceptionsList.includes(holeLocationString)) {
        yAxis[holeLocation.y][holeLocation.x] = hole;
        exceptionsList.push(holeLocationString);
        h++;
      }
      console.log(exceptionsList);
    };
    return yAxis;
  }
  
}

const randomField = new Field(5, 5, 25);
randomField.startGame();
const fs = require("fs");

const readline = require("readline");

const combinations = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
  [1, 1],
  [-1, -1],
  [1, -1],
  [-1, 1],
];

async function getRollsOfPaper() {
  const fStream = fs.createReadStream("day4/input.txt");
  const rl = readline.createInterface({
    input: fStream,
    crlfDelay: Infinity,
  });

  let initRolls = [];

  for await (line of rl) {
    initRolls.push(line?.trim());
  }

  calculateRolls(initRolls);
}

/**
 * @param {string[]} rolls
 */

function calculateRolls(rolls = []) {
  let temp = 0;

  for (let i = 0; i < rolls.length; i++) {
    let element = rolls[i];
    let counter = 0;

    for (let j = 0; j < element.length; j++) {
      if (element[j] === "@") {
        console.log("one cycle");

        let col = j;
        let row = i;
        let colEnd = element.length;
        let rowEnd = rolls.length;

        combinations.forEach((shift) => {
          const [rowSh, colSh] = shift;

          let searRow = row + rowSh;
          let searCol = col + colSh;

          if (
            searRow >= 0 &&
            searCol >= 0 &&
            searRow < rowEnd &&
            searCol < colEnd
          ) {
            if (rolls[searRow][searCol] === "@") {
              counter += 1;
            }
          }
        });

        if (counter < 4) {
          temp += 1;
        }
        counter = 0;
      }
    }
  }
  console.log(temp, "t");
}

getRollsOfPaper();

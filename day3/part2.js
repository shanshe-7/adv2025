const fs = require("fs");
const readline = require("readline");

async function getMaxJolts() {
  const fileSteam = fs.createReadStream("day3/input.txt");
  const rl = readline.createInterface({
    input: fileSteam,
    crlfDelay: Infinity,
  });

  let temp = 0;

  for await (let line of rl) {
    temp += calculateJolts(line);
  }

  console.log(temp);
  return temp;
}

function calculateJolts(line = "", joltNum = 12) {
  let temp = line[0];

  for (let i = 1; i < line.length; i++) {
    for (let j = 0; j < temp.length; j++) {
      if (+line[i] > +temp[j]) {
        temp = temp.substring(0, j) + line[i];
      }
    }
  }

  console.log(temp, "temp");

  return Number(temp);
}

getMaxJolts();

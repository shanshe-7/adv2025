const fs = require("fs");
const readLine = require("readline");

async function getMaxJolts() {
  const fileSteam = fs.createReadStream("day3/input.txt");

  const rl = readLine.createInterface({
    input: fileSteam,
    crlfDelay: Infinity,
  });
  let temp = 0;
  for await (line of rl) {
    temp += calculateJolts(line);
  }

  console.log(temp);
  return temp;
}

function calculateJolts(line = "") {
  let compPair = line.substring(0, 2);
  for (let i = 2; i < line.length; i++) {
    let compPairNum = Number(compPair);
    let curPairNumber = Number(
      Math.max(Number(compPair[0]), Number(compPair[1])).toString() + line[i]
    );

    if (curPairNumber > compPairNum) {
      compPair = curPairNumber.toString();
    }
  }

  return Number(compPair);
}

getMaxJolts();

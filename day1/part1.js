const fs = require("fs");
const readLine = require("readline");

async function getPassword() {
  const fileSteam = fs.createReadStream("day1/input.txt");

  const rl = readLine.createInterface({
    input: fileSteam,
    crlfDelay: Infinity,
  });

  let temp = 0;
  let start = 50;

  for await (let line of rl) {
    const result = calcRotations(line, start);

    if (result === 0) {
      temp += 1;
    }
    start = result;
  }

  console.log(temp);

  return temp;
}

function calcRotations(line, start, rotationNumber = 100) {
  if (typeof line !== "string") return null;

  let firstChar = line[0];

  let rotationCycle = Number(line.substring(1));

  let res;
  if (firstChar.toLocaleLowerCase() === "r") {
    res = (start + rotationCycle) % rotationNumber;
  } else {
    res = (start - rotationCycle + rotationNumber) % rotationNumber;
  }

  return res;
}

getPassword();

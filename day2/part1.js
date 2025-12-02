const fs = require("fs");
const readLine = require("readline");

async function getInvalidIDSSum() {
  const fileSteam = fs.createReadStream("day2/input.txt");

  const rl = readLine.createInterface({
    input: fileSteam,
    crlfDelay: Infinity,
  });

  for await (let line of rl) {
    calculateSum(line);
  }
}

function calculateSum(line) {
  const ranges = line.split(",");
  let result = 0;

  for (const range of ranges) {
    const [s, e] = range.split("-");
    const start = parseInt(s);
    const end = parseInt(e);

    for (let i = start; i <= end; i++) {
      const indexString = i.toString();
      let isInvalid = false;

      for (let i = 0; i < indexString.length; i++) {
        const currentStr = indexString.slice(0, i);

        if (
          (indexString.split(currentStr).length - 1) * currentStr.length ===
          indexString.length
        ) {
          isInvalid = true;
          break;
        }
      }

      if (isInvalid) {
        result += i;
      }
    }
  }

  console.log("RESULT: ", result);
}

getInvalidIDSSum();

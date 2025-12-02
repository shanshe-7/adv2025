const fs = require("fs");
const path = require("path");

function getPassword() {
  function getAbsPath(filename, relativePath) {
    return path.join(path.dirname(filename), relativePath);
  }

  let pos = 50;
  let count = 0;

  const lines = fs
    .readFileSync(getAbsPath(__filename, "input.txt"), "utf-8")
    .split("\n")
    .filter(Boolean); // remove empty lines

  for (const line of lines) {
    const sign = line[0] === "L" ? -1 : 1;
    const step = parseInt(line.slice(1), 10);

    const prev = pos;
    pos += step * sign;

    const prev_lo = Math.floor(prev / 100);
    const curr_lo = Math.floor(pos / 100);
    const prev_hi = Math.floor((prev - 1) / 100);
    const curr_hi = Math.floor((pos - 1) / 100);

    count += Math.abs(prev_lo - curr_lo) + Math.abs(prev_hi - curr_hi);
  }

  return count / 2;
}

getPassword();

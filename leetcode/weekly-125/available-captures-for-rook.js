/**
 * @param {character[][]} board
 * @return {number}
 */
const numRookCaptures = board => {
  let x;
  let y;
  for (let i = 0; i < 8; i += 1) {
    for (let j = 0; j < 8; j += 1) {
      if (board[i][j] === "R") {
        x = i;
        y = j;
      }
    }
  }

  console.log("x: %d, y: %d", x, y);
  let ans = 0;
  for (let i = y - 1; i >= 0; i -= 1) {
    if (board[x][i] === ".") continue;
    if (board[x][i] !== "p") break;
    ans += 1;
    break;
  }
  for (let i = y + 1; i < 8; i += 1) {
    if (board[x][i] === ".") continue;
    if (board[x][i] !== "p") break;
    ans += 1;
    break;
  }
  for (let i = x - 1; i >= 0; i -= 1) {
    if (board[i][y] === ".") continue;
    if (board[i][y] !== "p") break;
    ans += 1;
    break;
  }
  for (let i = x + 1; i < 8; i += 1) {
    if (board[i][y] === ".") continue;
    if (board[i][y] !== "p") break;
    ans += 1;
    break;
  }

  return ans;
};

console.log(
  numRookCaptures([
    [".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", "p", ".", ".", ".", "."],
    [".", ".", ".", "R", ".", ".", ".", "p"],
    [".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", "p", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", "."]
  ])
);
console.log(
  numRookCaptures([
    [".", ".", ".", ".", ".", ".", ".", "."],
    [".", "p", "p", "p", "p", "p", ".", "."],
    [".", "p", "p", "B", "p", "p", ".", "."],
    [".", "p", "B", "R", "B", "p", ".", "."],
    [".", "p", "p", "B", "p", "p", ".", "."],
    [".", "p", "p", "p", "p", "p", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", "."]
  ])
);
console.log(
  numRookCaptures([
    [".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", "p", ".", ".", ".", "."],
    [".", ".", ".", "p", ".", ".", ".", "."],
    ["p", "p", ".", "R", ".", "p", "B", "."],
    [".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", "B", ".", ".", ".", "."],
    [".", ".", ".", "p", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", "."]
  ])
);

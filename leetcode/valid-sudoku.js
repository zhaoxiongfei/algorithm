const isValidSudoku = board => {
  // 逐行/列检测
  for (let i = 0; i < 9; i += 1) {
    const row = {};
    const col = {};
    const palace = {};
    for (let j = 0; j < 9; j += 1) {
      const x = board[i][j]; // 行元素
      if (x !== "." && row[x]) return false;
      row[x] = true;

      const y = board[j][i]; // 列元素
      if (y !== "." && col[y]) return false;
      col[y] = true;

      const z =
        board[Math.floor(i / 3) * 3 + Math.floor(j / 3)][(i % 3) * 3 + (j % 3)]; // 同宮元素
      if (z !== "." && palace[z]) return false;
      palace[z] = true;
    }
  }

  return true;
};

const board = [
  ["5", "3", ".", ".", "7", ".", ".", ".", "."],
  ["6", ".", ".", "1", "9", "5", ".", ".", "."],
  [".", "9", "8", ".", ".", ".", ".", "6", "."],
  ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
  ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
  ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
  [".", "6", ".", ".", ".", ".", "2", "8", "."],
  [".", ".", ".", "4", "1", "9", ".", ".", "5"],
  [".", ".", ".", ".", "8", ".", ".", "7", "9"]
];
console.log(isValidSudoku(board));

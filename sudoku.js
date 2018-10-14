const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin
});

const init = str => str.split(" ").map(x => x | 0);

// 计算当前处于第几宫
const getPalace = (() => {
  const getIndex = (row, col) => Math.floor(col / 3) + Math.floor(row / 3) * 3;
  const dict = {};
  for (let row = 0; row < 9; row += 1) {
    for (let col = 0; col < 9; col += 1) {
      const palace = Math.floor(col / 3) + Math.floor(row / 3) * 3;
      if (!dict[palace]) dict[palace] = [];
      dict[palace].push([row, col]);
    }
  }
  return (row, col) => {
    const palace = getIndex(row, col);
    return dict[palace];
  };
})();

// 获取可能的选项
const getOptions = (row, col, matrix) => {
  if (matrix[row][col] !== 0) return [matrix[row][col]];
  const options = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  // 找到已经存在的元素，行，列，宫
  const exists = new Set();
  for (let i = 0; i < 9; i += 1) {
    // 所在行放入
    if (matrix[row][i] !== 0) exists.add(matrix[row][i]);
    // 所在列放入
    if (matrix[i][col] !== 0) exists.add(matrix[i][col]);
  }
  // 所在宫
  getPalace(row, col).forEach(([r, c]) => {
    if (matrix[r][c] !== 0) exists.add(matrix[r][c]);
  });

  return options.filter(x => !exists.has(x));
};

const startup = matrix => {
  // 先简单整理, 元素设置为数组，放置可供选择的数字
  const sudoku = [];
  matrix.forEach((line, row) => {
    sudoku[row] = [];
    row.forEach((x, col) => {
      sudoku[row][col] = getOptions(row, col, matrix);
    });
  });

  return sudoku;
};

const calc = matrix => {
  // 验证合法性
  if (matrix.length !== 9) throw Error("输入必须是 9 行");
  if (matrix.find(x => x.length !== 9)) throw Error("每一行必须是 9 个数字");
  if (matrix.find(x => x.find(i => i > -1 && i < 10)))
    throw Error("每一个数字只能是 0 ~ 9 某一个");

  return startup(matrix);
};

// 数独解法
// 输入：9 * 9 数字矩阵, 每个数字取值 0 ~ 9
// 输出：最终完成后的数独矩阵，9 * 9 数字取值 1 ~ 9, 或者 无解
const matrix = [];
rl.on("line", input => {
  matrix.push(init(input.trim()));
});

rl.on("close", () => {
  console.log(calc(matrix));
});

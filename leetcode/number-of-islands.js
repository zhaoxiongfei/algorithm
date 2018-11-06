// https://leetcode-cn.com/problems/number-of-islands/description/
// No 200. 岛屿的个数

/**
  给定一个由 '1'（陆地）和 '0'（水）组成的的二维网格，计算岛屿的数量。
  一个岛被水包围，并且它是通过水平方向或垂直方向上相邻的陆地连接而成的。
  你可以假设网格的四个边均被水包围。

  示例 1:

  输入:
  11110
  11010
  11000
  00000

  输出: 1
  示例 2:

  输入:
  11000
  11000
  00100
  00011

  输出: 3
 */
const testIsLand = (grid, i, j) => {
  grid[i][j] = "*";
  const points = [[i, j + 1], [i, j - 1], [i - 1, j], [i + 1, j]];
  for (const [x, y] of points) {
    if (grid[x] && grid[x][y] === "1") testIsLand(grid, x, y);
  }
};

/**
 * @param {character[][]} grid
 * @return {number}
 */
const numIslands = grid => {
  const m = grid.length;
  if (m === 0) return 0;
  const n = grid[0].length;
  if (n === 0) return 0;

  let count = 0;
  for (let i = 0; i < m; i += 1) {
    for (let j = 0; j < n; j += 1) {
      if (grid[i][j] === "1") {
        count += 1;
        testIsLand(grid, i, j);
      }
    }
  }

  return count;
};

const grid = [
  ["1", "1", "1", "1", "0"],
  ["1", "1", "0", "1", "0"],
  ["1", "1", "0", "0", "0"],
  ["0", "0", "0", "0", "0"]
];
console.log(numIslands(grid));

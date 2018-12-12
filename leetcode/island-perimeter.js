// https://leetcode-cn.com/problems/island-perimeter/
// No 463. 岛屿的周长

/**
  给定一个包含 0 和 1 的二维网格地图，其中 1 表示陆地 0 表示水域。

  网格中的格子水平和垂直方向相连（对角线方向不相连）。
  整个网格被水完全包围，但其中恰好有一个岛屿（或者说，一个或多个表示陆地的格子相连组成的岛屿）。

  岛屿中没有“湖”（“湖” 指水域在岛屿内部且不和岛屿周围的水相连）。
  格子是边长为 1 的正方形。网格为长方形，且宽度和高度均不超过 100 。计算这个岛屿的周长。

  示例 :

  输入:
  [[0,1,0,0],
   [1,1,1,0],
   [0,1,0,0],
   [1,1,0,0]]

  输出: 16
 */

/**
 * @param {number[][]} grid
 * @return {number}
 */
// 思路: 扫描整个二维数组，遇到 1 的情况记录它贡献的周长
const islandPerimeter = grid => {
  const m = grid.length;
  if (!m) return 0;
  const n = grid[0].length;
  // 给数据包边
  for (let i = 0; i < m; i += 1) {
    grid[i].unshift(0);
    grid[i].push(0);
  }
  grid.unshift(Array(n + 2).fill(0));
  grid.push(Array(n + 2).fill(0));

  let total = 0;
  for (let i = 1; i <= m; i += 1) {
    for (let j = 1; j <= n; j += 1) {
      if (!grid[i][j]) continue;
      if (grid[i - 1][j] === 0) total += 1; // 上
      if (grid[i + 1][j] === 0) total += 1; // 下
      if (grid[i][j - 1] === 0) total += 1; // 左
      if (grid[i][j + 1] === 0) total += 1; // 右
    }
  }

  return total;
};

console.log(
  islandPerimeter([[0, 1, 0, 0], [1, 1, 1, 0], [0, 1, 0, 0], [1, 1, 0, 0]])
);

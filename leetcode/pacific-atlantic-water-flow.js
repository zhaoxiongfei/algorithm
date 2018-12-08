// https://leetcode-cn.com/problems/pacific-atlantic-water-flow/description/
// No 417. 太平洋大西洋水流问题

/**
  给定一个 m x n 的非负整数矩阵来表示一片大陆上各个单元格的高度。
  “太平洋”处于大陆的左边界和上边界，而“大西洋”处于大陆的右边界和下边界。

  规定水流只能按照上、下、左、右四个方向流动，且只能从高到低或者在同等高度上流动。

  请找出那些水流既可以流动到“太平洋”，又能流动到“大西洋”的陆地单元的坐标。

  提示：

  输出坐标的顺序不重要
  m 和 n 都小于150

  示例：

  给定下面的 5x5 矩阵:

    太平洋 ~   ~   ~   ~   ~
         ~  1   2   2   3  (5) *
         ~  3   2   3  (4) (4) *
         ~  2   4  (5)  3   1  *
         ~ (6) (7)  1   4   5  *
         ~ (5)  1   1   2   4  *
            *   *   *   *   * 大西洋

  返回:

  [[0, 4], [1, 3], [1, 4], [2, 2], [3, 0], [3, 1], [4, 0]] (上图中带括号的单元).
 */

const DFS = (matrix, dp, i, j, paths = new Set()) => {
  if (dp[i][j]) return true;
  const curr = matrix[i][j];
  const sblings = [
    [i - 1, j], // 上
    [i, j + 1], // 右
    [i + 1, j], // 下
    [i, j - 1] // 左
  ];
  for (const [x, y] of sblings) {
    if (matrix[x] && matrix[x][y] !== undefined && curr >= matrix[x][y]) {
      if (dp[x][y]) return true;
      if (paths.has(`${x}_${y}`)) continue;
      paths.add(`${x}_${y}`);
      if (DFS(matrix, dp, x, y, paths)) return true;
    }
  }

  return false;
};

/**
 * @param {number[][]} matrix
 * @return {number[][]}
 */
const pacificAtlantic = matrix => {
  const m = matrix.length;
  if (m === 0) return [];
  const n = matrix[0].length;
  if (n === 0) return [];

  const dp1 = Array(m); // 用来记录是否可以流入太平洋
  const dp2 = Array(m); // 用来记录是否可以流入大西洋
  // 上边和左边的点都100%可以流入太平洋
  dp1[0] = Array(n).fill(true);
  // 下边和右边的点都100%可以流入大西洋
  dp2[m - 1] = Array(n).fill(true);
  for (let i = 1; i < m; i += 1) {
    dp1[i] = Array(n).fill(false);
    dp1[i][0] = true;
    dp2[m - i - 1] = Array(n).fill(false);
    dp2[m - i - 1][n - 1] = true;
  }

  for (let i = 1; i < m; i += 1) {
    for (let j = 1; j < n; j += 1) {
      dp1[i][j] = DFS(matrix, dp1, i, j);
    }
  }

  for (let i = m - 2; i >= 0; i -= 1) {
    for (let j = n - 2; j >= 0; j -= 1) {
      dp2[i][j] = DFS(matrix, dp2, i, j);
    }
  }

  const points = [];
  for (let i = 0; i < m; i += 1) {
    for (let j = 0; j < n; j += 1) {
      if (dp1[i][j] && dp2[i][j]) points.push([i, j]);
    }
  }

  return points;
};

console.log(
  pacificAtlantic([
    // [1, 2, 3, 4],
    // [12, 13, 14, 5],
    // [11, 16, 15, 6],
    // [10, 9, 8, 7]

    // [1, 2, 3],
    // [8, 9, 4],
    // [7, 6, 5]

    [1, 2, 2, 3, 5],
    [3, 2, 3, 4, 4],
    [2, 4, 5, 3, 1],
    [6, 7, 1, 4, 5],
    [5, 1, 1, 2, 4]
  ])
);

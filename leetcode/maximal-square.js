// https://leetcode-cn.com/problems/maximal-square/description/
// No 221. 最大正方形

/**
  在一个由 0 和 1 组成的二维矩阵内，找到只包含 1 的最大正方形，并返回其面积。

  示例:

  输入:

  1 0 1 0 0
  1 0 1 1 1
  1 1 1 1 1
  1 0 0 1 0

  输出: 4
 */

/**
 * @param {character[][]} matrix
 * @return {number}
 */
const maximalSquare = matrix => {
  const m = matrix.length;
  if (m === 0) return 0;
  const n = matrix[0].length;
  const dp = Array(m + 1);
  for (let i = 0; i <= m; i += 1) dp[i] = Array(n + 1).fill(0);
  for (let i = 0; i < m; i += 1) {
    for (let j = 0; j < n; j += 1) {
      const curr = matrix[i][j];
      if (curr === "0") {
        dp[i + 1][j + 1] = 0;
        continue;
      }
      dp[i + 1][j + 1] = Math.min(dp[i][j], dp[i][j + 1], dp[i + 1][j]) + 1;
    }
  }

  const max = Math.max(...dp.map(line => Math.max(...line)));
  return max * max;
};

console.log(
  maximalSquare([
    ["0", "0", "0", "1"],
    ["1", "1", "0", "1"],
    ["1", "1", "1", "1"],
    ["0", "1", "1", "1"],
    ["0", "1", "1", "1"]
  ])
);

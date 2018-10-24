// https://leetcode-cn.com/problems/minimum-path-sum/description/
//
// 思路: 动态规划, dp[i][j] 代表到(i, j) 点最小路径和
// 推导公式: dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - ]) + grid[i][j];
// 递推公式含义: 当前点的最小路径于左边点和上边点的最多路径之和中较小的加上 grid[i][j]

const minPathSum = grid => {
  const rows = grid.length;
  const cols = grid[0].length;

  // 这里动规表增加一行，一列，为了让下面的代码不需要特殊处理
  const dp = [];
  for (let i = 0; i <= rows; i += 1) {
    dp[i] = [];
    for (let j = 0; j <= cols; j += 1) {
      dp[i][j] = Infinity;
    }
  }
  dp[0][1] = 0;

  for (let i = 1; i <= rows; i += 1) {
    for (let j = 1; j <= cols; j += 1) {
      const left = dp[i][j - 1];
      const up = dp[i - 1][j];
      dp[i][j] = Math.min(left, up) + grid[i - 1][j - 1];
    }
  }

  return dp[rows][cols];
};

const matrix = [[1, 3, 1], [1, 5, 1], [4, 2, 1]];
console.log(minPathSum(matrix));

// https://leetcode-cn.com/problems/unique-paths-ii/description/
//
// 思路: 动态规划, dp[i][j] 代表到(i, j) 点最多的可能路径
// 推导公式: dp[i][j] = dp[i - 1][j] + dp[i][j - ]
// 递推公式含义: 当前点的最多路径等于左边点和上边点的最多路径之和

const uniquePathsWithObstacles = obstacleGrid => {
  const rows = obstacleGrid.length;
  const cols = obstacleGrid[0].length;
  if (obstacleGrid[0][0] === 1) return 0;
  if (obstacleGrid[rows - 1][cols - 1] === 1) return 0;

  // 这里动规表增加一行，一列，为了让下面的代码不需要特殊处理
  const dp = [];
  for (let i = 0; i <= rows; i += 1) {
    dp[i] = [];
    for (let j = 0; j <= cols; j += 1) {
      dp[i][j] = 0;
    }
  }
  dp[0][1] = 1;

  for (let i = 1; i <= rows; i += 1) {
    for (let j = 1; j <= cols; j += 1) {
      const point = obstacleGrid[i - 1][j - 1];
      if (point === 1) {
        dp[i][j] = 0;
        continue;
      }
      const left = dp[i][j - 1];
      const up = dp[i - 1][j];
      dp[i][j] = left + up;
    }
  }

  return dp[rows][cols];
};

const matrix = [[0, 0, 0], [0, 1, 0], [0, 0, 0]];
console.log(uniquePathsWithObstacles(matrix));

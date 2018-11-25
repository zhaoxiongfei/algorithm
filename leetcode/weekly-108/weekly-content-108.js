/**
 * @param {number[][]} A
 * @return {number}
 */
// 思路: 动态规划 令 dp[i][j] 为下降的最短路线
// 递推公式: dp[i][j] = Math.min(dp[i - 1][j], dp[i - 1][j - 1], dp[i - 1][j]) + A[i][j]
const minFallingPathSum = A => {
  const { length } = A;
  const dp = Array(length);
  dp[0] = [Infinity].concat(A[0], Infinity);
  for (let i = 1; i < length; i += 1) dp[i] = Array(length + 2).fill(Infinity);

  for (let i = 1; i < length; i += 1) {
    for (let j = 1; j <= length; j += 1) {
      console.log(
        dp[i - 1][j],
        dp[i - 1][j - 1],
        dp[i - 1][j + 1],
        A[i][j - 1]
      );
      dp[i][j] =
        Math.min(dp[i - 1][j], dp[i - 1][j - 1], dp[i - 1][j + 1]) +
        A[i][j - 1];
    }
  }

  console.log(dp);
  return Math.min(...dp[length - 1].slice(1, length + 1));
};

const A = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
// console.log(minFallingPathSum(A));
// const A = [[51, 24], [-50, 82]];
console.log(minFallingPathSum(A));

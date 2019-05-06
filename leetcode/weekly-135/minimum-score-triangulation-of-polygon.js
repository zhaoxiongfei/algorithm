/**
 * @param {number[]} A
 * @return {number}
 */
const minScoreTriangulation = A => {
  const { length } = A;
  const dp = Array(length);
  for (let i = 0; i < length; i += 1) dp[i] = Array(length).fill(0);

  for (let len = 2; len < length; len += 1) {
    for (let i = 0; i + len < length; i += 1) {
      const j = i + len;
      dp[i][j] = Infinity;
      for (let k = i + 1; k < j; k += 1) {
        dp[i][j] = Math.min(dp[i][j], dp[i][k] + dp[k][j] + A[i] * A[j] * A[k]);
      }
    }
  }

  return dp[0][length - 1];
};

console.log(minScoreTriangulation([5, 3, 5, 5, 1, 6, 2, 3]));
console.log(minScoreTriangulation([1, 2, 3]));
console.log(minScoreTriangulation([3, 7, 4, 5]));
console.log(minScoreTriangulation([1, 3, 1, 4, 1, 5]));

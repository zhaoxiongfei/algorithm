// https://leetcode-cn.com/problems/edit-distance/description/

/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
// 思路: 动态规划，用 dp[i][j] 记录 word1 第 i 位，word2 第 j 位编辑距离
// 递推公式为
// 1. word1[i] !== word2[j]: dp[i][j] = Min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1;
// 2. word1[i] === word2[j]: dp[i][j] = dp[i - 1][j - 1];
const minDistance = (word1, word2) => {
  const n1 = word1.length;
  const n2 = word2.length;
  if (n1 === 0) return n2;
  if (n2 === 0) return n1;

  const dp = [];
  for (let i = 0; i <= n1; i += 1) dp[i] = [i];
  for (let j = 0; j <= n2; j += 1) dp[0][j] = j;

  for (let i = 1; i <= n1; i += 1) {
    for (let j = 1; j <= n2; j += 1) {
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1;
      }
    }
  }

  return dp[n1][n2];
};

console.log(minDistance("a", "b"));
console.log(minDistance("horse", "ros"));
console.log(minDistance("intention", "execution"));

// https://leetcode-cn.com/problems/unique-binary-search-trees/description/
/**
 * @param {number} n
 * @return {number}
 */
// 思路: 思路此题有别于列出所有的可能性，这个只需要计算不同的二叉搜索树的数量
// 动态规划
// 递推公式 f(n) = f(n - 1)*f(0) + f(n - 2) * f(1) + f(n - 3) * f(3) ... f(0) * f(n -1)
const numTrees = n => {
  const dp = [1, 1, 2];
  for (let i = 3; i <= n; i += 1) {
    let total = 0;
    for (let j = 0; j < i; j += 1) {
      total += dp[i - j - 1] * dp[j];
    }

    dp[i] = total;
  }

  return dp[n];
};

console.log(numTrees(6));
console.log(numTrees(7));

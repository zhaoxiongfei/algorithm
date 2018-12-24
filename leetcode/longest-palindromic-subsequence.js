// https://leetcode-cn.com/problems/longest-palindromic-subsequence/
// No 516. 最长回文子序列

/**
  给定一个字符串s，找到其中最长的回文子序列。可以假设s的最大长度为1000。

  示例 1:
  输入:

  "bbbab"
  输出:

  4
  一个可能的最长回文子序列为 "bbbb"。

  示例 2:
  输入:

  "cbbd"
  输出:

  2
  一个可能的最长回文子序列为 "bb"。
 */

/**
 * @param {string} s
 * @return {number}
 */
// 思路: 动态规划 dp[i][j] 表示 从 i 到 j 的最长回文子序列
// dp[i][j] = 2 + dp[i + 1][j - 1] when s[i] === s[j]
// dp[i][j] = Math.max(dp[i][j - 1], dp[i + 1][j]); when s[i] !== s[j]
const longestPalindromeSubseq = s => {
  const { length } = s;
  if (length < 2) return length;

  const dp = Array(length);
  for (let i = 0; i < length; i += 1) {
    dp[i] = Array(length).fill(0);
    dp[i][i] = 1;
  }

  for (let i = length - 2; i >= 0; i -= 1) {
    for (let j = i + 1; j < length; j += 1) {
      if (s[i] === s[j]) {
        dp[i][j] = 2 + dp[i + 1][j - 1];
      } else {
        dp[i][j] = Math.max(dp[i][j - 1], dp[i + 1][j]);
      }
    }
  }

  return dp[0][length - 1];
};

console.log(longestPalindromeSubseq("bbbab"));
console.log(longestPalindromeSubseq("cbbd"));
console.log(longestPalindromeSubseq("abcdbd"));

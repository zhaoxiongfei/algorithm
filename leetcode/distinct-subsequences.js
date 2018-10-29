// https://leetcode-cn.com/problems/distinct-subsequences/description/

/**
  给定一个字符串 S 和一个字符串 T，计算在 S 的子序列中 T 出现的个数。

  一个字符串的一个子序列是指，通过删除一些（也可以不删除）字符且不干扰剩余字符相对位置所组成的新字符串。（例如，"ACE" 是 "ABCDE" 的一个子序列，而 "AEC" 不是）

  示例 1:

  输入: S = "rabbbit", T = "rabbit"
  输出: 3
  解释:

  如下图所示, 有 3 种可以从 S 中得到 "rabbit" 的方案。
  (上箭头符号 ^ 表示选取的字母)

  rabbbit
  ^^^^ ^^
  rabbbit
  ^^ ^^^^
  rabbbit
  ^^^ ^^^
 */

/**
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
// 思路: 动态规划 dp[i][j] 表示 s[i] t[j] 匹配的次数
// 递推公式
//    dp[i][j] = dp[i][j - 1] when s[j] != t[i]
//    dp[i][j] = dp[i - 1][j - 1] + dp[i][j - 1] when s[j] == t[i]
const numDistinct = (s, t) => {
  const m = s.length;
  const n = t.length;
  const dp = [Array(m + 1).fill(1)];
  for (let i = 1; i <= n; i += 1) {
    dp.push([0]);
    for (let j = 1; j <= m; j += 1) {
      dp[i][j] = dp[i][j - 1];
      if (t[i - 1] === s[j - 1]) {
        dp[i][j] += dp[i - 1][j - 1];
      }
    }
  }

  return dp[n][m];
};

// console.log(numDistinct("rabbbit", "rabbit"));
console.log(numDistinct("babgbag", "bag"));

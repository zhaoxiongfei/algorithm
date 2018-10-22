// https://leetcode-cn.com/problems/wildcard-matching/description/
//
// 思路： 动态规划
// 二维动态规划表 dp[i][j] 代表截止到 s[i], p[j] 是否匹配
// 若要完全匹配，则 p 的最后一个字符和 s的最后一个字符匹配, 且p
const isMatch = (s, p) => {
  const sLen = s.length;
  const pLen = p.length;
  const dp = [[true]]; // 二维动态规划表, sLen + 1行，pLen + 1列

  for (let i = 1; i <= pLen; i += 1) {
    if (p[i - 1] === "*") {
      // 如果模式串上一个为通配符，则当前dp值为上一个dp的值，因为 * 可以匹配任意多个
      dp[0][i] = dp[0][i - 1];
    } else {
      // 如果不是通配符则等于false，因为 0 代表 s 为空
      dp[0][i] = false;
    }
  }

  for (let i = 1; i <= sLen; i += 1) {
    if (!dp[i]) dp[i] = [];
    dp[i][0] = false; // 代表模式串为空, 所以取值是 false
    for (let j = 1; j <= pLen; j += 1) {
      const pattern = p[j - 1];
      if (pattern === "*") {
        dp[i][j] = dp[i][j - 1] || dp[i - 1][j - 1] || dp[i - 1][j];
      } else {
        dp[i][j] =
          dp[i - 1][j - 1] && (pattern === "?" || pattern === s[i - 1]);
      }
    }
  }

  return dp[sLen][pLen];
};

console.log(isMatch("adceb", "a*c?b"));
console.log(isMatch("adceb".repeat(1000), "a*c?b".repeat(1000)));

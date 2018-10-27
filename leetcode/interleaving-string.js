// https://leetcode-cn.com/problems/interleaving-string/description/

/**
 * 给定三个字符串 s1, s2, s3, 验证 s3 是否是由 s1 和 s2 交错组成的。
 *  示例 1:
 *
 *  输入: s1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac"
 *  输出: true
 *  示例 2:
 *
 *  输入: s1 = "aabcc", s2 = "dbbca", s3 = "aadbbbaccc"
 *  输出: false
 */
/**
 * @param {string} s1
 * @param {string} s2
 * @param {string} s3
 * @return {boolean}
 */
// 思路: 题目要求交替出现，即 s1 出一部分，s2 出一分部，直到结束，每次出的长度没有要求
// 动态规划令 dp[i][j] 表示 s1 截止到第 i 个字符，s2 截止到第 j 个字符，
// 是否满足交替出现匹配 s3 的 [i + j] 个字符
// dp[0][0] = 1; 代表s1 的第 0 个字符，s2 的第 0 个字符，匹配 s3 的第 0个字符，都是空字符所以匹配
// dp[i][j] = 1 case1: dp[i][j - 1] === 1 and s2[j] === s3[i + j]
//              case2: dp[i - 1][j] === 1 and s1[i] === s3[i + j]
const isInterleave = (s1, s2, s3) => {
  const n1 = s1.length;
  const n2 = s2.length;
  const n3 = s3.length;
  if (n3 !== n1 + n2) return false;
  if (n1 === 0) return s2 === s3;
  if (n2 === 0) return s1 === s3;

  // 下面之所以要给前面补零，是为了顺序都从 1 开始
  const ss1 = ` ${s1}`;
  const ss2 = ` ${s2}`;
  const ss3 = ` ${s3}`;
  const dp = [[1]];
  for (let i = 1; i <= n2; i += 1)
    dp[0][i] = dp[0][i - 1] === 1 && ss3[i] === ss2[i] ? 1 : 0;
  for (let i = 1; i <= n1; i += 1)
    dp[i] = [dp[i - 1][0] === 1 && ss3[i] === ss1[i] ? 1 : 0];

  for (let i = 1; i <= n1; i += 1) {
    if (!dp[i]) dp[i] = Array(n2 + 1).fill(0);
    for (let j = 1; j <= n2; j += 1) {
      dp[i][j] = 0;
      if (
        (dp[i - 1][j] === 1 && ss1[i] === ss3[i + j]) ||
        (dp[i][j - 1] === 1 && ss2[j] === ss3[i + j])
      )
        dp[i][j] = 1;
    }
  }

  return dp[n1][n2] === 1;
};

console.log(isInterleave("db", "b", "cbb"));
console.log(isInterleave("aabd", "abdc", "aabdabcd"));
console.log(isInterleave("", "", ""));
console.log(isInterleave("aabcc", "dbbca", "aadbbcbcac"));
console.log(isInterleave("aabcc", "dbbca", "aadbbbaccc"));

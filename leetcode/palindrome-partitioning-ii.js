// https://leetcode-cn.com/problems/palindrome-partitioning-ii/description/
// No. 132
/**
  给定一个字符串 s，将 s 分割成一些子串，使每个子串都是回文串。

  返回符合要求的最少分割次数。

  示例:

  输入: "aab"
  输出: 1
  解释: 进行一次分割就可将 s 分割成 ["aa","b"] 这样两个回文子串。
 */
// 思路: 参考 https://blog.csdn.net/jin_kwok/article/details/51423222
// 动态规划，令 dp[i][j] (0<=i <= j <= s.length) 为从 i 到 j 的子字符串是否是回文串
// 递归公式为 dp[i][j] = s[i] === s[j] && (j - i <= 1 || dp[i + 1][j - 1] === 1) ? 1 : 0;
const minCut = s => {
  const { length } = s;
  const dp = [];
  const cut = Array(length + 1).fill(0);

  // 因为递推公式需要用到 dp[i + 1][j - 1]
  // 所以这里 i 从大到小，j 从小到大，当然 j要从i开始
  for (let i = length - 1; i >= 0; i -= 1) {
    dp[i] = Array(length).fill(0);
    cut[i] = Infinity;
    for (let j = i; j < length; j += 1) {
      if (s[i] === s[j] && (j - i <= 1 || dp[i + 1][j - 1] === 1)) {
        dp[i][j] = 1;
        if (cut[i] > cut[j + 1] + 1) cut[i] = cut[j + 1] + 1;
      }
    }
  }

  return cut[0] - 1;
};

// console.log(minCut("aab"));
console.log(minCut("leeteecee"));

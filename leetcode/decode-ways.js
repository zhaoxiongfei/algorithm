// https://leetcode-cn.com/problems/decode-ways/description/
//

/**
 * @param {string} s
 * @return {number}
 */
// 思路: 递归求和, 解码总方式等于 fn(n - 1) + fn(n - 2)
// 所以这个题可以算作动态规划，且从后往前会轻松很多，因为可以复用结果
// 如果是从前往后会累死的。
// 使用 dp[i] 来记录从 i 个字符到结尾总共有多少种方式, 递推公式 dp[i] = dp[i + 1] + dp[i + 2];
const numDecodings = s => {
  const { length } = s;
  if (length === 0) return 1;

  const dp = Array(length + 1).fill(0);
  dp[length] = 1;
  dp[length - 1] = s[length - 1] !== "0" ? 1 : 0;

  for (let i = length - 2; i >= 0; i -= 1) {
    if (s[i] !== "0") {
      // 一位数字，只要不等于0 就合法
      dp[i] = dp[i + 1];
      if (s.substr(i, 2) <= 26) dp[i] += dp[i + 2];
    }
  }

  return dp[0];
};

console.log(numDecodings("301"));
console.log(numDecodings("27"));
console.log(numDecodings("0"));
console.log(numDecodings("01"));
console.log(numDecodings("12"));
console.log(numDecodings("230"));
console.log(numDecodings("111"));
console.log(numDecodings("1111"));
console.log(numDecodings("11111"));
console.log(numDecodings("12"));
console.log(numDecodings("226"));
console.log(numDecodings("120345"));
console.log(
  numDecodings(
    "1787897759966261825913315262377298132516969578441236833255596967132573482281598412163216914566534565"
  )
);

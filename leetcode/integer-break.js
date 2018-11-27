// https://leetcode-cn.com/problems/integer-break/description/
// No 343. 整数拆分

/**
  给定一个正整数 n，将其拆分为至少两个正整数的和，
  并使这些整数的乘积最大化。 返回你可以获得的最大乘积。

  示例 1:

  输入: 2
  输出: 1
  解释: 2 = 1 + 1, 1 × 1 = 1。
  示例 2:

  输入: 10
  输出: 36
  解释: 10 = 3 + 3 + 4, 3 × 3 × 4 = 36。
  说明: 你可以假设 n 不小于 2 且不大于 58。
 */

/**
 * @param {number} n
 * @return {number}
 */

/*
const integerBreak = n => {
  const dp = [1, 2, 4]; // 从 2 开始 2 => 0, 3 => 1, 4 => 2, n => n - 2 => ....
  const maxTwoCombine = m => {
    let max = 0;
    for (let i = 2; i < m - 1; i += 1) {
      const p = Math.max(dp[i - 2], i) * Math.max(dp[m - i - 2], m - i);
      if (p > max) max = p;
    }

    return max;
  };

  for (let i = 5; i <= n; i += 1) {
    dp[i - 2] = maxTwoCombine(i);
  }

  console.log(dp);
  return dp[n - 2];
};
*/

/**
 * 按 e 超越数的性质来做
 */
const integerBreak2 = n => {
  if (n <= 3) return n - 1;
  let res = 1;
  while (n > 4) {
    res *= 3;
    n -= 3;
  }
  return res * n;
};

console.log(integerBreak2(100));

const ans = [
  1,
  2,
  4,
  6,
  9,
  12,
  18,
  27,
  36,
  54,
  81,
  108,
  162,
  243,
  324,
  486,
  729,
  972,
  1458,
  2187,
  2916,
  4374,
  6561,
  8748,
  13122,
  19683,
  26244,
  39366,
  59049,
  78732,
  118098,
  177147,
  236196,
  354294,
  531441,
  708588,
  1062882,
  1594323,
  2125764,
  3188646,
  4782969,
  6377292,
  9565938,
  14348907,
  19131876,
  28697814,
  43046721,
  57395628,
  86093442,
  129140163,
  172186884,
  258280326,
  387420489,
  516560652,
  774840978,
  1162261467,
  1549681956
];

/**
 * @param {number} n
 * @return {number}
 */
const integerBreak = n => ans[n - 2];

console.log(integerBreak(58));

// https://leetcode-cn.com/problems/coin-change-2/
// No 518. 零钱兑换 II

/**
  给定不同面额的硬币和一个总金额。
  写出函数来计算可以凑成总金额的硬币组合数。
  假设每一种面额的硬币有无限个。

  示例 1:

  输入: amount = 5, coins = [1, 2, 5]
  输出: 4
  解释: 有四种方式可以凑成总金额:
  5=5
  5=2+2+1
  5=2+1+1+1
  5=1+1+1+1+1
  示例 2:

  输入: amount = 3, coins = [2]
  输出: 0
  解释: 只用面额2的硬币不能凑成总金额3。
  示例 3:

  输入: amount = 10, coins = [10]
  输出: 1


  注意:

  你可以假设：

  0 <= amount (总金额) <= 5000
  1 <= coin (硬币面额) <= 5000
  硬币种类不超过 500 种
  结果符合 32 位符号整数
 */

/**
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */
// 思路: 动态规划 dp[i] 带包凑够 i 金额的有多少种方法
// dp[i] = ∑dp[i - coins[j]]
const change = (amount, coins) => {
  const { length } = coins;
  if (amount === 0) return 1;
  if (length === 0) return 0;

  const dp = Array(amount + 1).fill(0);
  dp[0] = 1;

  for (const coin of coins) {
    for (let i = 0; i <= amount; i += 1) {
      if (coin + i <= amount) {
        dp[i + coin] += dp[i];
      }
    }
  }

  console.log(dp);
  return dp[amount];
};

console.log(change(5, [1, 2, 5]));

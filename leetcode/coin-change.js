// https://leetcode-cn.com/problems/coin-change/description/
// 322. 零钱兑换

/**
  给定不同面额的硬币 coins 和一个总金额 amount。
  编写一个函数来计算可以凑成总金额所需的最少的硬币个数。
  如果没有任何一种硬币组合能组成总金额，返回 -1。

  示例 1:

  输入: coins = [1, 2, 5], amount = 11
  输出: 3
  解释: 11 = 5 + 5 + 1
  示例 2:

  输入: coins = [2], amount = 3
  输出: -1
  说明:
  你可以认为每种硬币的数量是无限的。
 */

/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
// 思路: 动态规划 令 dp[i] 为凑足 i 需要的硬币数
// 递推公式: dp[i] = Min(dp[i - ...coin] + 1)
const coinChange = (coins, amount) => {
  const dp = Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let i = 1; i <= amount; i += 1) {
    for (const coin of coins) {
      if (i < coin) continue;
      dp[i] = Math.min(dp[i], dp[i - coin] + 1);
    }
  }

  return dp[amount] === Infinity ? -1 : dp[amount];
};

// 思路二: BFS 算法，寻找0 到 amount 最段路径
const coinChangeBFS = (coins, amount) => {
  if (amount === 0) return 0;
  const visited = Array(amount + 1).fill(false);
  let step = 0;
  let curr = [0]; // 当前起点
  let next = []; // 下一个可能的值
  while (curr.length) {
    step += 1;
    for (const coin of coins) {
      for (const n of curr) {
        const nextValue = n + coin;
        if (nextValue === amount) return step;
        if (nextValue > amount) continue;
        if (!visited[nextValue]) {
          visited[nextValue] = true;
          next.push(nextValue);
        }
      }
    }
    curr = next;
    next = [];
  }

  return -1;
};

console.log(coinChange([1, 2, 5], 11));
console.log(coinChangeBFS([1, 2, 5], 11));

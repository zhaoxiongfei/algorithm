// 背包问题
// https://www.bilibili.com/video/av36136952?from=search&seid=8963114943506671970

/**
  容量为 w 的背包
  一系列商品有重量和价格，如何选择可以达到背包价值最大化
 */

/**
 * @param Array goods 商品列表 [weight, price];
 * @param Number capacity 背包的容量(以重量来记)
 *
 * @return Number 背包能承载的最大价值
 */
// 思路: 对于任何一个商品只有两种情况，选择或放弃
const knapsack = (goods, capacity) => {
  const { length } = goods;
  const dp = Array(length + 1);
  for (let i = 0; i <= length; i += 1) dp[i] = Array(capacity + 1).fill(0);

  for (let i = 1; i <= length; i += 1) {
    const [w, p] = goods[i - 1];
    for (let j = 0; j <= capacity; j += 1) {
      if (j < w) {
        dp[i][j] = dp[i - 1][j];
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - w] + p);
      }
    }
  }

  return dp;
};

console.log(knapsack([[2, 3], [3, 4], [4, 5], [5, 8], [9, 10]], 20));

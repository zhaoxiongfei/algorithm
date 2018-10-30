// https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock/description/

/**
 * @param {number[]} prices
 * @return {number}
 */
// 思路: 动态规划， 这种求极值的情况基本上都是动态规划
// 令 dp[i][j] 代表第 i 天买入，j 天卖出的收益, j > i;
// 因为只需要求最大值，所以dp可以省略
// 直接记录一个当前的最大值即可
const maxProfit = prices => {
  const { length } = prices;
  if (!length) return 0;
  let max = 0;
  for (let i = 0; i < length; i += 1) {
    for (let j = i + 1; j < length && prices[j] > prices[i]; j += 1) {
      const profit = prices[j] - prices[i];
      if (profit > max) max = profit;
    }
  }
  return max;
};

console.log(maxProfit([7, 1, 5, 3, 6, 4]));

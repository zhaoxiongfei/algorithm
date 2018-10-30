// https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iii/description/

/**
  给定一个数组，它的第 i 个元素是一支给定的股票在第 i 天的价格。

  设计一个算法来计算你所能获取的最大利润。你最多可以完成 两笔 交易。

  注意: 你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。

  示例 1:

  输入: [3,3,5,0,0,3,1,4]
  输出: 6
  解释: 在第 4 天（股票价格 = 0）的时候买入，在第 6 天（股票价格 = 3）的时候卖出，这笔交易所能获得利润 = 3-0 = 3 。
       随后，在第 7 天（股票价格 = 1）的时候买入，在第 8 天 （股票价格 = 4）的时候卖出，这笔交易所能获得利润 = 4-1 = 3 。
  示例 2:

  输入: [1,2,3,4,5]
  输出: 4
  解释: 在第 1 天（股票价格 = 1）的时候买入，在第 5 天 （股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5-1 = 4 。
       注意你不能在第 1 天和第 2 天接连购买股票，之后再将它们卖出。
       因为这样属于同时参与了多笔交易，你必须在再次购买前出售掉之前的股票。
  示例 3:

  输入: [7,6,4,3,1]
  输出: 0
  解释: 在这个情况下, 没有交易完成, 所以最大利润为 0。
 */

// 思路二: 单词循环，从左到右找到最小谷之后的最大峰，比较max的大小，更新之
const _maxProfit = (prices, start, end) => {
  let max = 0;
  let minPrice = Infinity;
  for (let i = start; i < end; i += 1) {
    const profit = prices[i] - minPrice;
    if (profit > 0) {
      if (profit > max) max = profit;
    } else {
      minPrice = prices[i];
    }
  }
  return max;
};
/**
 * @param {number[]} prices
 * @return {number}
 */
// 思路: 在不同的地方切开，递归计算左右两侧交易一次的最大收益，之后求和找最大的值
// 公式: Math.max(...[maxProfit(prices, 0, i) + maxProfit(prices, i, end)]);
const maxProfit = prices => {
  const { length } = prices;
  let max = 0;
  let end = length; // 利用start，end做一些剪枝操作
  let start = 0;
  while (prices[start] >= prices[start + 1]) start += 1;
  while (end > 0 && prices[end - 1] <= prices[end - 2]) end -= 1;
  for (let i = 0; i < end; i += 1) {
    const profit = _maxProfit(prices, start, i) + _maxProfit(prices, i, end);
    if (profit > max) max = profit;
  }

  return max;
};

console.log(maxProfit([3, 3, 5, 0, 0, 3, 1, 4]));
// console.log(maxProfit([1, 2, 4, 2, 5, 7, 2, 4, 9, 0]));
// console.log(maxProfit([6, 1, 3, 2, 4, 7]));
// console.log(maxProfit([1, 2, 3, 4, 5]));
// console.log(maxProfit([3, 3, 5, 0, 0, 3, 1, 4]));

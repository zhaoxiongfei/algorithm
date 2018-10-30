// https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock/description/

/**
 * @param {number[]} prices
 * @return {number}
 */
// 思路: 暴力法，两层循环，找最大差值时间复杂度 O(n²)
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

// 思路二: 单词循环，从左到右找到最小谷之后的最大峰，比较max的大小，更新之
const maxProfit2 = prices => {
  let max = 0;
  let minPrice = Infinity;
  for (let i = 0; i < prices.length; i += 1) {
    const profit = prices[i] - minPrice;
    if (profit > 0) {
      if (profit > max) max = profit;
    } else {
      minPrice = prices[i];
    }
  }
  return max;
};

console.log(maxProfit([7, 1, 5, 3, 6, 4]));
console.log(maxProfit2([7, 1, 5, 3, 6, 4]));

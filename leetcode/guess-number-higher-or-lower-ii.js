// https://leetcode-cn.com/problems/guess-number-higher-or-lower-ii/description/
// No 375. 猜数字大小 II

/**
  我们正在玩一个猜数游戏，游戏规则如下：

  我从 1 到 n 之间选择一个数字，你来猜我选了哪个数字。

  每次你猜错了，我都会告诉你，我选的数字比你的大了或者小了。

  然而，当你猜了数字 x 并且猜错了的时候，你需要支付金额为 x 的现金。直到你猜到我选的数字，你才算赢得了这个游戏。

  示例:

  n = 10, 我选择了8.

  第一轮: 你猜我选择的数字是5，我会告诉你，我的数字更大一些，然后你需要支付5块。
  第二轮: 你猜是7，我告诉你，我的数字更大一些，你支付7块。
  第三轮: 你猜是9，我告诉你，我的数字更小一些，你支付9块。

  游戏结束。8 就是我选的数字。

  你最终要支付 5 + 7 + 9 = 21 块钱。
  给定 n ≥ 1，计算你至少需要拥有多少现金才能确保你能赢得这个游戏。
*/

/**
 * @param {number} n
 * @return {number}
 */
// 思路: 动态规划，从小到大
const getMoneyAmount = n => {
  if (n === 0) return n;
  //              0, 1, 2, 3, 4, 5, 6, 7,  8,  9,  10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20
  //              0, 0, 1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 21, 24, 27, 30, 34, 38, 42, 46, 49
  const dp = Array(n + 1);
  for (let i = 0; i <= n; i += 1) dp[i] = Array(n + 1).fill(0);

  for (let i = n - 1; i > 0; i -= 1) {
    for (let j = i + 1; j <= n; j += 1) {
      let ans = Infinity;
      for (let k = i; k < j; k += 1) {
        ans = Math.min(ans, k + Math.max(dp[i][k - 1], dp[k + 1][j]));
      }
      dp[i][j] = ans;
    }
  }

  return dp[1][n];
};

console.log(getMoneyAmount(300));

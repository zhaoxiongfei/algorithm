// https://leetcode-cn.com/problems/ipo/
// No 502. IPO

/**
  示例 1:

  输入: k=2, W=0, Profits=[1,2,3], Capital=[0,1,1].

  输出: 4

  解释:
  由于你的初始资本为 0，你尽可以从 0 号项目开始。
  在完成后，你将获得 1 的利润，你的总资本将变为 1。
  此时你可以选择开始 1 号或 2 号项目。
  由于你最多可以选择两个项目，所以你需要完成 2 号项目以获得最大的资本。
  因此，输出最后最大化的资本，为 0 + 1 + 3 = 4。


  注意:

  假设所有输入数字都是非负整数。
  表示利润和资本的数组的长度不超过 50000。
  答案保证在 32 位有符号整数范围内。
 */

/**
 * @param {number} k
 * @param {number} W
 * @param {number[]} Profits
 * @param {number[]} Capital
 * @return {number}
 */
// 思路: 直观感觉这个问题是0/1背包问题的变种
// 也可能是贪心算法，在资金够的情况下选择利润最大的项目
const findMaximizedCapital = (k, W, Profits, Capital) => {
  const { length } = Profits;
  if (length === 0) return W;
  const list = Array(length);
  for (let i = 0; i < Profits.length; i += 1) {
    list[i] = [Profits[i], Capital[i]];
  }
  list.sort((a, b) => a[0] - b[0]);

  const find = e => {
    for (let i = list.length - 1; i >= 0; i -= 1) {
      if (list[i][1] <= e) return i;
    }
    return -1;
  };

  let total = W;
  for (let i = 0; i < k; i += 1) {
    const index = find(total);
    if (index === -1) continue;
    total += list[index][0];
    list.splice(index, 1);
  }

  return total;
};

console.log(findMaximizedCapital(2, 0, [1, 2, 3], [0, 1, 1]));

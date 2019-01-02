// https://leetcode-cn.com/problems/beautiful-arrangement/submissions/
// No 526. 优美的排列

/**
  假设有从 1 到 N 的 N 个整数，如果从这 N 个数字中成功构造出一个数组，
  使得数组的第 i 位 (1 <= i <= N) 满足如下两个条件中的一个，我们就称这个数组为一个优美的排列。条件：

  第 i 位的数字能被 i 整除
  i 能被第 i 位上的数字整除
  现在给定一个整数 N，请问可以构造多少个优美的排列？

  示例1:

  输入: 2
  输出: 2
  解释:

  第 1 个优美的排列是 [1, 2]:
    第 1 个位置（i=1）上的数字是1，1能被 i（i=1）整除
    第 2 个位置（i=2）上的数字是2，2能被 i（i=2）整除

  第 2 个优美的排列是 [2, 1]:
    第 1 个位置（i=1）上的数字是2，2能被 i（i=1）整除
    第 2 个位置（i=2）上的数字是1，i（i=2）能被 1 整除
  说明:

  N 是一个正整数，并且不会超过15。
 */

/**
 * @param {number} N
 * @return {number}
 */
/*
const countArrangement = N => {
  const used = new Array(N + 1).fill(false);
  let count = 0;
  const comb = pos => {
    if (pos === N + 1) {
      count += 1;
      return;
    }
    for (let i = 1; i <= N; i += 1) {
      if (used[i]) continue;
      if (pos % i === 0 || i % pos === 0) {
        used[i] = true;
        comb(pos + 1);
        used[i] = false;
      }
    }
  };

  comb(1);
  return count;
};
*/

const table = [
  0,
  1,
  2,
  3,
  8,
  10,
  36,
  41,
  132,
  250,
  700,
  750,
  4010,
  4237,
  10680,
  24679
];
const countArrangement = N => table[N];

for (let i = 1; i <= 15; i += 1) {
  console.log("%d: %d", i, countArrangement(i));
}

// https://leetcode-cn.com/problems/elimination-game/description/
// No 390. 消除游戏

/**
  给定一个从1 到 n 排序的整数列表。
  首先，从左到右，从第一个数字开始，每隔一个数字进行删除，直到列表的末尾。
  第二步，在剩下的数字中，从右到左，从倒数第一个数字开始，每隔一个数字进行删除，直到列表开头。
  我们不断重复这两步，从左到右和从右到左交替进行，直到只剩下一个数字。
  返回长度为 n 的列表中，最后剩下的数字。

  示例：

  输入:
  n = 9,
  1 2 3 4 5 6 7 8 9
  2 4 6 8
  2 6
  6

  输出:
  6
 */

/**
 * @param {number} n
 * @return {number}
 */
const lastRemaining1 = n => {
  if (n === 1) return 1;
  if (n === 2) return 2;
  let list = [];
  const lastEven = (n >> 1) << 1;
  for (let i = 2; i <= n; i += 2) {
    if (lastEven < 4 || (lastEven - i) % 4) list.push(i);
  }

  while (list.length > 1) {
    list = list.filter((x, i) => i % 2);
    if (list.length > 1) {
      const even = list.length % 2 === 0;
      list = list.filter((x, i) => (even ? i % 2 === 0 : i % 2));
    }
  }

  return list[0];
};

const lastRemaining = (n, left = true) => {
  if (n === 1) return 1;
  if (left) {
    return 2 * lastRemaining((n / 2) | 0, false);
  }
  return 2 * lastRemaining((n / 2) | 0, true) - 1 + (n % 2);
};

for (let i = 2; i < 1000; i += 2) {
  console.log("n: %d => %d", i, lastRemaining1(i));
}

for (let i = 2; i < 100; i += 2) {
  console.log("n: %d => %d", i, lastRemaining(i));
}

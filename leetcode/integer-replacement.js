// https://leetcode-cn.com/problems/integer-replacement/description/
// No 397. 整数替换

/**
  给定一个正整数 n，你可以做如下操作：

  1. 如果 n 是偶数，则用 n / 2替换 n。
  2. 如果 n 是奇数，则可以用 n + 1或n - 1替换 n。
  n 变为 1 所需的最小替换次数是多少？

  示例 1:

  输入:
  8

  输出:
  3

  解释:
  8 -> 4 -> 2 -> 1
  示例 2:

  输入:
  7

  输出:
  4

  解释:
  7 -> 8 -> 4 -> 2 -> 1
  或
  7 -> 6 -> 3 -> 2 -> 1
 */

/**
 * @param {number} n
 * @return {number}
 */
const integerReplacement = n => {
  if (n === 1) return 0;
  const b = n.toString(2);
  const { length } = b;
  const down = 2 ** (length - 1);
  if (down === n) return length - 1;

  if (n % 2 === 0) return 1 + integerReplacement(n >> 1);

  return 1 + Math.min(integerReplacement(n - 1), integerReplacement(n + 1));
};

console.log(integerReplacement(2147483647));
console.log(integerReplacement(10000));
console.log(integerReplacement(5));
console.log(integerReplacement(125));
console.log(integerReplacement(1000));
console.log(integerReplacement(7));
console.log(integerReplacement(8));
console.log(integerReplacement(15));

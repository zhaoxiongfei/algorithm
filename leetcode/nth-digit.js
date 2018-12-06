// https://leetcode-cn.com/problems/nth-digit/description/
// 400. 第N个数字

/**
  在无限的整数序列 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, ...中找到第 n 个数字。

  注意:
  n 是正数且在32为整形范围内 ( n < 231)。

  示例 1:

  输入:
  3

  输出:
  3
  示例 2:

  输入:
  11

  输出:
  0

  说明:
  第11个数字在序列 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, ... 里是0，它是10的一部分。
  */

/**
 * @param {number} n
 * @return {number}
 */
const findNthDigit = n => {
  if (n < 10) return n;
  let len = 1;
  let total = 0;
  while (n > len) {
    const m = Math.min((n / len) | 0, 9 * 10 ** (len - 1));
    n -= len * m;
    total += m;
    len += 1;
  }

  if (n === 0) return total % 10;
  return (total + 1).toString()[n - 1];
};

console.log(findNthDigit(13));
console.log(findNthDigit(2034567832));
// console.log(findNthDigit(12));
// console.log(findNthDigit(11));
// console.log(findNthDigit(50));

// https://leetcode-cn.com/problems/number-of-digit-one/description/
// No 233. 数字1的个数

/**
  给定一个整数 n，计算所有小于等于 n 的非负整数中数字 1 出现的个数。

  示例:

  输入: 13
  输出: 6
  解释: 数字 1 出现在以下数字中: 1, 10, 11, 12, 13 。
*/

/**
 * @param {number} n
 * @return {number}
 */
// 思路: 逐个位计算1出现的次数，之后相加
const countDigitOne = n => {
  if (n < 1) return 0;
  let count = 0;
  let pow = 1;
  let num = 10 ** pow;
  while (num <= n) {
    let a = Math.floor(n / num);
    const b = Math.floor((n % num) / 10 ** (pow - 1));
    if (b >= 2) {
      a += 1;
    } else if (b === 1) {
      count += 1 + (n % 10 ** (pow - 1));
    }
    count += 10 ** (pow - 1) * a;

    // console.log("a count: %d, a: %d, b: %d", count, a, b);
    pow += 1;
    num = 10 ** pow;
  }
  // console.log("b count: %d", count);
  const a = Math.floor((n * 10) / num);
  // console.log("aaaaa a: %d", a);
  if (a > 1) {
    count += 10 ** (pow - 1);
    // console.log("c count: %d", count);
  } else {
    count += 1 + (n % (num / 10));
    // console.log("d count: %d", count);
  }

  return count;
};

console.log(countDigitOne(1456));
// console.log(countDigitOne(139));

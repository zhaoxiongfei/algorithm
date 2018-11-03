// https://leetcode-cn.com/problems/fraction-to-recurring-decimal/description/
// No 166. 分数到小数

/**
  给定两个整数，分别表示分数的分子 numerator 和分母 denominator，以字符串形式返回小数。

  如果小数部分为循环小数，则将循环的部分括在括号内。

  示例 1:

  输入: numerator = 1, denominator = 2
  输出: "0.5"
  示例 2:

  输入: numerator = 2, denominator = 1
  输出: "2"
  示例 3:

  输入: numerator = 2, denominator = 3
  输出: "0.(6)"
 */

const helper = (numerator, denominator) => {
  const exists = {};

  const integer = Math.floor(numerator / denominator);
  let left = (numerator % denominator) * 10;

  let loop = -1;
  const decimal = [];
  while (left) {
    if (exists[left] !== undefined) {
      loop = exists[left];
      break;
    }
    const quotient = left < denominator ? 0 : parseInt(left / denominator, 10);
    exists[left] = decimal.length;
    decimal.push(quotient);

    if (denominator <= left) left %= denominator;
    left *= 10;
  }

  if (!decimal.length) return `${integer}`;
  if (loop !== -1) {
    decimal[loop] = `(${decimal[loop]}`;
    decimal.push(")");
  }
  return `${integer}.${decimal.join("")}`;
};

/**
 * @param {number} numerator
 * @param {number} denominator
 * @return {string}
 */
// 思路: 先求整数部分，剩下的余数部分模拟手动计算
// 注意负数的问题
const fractionToDecimal = (numerator, denominator) => {
  if (numerator === 0) return "0";
  let res = helper(Math.abs(numerator), Math.abs(denominator));
  if (numerator * denominator < 0) res = `-${res}`;
  return res;
};

console.log(fractionToDecimal(-2147483648, 1));
console.log(fractionToDecimal(-1, 2147483648));
console.log(fractionToDecimal(-1, -2147483648));
console.log(fractionToDecimal(1, 2147483648));
console.log(fractionToDecimal(1, 214748364));
console.log(fractionToDecimal(-50, 8));
console.log(fractionToDecimal(1, 6));
console.log(fractionToDecimal(4, 333));
console.log(fractionToDecimal(10, 3));
console.log(fractionToDecimal(1, 3));
console.log(fractionToDecimal(100, 99));
console.log(fractionToDecimal(1, 99999));

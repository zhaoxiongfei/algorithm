// https://leetcode-cn.com/problems/additive-number/description/
// No 306. 累加数

/**
  累加数是一个字符串，组成它的数字可以形成累加序列。

  一个有效的累加序列必须至少包含 3 个数。除了最开始的两个数以外，
  字符串中的其他数都等于它之前两个数相加的和。

  给定一个只包含数字 '0'-'9' 的字符串，编写一个算法来判断给定输入是否是累加数。

  说明: 累加序列里的数不会以 0 开头，所以不会出现 1, 2, 03 或者 1, 02, 3 的情况。

  示例 1:

  输入: "112358"
  输出: true
  解释: 累加序列为: 1, 1, 2, 3, 5, 8 。1 + 1 = 2, 1 + 2 = 3, 2 + 3 = 5, 3 + 5 = 8
  示例 2:

  输入: "199100199"
  输出: true
  解释: 累加序列为: 1, 99, 100, 199。1 + 99 = 100, 99 + 100 = 199
  进阶:
  你如何处理一个溢出的过大的整数输入?
 */

const check = (first, second, num) => {
  const next = (+first + +second).toString();
  if (next === num) return true;
  if (next !== num.slice(0, next.length)) return false;
  return check(second, next, num.slice(next.length));
};

/**
 * @param {string} num
 * @return {boolean}
 */
// 思路: 前面两个数决定了后面所有数的切分方式
const isAdditiveNumber = num => {
  const { length } = num;
  const firstMaxLen = Math.ceil((length + 1) / 2);
  for (let i = 1; i <= firstMaxLen; i += 1) {
    if (num[0] === "0" && i > 1) break;
    const first = num.slice(0, i);
    const secondMaxLen = Math.ceil((length + i) / 2);
    for (let j = i + 1; j <= secondMaxLen; j += 1) {
      if (num[i] === "0" && j > i + 1) break;
      const second = num.slice(i, j);
      if (check(first, second, num.slice(j))) return true;
    }
  }

  return false;
};

console.log(isAdditiveNumber("199111992"));
// console.log(isAdditiveNumber("0235813"));
// console.log(isAdditiveNumber("101"));
// console.log(isAdditiveNumber("123"));
// console.log(isAdditiveNumber("199100199"));
// console.log(isAdditiveNumber("1991001991"));
// console.log(isAdditiveNumber("112358"));

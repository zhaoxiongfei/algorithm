// https://leetcode-cn.com/problems/perfect-number/submissions/
// No 507. 完美数

/**
  对于一个 正整数，如果它和除了它自身以外的所有正因子之和相等，我们称它为“完美数”。

  给定一个 正整数 n， 如果他是完美数，返回 True，否则返回 False

  示例：

  输入: 28
  输出: True
  解释: 28 = 1 + 2 + 4 + 7 + 14


  注意:

  输入的数字 n 不会超过 100,000,000. (1e8)
 */

/**
 * @param {number} num
 * @return {boolean}
 */
const checkPerfectNumber = num => {
  if (num === 1) return false;
  const mi = Math.sqrt(num) | 0;
  let sum = 1;
  for (let i = 2; i <= mi; i += 1) {
    if (num % i) continue;
    const res = num / i;
    console.log("i: %d, res: %d", i, res);
    sum += i;
    if (res !== i) sum += res;
    if (num < sum) return false;
  }

  return sum === num;
};

console.log(checkPerfectNumber(1));
console.log(checkPerfectNumber(28));

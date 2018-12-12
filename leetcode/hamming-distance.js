// https://leetcode-cn.com/problems/hamming-distance/submissions/
// No 461. 汉明距离

/**
  两个整数之间的汉明距离指的是这两个数字对应二进制位不同的位置的数目。

  给出两个整数 x 和 y，计算它们之间的汉明距离。

  注意：
  0 ≤ x, y < 231.

  示例:

  输入: x = 1, y = 4

  输出: 2

  解释:
  1   (0 0 0 1)
  4   (0 1 0 0)
         ↑   ↑

  上面的箭头指出了对应二进制位不同的位置。
 */

/**
 * @param {number} x
 * @param {number} y
 * @return {number}
 */
const hammingDistance = (x, y) => {
  let total = 0;
  for (let i = 0; i <= 31; i += 1) {
    const base = 2 ** i;
    if ((base & x) !== (base & y)) total += 1;
  }

  return total;
};

const hammingDistance1 = (x, y) => {
  let total = 0;
  let z = x ^ y; // 保留x，y互异的位
  while (z) {
    if (z & 1) total += 1;
    z >>>= 1; // 这里之所以用 >>> 是考虑负数的问题
  }

  return total;
};

console.log(hammingDistance(1, 4));
console.log(hammingDistance1(1, 4));

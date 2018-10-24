// https://leetcode-cn.com/problems/sqrtx/description/

/**
 * @param {number} x
 * @return {number}
 */
// 思路: 二分查找法, 从 0 ~ x / 2
const mySqrt = x => {
  let left = 0;
  let right = Math.floor(x / 2);
  let middle;
  while (left < right) {
    middle = Math.ceil((left + right) / 2);
    const product = middle * middle;
    if (product === x) break;
    if (product > x) {
      if (middle === right) {
        middle = left;
        break;
      }
      right = middle;
    }
    if (product < x) left = middle;
  }

  return middle;
};

console.log(mySqrt(3));
console.log(mySqrt(4));
console.log(mySqrt(5));
console.log(mySqrt(25));
console.log(mySqrt(2123123122));
console.log(mySqrt(21231212312342342323122));
console.log(
  mySqrt(218278342938472937498237498237498237498237498231212312342342323122)
);

// https://leetcode-cn.com/problems/nth-magical-number/
// No 878. 第 N 个神奇数字

const getGCD = (x, y) => (y ? getGCD(y, x % y) : x);
const M = 10 ** 9 + 7;
/**
 * @param {number} N
 * @param {number} A
 * @param {number} B
 * @return {number}
 */
// 思路: 二分法，判断mi中有多少个可以整数A，B的数，注意去掉重叠的最小公倍数的整除数
const nthMagicalNumber = (N, A, B) => {
  if (B < A) return nthMagicalNumber(N, B, A);
  const num = (N * A) % M;
  if (B % A === 0) return num;

  if (num < B) return num;

  const MCM = (A * B) / getGCD(A, B); // A, B 最小公倍数
  let lo = 0;
  let hi = 10 ** 9 * 40000;
  while (lo < hi) {
    const mi = Math.floor((lo + hi) / 2);
    const count =
      Math.floor(mi / A) + Math.floor(mi / B) - Math.floor(mi / MCM);
    // console.log("lo: %d, hi: %d, mi: %d, count: %d", lo, hi, mi, count);
    if (count < N) {
      lo = mi + 1;
    } else {
      hi = mi;
    }
  }

  return lo % M;
};

console.log(nthMagicalNumber(10, 10, 8));
console.log(nthMagicalNumber(4, 2, 3));
console.log(nthMagicalNumber(3, 8, 3));
console.log(nthMagicalNumber(1, 2, 3));
console.log(nthMagicalNumber(5, 2, 4));
console.log(nthMagicalNumber(3, 6, 4));

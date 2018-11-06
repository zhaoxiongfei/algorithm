// https://leetcode-cn.com/problems/bitwise-and-of-numbers-range/description/
// No 201. 数字范围按位与

/**
  给定范围 [m, n]，其中 0 <= m <= n <= 2147483647
  返回此范围内所有数字的按位与（包含 m, n 两端点）。

  示例 1:

  输入: [5,7]
  输出: 4
  示例 2:

  输入: [0,1]
  输出: 0
*/

/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
const rangeBitwiseAnd1 = (m, n) => {
  if (m === 0) return 0;
  if (m === n) return m;
  let start = m;
  let end = n;
  const bits = [];
  for (let i = 31; i > 0; i -= 1) {
    const num = 2 ** i;
    const min = 2 ** (i - 1);
    const diff = end - start;
    if (min > end) {
      bits.push(0);
      continue;
    }
    const mod = end % num;
    if (mod < i || mod - diff < i || mod + (diff % num) < i || min > start) {
      bits.push(0);
    } else {
      if (start > min) start -= min;
      if (end > min) end -= min;
      if (start > end) {
        const t = start;
        start = end;
        end = t;
      }
      bits.push(1);
    }
  }
  return parseInt(bits.join(""), 2);
};

// 参考自 leetcode 网友
const rangeBitwiseAnd = (m, n) => {
  if (m === n) return m;
  return rangeBitwiseAnd(m >> 1, n >> 1) << 1;
};

console.log(rangeBitwiseAnd(3, 5));
console.log(rangeBitwiseAnd1(6, 7));
console.log(rangeBitwiseAnd(6, 7));
console.log(rangeBitwiseAnd(11, 12));
console.log(rangeBitwiseAnd(3, 4));
console.log(rangeBitwiseAnd(700000000, 2147483641));
console.log(rangeBitwiseAnd(5, 7));
console.log(rangeBitwiseAnd(2, 3));

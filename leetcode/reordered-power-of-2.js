// https://leetcode-cn.com/problems/reordered-power-of-2/
// No 869. 重新排序得到 2 的幂

/**
  从正整数 N 开始，我们按任何顺序（包括原始顺序）将数字重新排序，注意其前导数字不能为零。

  如果我们可以通过上述方式得到 2 的幂，返回 true；否则，返回 false。

  示例 1：

  输入：1
  输出：true
  示例 2：

  输入：10
  输出：false
  示例 3：

  输入：16
  输出：true
  示例 4：

  输入：24
  输出：false
  示例 5：

  输入：46
  输出：true

  提示：

  1 <= N <= 10^9
 */

const mayBe = (() => {
  const list = new Set();
  let num = 1;
  const maxValue = 10 ** 9;
  while (num <= maxValue) {
    const count = Array(10).fill(0);
    for (const n of num.toString()) count[+n] += 1;
    list.add(count.join("."));
    num *= 2;
  }

  return list;
})();

/**
 * @param {number} N
 * @return {boolean}
 */
const reorderedPowerOf2 = N => {
  const count = Array(10).fill(0);
  for (const n of N.toString()) count[+n] += 1;
  const str = count.join(".");
  return mayBe.has(str);
};

console.log(reorderedPowerOf2(1));
console.log(reorderedPowerOf2(10));
console.log(reorderedPowerOf2(16));
console.log(reorderedPowerOf2(24));
console.log(reorderedPowerOf2(46));

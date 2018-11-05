// https://leetcode-cn.com/problems/largest-number/description/
// No 179. 最大数

/**
  给定一组非负整数，重新排列它们的顺序使之组成一个最大的整数。

  示例 1:

  输入: [10,2]
  输出: 210
  示例 2:

  输入: [3,30,34,5,9]
  输出: 9534330
  说明: 输出结果可能非常大，所以你需要返回一个字符串而不是整数。
 */
const compare = (a, b) => {
  let i = 0;
  while (a[i] || b[i]) {
    if (a[i] === undefined) return compare(a, b.slice(i));
    if (b[i] === undefined) return compare(a.slice(i), b);
    if (a[i] > b[i]) return -1;
    if (a[i] < b[i]) return 1;
    i += 1;
  }
  return 0;
};
/**
 * @param {number[]} nums
 * @return {string}
 */
const largestNumber = nums =>
  nums
    .map(x => x.toString())
    .sort(compare)
    .join("")
    .replace(/^0+/g, "0");

// 深深的被网友的智慧折服
const largestNumber2 = nums =>
  nums
    .sort((a, b) => `${b}${a}` - `${a}${b}`)
    .join("")
    .replace(/^0+/g, "0");

console.log(largestNumber([0, 0]));
console.log(largestNumber([3, 30, 34, 5, 9]));
console.log(largestNumber2([3, 30, 34, 5, 9]));
console.log(largestNumber([10, 2]));

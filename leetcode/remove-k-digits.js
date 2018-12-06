// https://leetcode-cn.com/problems/remove-k-digits/description/
// No 402. 移掉K位数字

/**
  给定一个以字符串表示的非负整数 num，移除这个数中的 k 位数字，使得剩下的数字最小。

  注意:

  num 的长度小于 10002 且 ≥ k。
  num 不会包含任何前导零。
  示例 1 :

  输入: num = "1432219", k = 3
  输出: "1219"
  解释: 移除掉三个数字 4, 3, 和 2 形成一个新的最小的数字 1219。
  示例 2 :

  输入: num = "10200", k = 1
  输出: "200"
  解释: 移掉首位的 1 剩下的数字为 200. 注意输出不能有任何前导零。
  示例 3 :

  输入: num = "10", k = 2
  输出: "0"
  解释: 从原数字移除所有的数字，剩余为空就是0。
 */

/**
 * @param {string} num
 * @param {number} k
 * @return {string}
 */
// 贪心算法：保证每一次删除的数字都是最优解
// 寻找删除一个的最小值, 以此类推
// 此方法无法通过测试，会超时, 初步估算时间复杂度 O(K * N²);
const removeKdigits1 = (num, k) => {
  if (k === 0) return num;
  const { length } = num;
  if (k === length) return "0";

  let min = "";
  while ((k -= 1) >= 0) {
    min = num.slice(1);
    let m = 0;
    while (min[m] === "0") m += 1;
    if (0 < m) {
      // 有前倒零的一定是最小的，最优解
      num = min.slice(m);
      continue;
    }
    for (let i = 1; i < num.length; i += 1) {
      for (let j = 0; j < num.length; j += 1) {
        const n = num[j < i ? j : j + 1];
        if (n < min[j]) {
          min = num.slice(0, i) + num.slice(i + 1);
          break;
        } else if (min[j] < n) {
          break;
        }
      }
    }
    num = min;
  }
  return num || "0";
};
// 优化判断方式，去掉一个数字最优方案为从左到右第一个下降的数字的前一个
const removeKdigits = (num, k) => {
  if (k === 0) return num;
  const { length } = num;
  if (k === length) return "0";

  let min = num;
  while ((k -= 1) >= 0) {
    for (let i = 0; i < min.length; i += 1) {
      if (i === min.length - 1 || min[i + 1] < min[i]) {
        min = min.slice(0, i) + min.slice(i + 1);
        break;
      }
    }
    let m = 0;
    while (min[m] === "0") m += 1;
    if (0 < m) min = min.slice(m);
  }
  return min || "0";
};

console.log(removeKdigits1("112", 1));
console.log(removeKdigits1("10", 1));
console.log(removeKdigits1("10", 2));
console.log(removeKdigits1("10200", 1));
console.log(removeKdigits("1432219", 3));

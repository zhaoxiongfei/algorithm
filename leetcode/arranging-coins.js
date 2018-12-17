// https://leetcode-cn.com/problems/arranging-coins/
// 441. 排列硬币

/**
  你总共有 n 枚硬币，你需要将它们摆成一个阶梯形状，第 k 行就必须正好有 k 枚硬币。

  给定一个数字 n，找出可形成完整阶梯行的总行数。

  n 是一个非负整数，并且在32位有符号整型的范围内。

  示例 1:

  n = 5

  硬币可排列成以下几行:
  ¤
  ¤ ¤
  ¤ ¤

  因为第三行不完整，所以返回2.
  示例 2:

  n = 8

  硬币可排列成以下几行:
  ¤
  ¤ ¤
  ¤ ¤ ¤
  ¤ ¤

  因为第四行不完整，所以返回3.
 */

/**
 * @param {number} n
 * @return {number}
 */
// 思路一: 纯数学方案, 解等差数列求和方程
const arrangeCoins = n => (Math.sqrt(8 * n + 1) - 1) >> 1;

// 思路二: 工程方案
const arrangeCoins1 = n => {
  let count = 0;
  while (n >= count + 1) {
    count += 1;
    n -= count;
  }
  return count;
};

console.log(arrangeCoins(5));
console.log(arrangeCoins1(5));
console.log(arrangeCoins(6));
console.log(arrangeCoins1(6));
console.log(arrangeCoins(8));
console.log(arrangeCoins1(8));
console.log(arrangeCoins(10));
console.log(arrangeCoins1(10));

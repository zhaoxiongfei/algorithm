// https://leetcode-cn.com/problems/ugly-number-ii/description/
// No 264. 丑数 II

/**
  编写一个程序，找出第 n 个丑数。

  丑数就是只包含质因数 2, 3, 5 的正整数。

  示例:

  输入: n = 10
  输出: 12
  解释: 1, 2, 3, 4, 5, 6, 8, 9, 10, 12 是前 10 个丑数。
  说明:

  1 是丑数。
  n 不超过1690。
 */

/**
 * @param {number} n
 * @return {number}
 */
// 思路：2， 3， 5通过你追我赶的方式倍增
// [1, 2, 3, 4, 5, 6, 8, 9, 10, 12] 前十个
// 2， 3， 5 的数量增加减少的策略，带上优先级即可

// 减少 2 个 3, 增加 1 个 2, 1 个 5,  扩大 10/9 (1.111)
// 减少 3 个 2, 增加 2 个 3,  扩大 9/8 (1.125)
// 减少 1 个 5, 增加 1 个 2， 1 个 3， 扩大 6/5 (1.200)
// 减少 2 个 2, 增加 1 个 5,  扩大 5/4 (1.250)
// 减少 1 个 3, 增加  2 个 2, 扩大 4/3 (1.333)
// 减少 1 个 2, 增加 1 个 3， 扩大 3/2 (1.500)
// 增加一个 2， 扩大了 2 倍
// 以上思路有问题，2，3，5的组合有无穷多种，无法枚举
const nthUglyNumber = (() => {
  const list = [1]; // 动规记录
  let t2 = 0;
  let t3 = 0;
  let t5 = 0;
  for (let i = 1; i <= 1690; i += 1) {
    list[i] = Math.min(list[t2] * 2, list[t3] * 3, list[t5] * 5);
    if (list[i] === list[t2] * 2) t2 += 1;
    if (list[i] === list[t3] * 3) t3 += 1;
    if (list[i] === list[t5] * 5) t5 += 1;
  }

  return n => list[n - 1];
})();

console.log(nthUglyNumber(1690));

// https://leetcode-cn.com/problems/minimum-moves-to-equal-array-elements/submissions/
// No 453. 最小移动次数使数组元素相等

/**
  给定一个长度为 n 的非空整数数组，找到让数组所有元素相等的最小移动次数。每次移动可以使 n - 1 个元素增加 1。

  示例:

  输入:
  [1,2,3]

  输出:
  3

  解释:
  只需要3次移动（注意每次移动会增加两个元素的值）：

  [1,2,3]  =>  [2,3,3]  =>  [3,4,3]  =>  [4,4,4]
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
const minMoves = nums => {
  const { length } = nums;
  if (length < 2) return 0;

  const dt = length - 1;
  const max = Math.max(...nums);
  const min = Math.min(...nums);
  let diff = (max - min) * dt;
  for (const n of nums) {
    diff -= max - n;
  }

  return max - min + diff;
};

console.log(minMoves([1, 2, 3]));
console.log(minMoves([1, 2, 1]));
console.log(minMoves([1, 1, 1]));
console.log(minMoves([-100, 0, 100]));

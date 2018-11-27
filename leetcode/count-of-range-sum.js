// https://leetcode-cn.com/problems/count-of-range-sum/description/
// No 327. 区间和的个数

/**
  给定一个整数数组 nums，返回区间和在 [lower, upper] 之间的个数，包含 lower 和 upper。
  区间和 S(i, j) 表示在 nums 中，位置从 i 到 j 的元素之和，包含 i 和 j (i ≤ j)。

  说明:
  最直观的算法复杂度是 O(n2) ，请在此基础上优化你的算法。

  示例:

  输入: nums = [-2,5,-1], lower = -2, upper = 2,
  输出: 3
  解释: 3个区间分别是: [0,0], [2,2], [0,2]，它们表示的和分别为: -2, -1, 2。
 */

/**
 * @param {number[]} nums
 * @param {number} lower
 * @param {number} upper
 * @return {number}
 */
// 思路: 暴力算法 O(N²)
const countRangeSum = (nums, lower, upper) => {
  const { length } = nums;
  if (length === 0) return 0;

  let count = 0;
  for (let i = 0; i < length; i += 1) {
    let sum = 0;
    for (let j = i; j < length; j += 1) {
      sum += nums[j];
      if (lower <= sum && sum <= upper) count += 1;
    }
  }

  return count;
};

console.log(countRangeSum([-2, 5, -1], -2, 2));

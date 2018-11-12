// https://leetcode-cn.com/problems/minimum-size-subarray-sum/description/
// No 209. 长度最小的子数组
/**
  给定一个含有 n 个正整数的数组和一个正整数 s ，找出该数组中满足其和 ≥ s 的长度最小的连续子数组。如果不存在符合条件的连续子数组，返回 0。

  示例:

  输入: s = 7, nums = [2,3,1,2,4,3]
  输出: 2
  解释: 子数组 [4,3] 是该条件下的长度最小的连续子数组。
  进阶:

  如果你已经完成了O(n) 时间复杂度的解法, 请尝试 O(n log n) 时间复杂度的解法。
*/

/**
 * @param {number} s
 * @param {number[]} nums
 * @return {number}
 */
// 思路: 双指针试试看
const minSubArrayLen = (s, nums) => {
  const { length } = nums;
  let left = 0;
  let right = 0;
  let total = nums[0];
  let min = Infinity;
  while (right < length) {
    if (total >= s) {
      if (right - left + 1 < min) {
        min = right - left + 1;
      }
      total -= nums[left];
      left += 1;
    } else {
      right += 1;
      total += nums[right];
    }
  }

  return min === Infinity ? 0 : min;
};

console.log(minSubArrayLen(7, [2, 3, 1, 2, 4, 3]));

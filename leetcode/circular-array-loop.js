// https://leetcode-cn.com/problems/circular-array-loop/
// No 457. 环形数组循环

/**
  给定一组含有正整数和负整数的数组。如果某个索引中的 n 是正数的，
  则向前移动 n 个索引。相反，如果是负数(-n)，则向后移动 n 个索引。

  假设数组首尾相接。判断数组中是否有环。环中至少包含 2 个元素。环中的元素一律“向前”或者一律“向后”。

  示例 1：给定数组 [2, -1, 1, 2, 2], 有一个循环，从索引 0 -> 2 -> 3 -> 0。

  示例 2：给定数组[-1, 2], 没有循环。

  注意：给定数组保证不包含元素"0"。

  你能写出时间复杂度为 O(n) 且空间复杂度为 O(1) 的算法吗？
 */

/**
 * @param {number[]} nums
 * @return {boolean}
 */
// 思路: 先做一个简单的算法，用一个等长的数组记录对应位置向前或者向后
const circularArrayLoop = nums => {
  const { length } = nums;
  if (length === 0) return false;
  const dp = Array(length).fill(0);
  for (let i = 0; i < length; i += 1) {
    if (nums[i] > 0) {
      if (i + nums[i] >= length) {
        if (dp[(i + nums[i]) % length] & 1) return true;
      }
      dp[(i + nums[i]) % length] |= 1;
      dp[i] |= 1;
    } else {
      if (i + nums[i] < 0) {
        if (dp[length - ((i + nums[i]) % length)] & 2) return true;
      }
      dp[length - ((i + nums[i]) % length)] |= 1;
      dp[i] |= 1;
    }
  }

  return false;
};

console.log(circularArrayLoop([2, -1, 1, 2, 2]));
console.log(circularArrayLoop([-1, 2]));

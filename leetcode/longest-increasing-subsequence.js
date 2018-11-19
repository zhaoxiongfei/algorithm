// https://leetcode-cn.com/problems/longest-increasing-subsequence/description/
// No 300. 最长上升子序列

/**
  给定一个无序的整数数组，找到其中最长上升子序列的长度。

  示例:

  输入: [10,9,2,5,3,7,101,18]
  输出: 4
  解释: 最长的上升子序列是 [2,3,7,101]，它的长度是 4。
  说明:

  可能会有多种最长上升子序列的组合，你只需要输出对应的长度即可。
  你算法的时间复杂度应该为 O(n2) 。
  进阶: 你能将算法的时间复杂度降低到 O(n log n) 吗?
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
// 思路: 动态规划 令 dp[i] 为 截止到 i 的最大上升子序列, 默认为 1
// 递推公式: dp[i] = Math.max(dp[0...i] + 1);
const lengthOfLIS1 = nums => {
  const { length } = nums;
  if (length === 0) return 0;
  const dp = Array(length).fill(1);
  let max = 1;
  for (let i = 0; i < length; i += 1) {
    for (let j = 0; j < i; j += 1) {
      if (nums[j] < nums[i] && dp[j] + 1 > dp[i]) dp[i] = dp[j] + 1;
    }
    if (dp[i] > max) max = dp[i];
  }
  return max;
};

// O(NlogN)
const lengthOfLIS = nums => {
  const { length } = nums;
  if (length === 0) return 0;
  const dp = [nums[0]];
  for (let i = 1; i < length; i += 1) {
    let min = 0;
    let max = dp.length;
    while (min < max) {
      const md = Math.floor((min + max) / 2);
      if (dp[md] < nums[i]) min = md + 1;
      else max = md;
    }
    dp[max] = nums[i];
  }

  return dp.length;
};

console.log(lengthOfLIS([1, 3, 6, 7, 9, 4, 10, 5, 6]));
console.log(lengthOfLIS1([10, 9, 2, 11, 15, 16, 5, 3, 4, 6, 7, 101, 18]));

// https://leetcode-cn.com/problems/target-sum/
// No 494. 目标和

/**
  给定一个非负整数数组，a1, a2, ..., an, 和一个目标数，S。
  现在你有两个符号 + 和 -。
  对于数组中的任意一个整数，你都可以从 + 或 -中选择一个符号添加在前面。

  返回可以使最终数组和为目标数 S 的所有添加符号的方法数。

  示例 1:

  输入: nums: [1, 1, 1, 1, 1], S: 3
  输出: 5
  解释:

  -1+1+1+1+1 = 3
  +1-1+1+1+1 = 3
  +1+1-1+1+1 = 3
  +1+1+1-1+1 = 3
  +1+1+1+1-1 = 3

  一共有5种方法让最终目标和为3。
  注意:

  数组的长度不会超过20，并且数组中的值全为正数。
  初始的数组的和不会超过1000。
  保证返回的最终结果为32位整数。
 */

/**
 * @param {number[]} nums
 * @param {number} S
 * @return {number}
 */
// 思路一: 普通做法，dfs 深度递归
const findTargetSumWays = (nums, S) => {
  const { length } = nums;

  const dfs = (i, target) => {
    if (i === length - 1) {
      if (nums[i] === 0 && target === 0) return 2;
      return Math.abs(target) === Math.abs(nums[i]) ? 1 : 0;
    }
    return dfs(i + 1, target - nums[i]) + dfs(i + 1, target + nums[i]);
  };

  return dfs(0, S);
};

// 思路二: 动规, 此问题类似于背包问题, 每一个数字都有两种选择，会产生两种结果
const findTargetSumWays2 = (nums, S) => {
  const sum = nums.reduce((m, x) => m + x, 0);
  if (sum < S || (sum + S) % 2 === 1) return 0;

  S = (S + sum) / 2;

  console.log("S = %d", S);
  const dp = Array(S + 1).fill(0);
  dp[0] = 1;
  for (let i = 0; i < nums.length; i += 1) {
    for (let j = S; j >= nums[i]; j -= 1) {
      dp[j] += dp[j - nums[i]];
    }
  }
  return dp[S];
};

console.log(findTargetSumWays([7, 9, 3, 8, 0, 2, 4, 8, 3, 9], 0));
// console.log(findTargetSumWays2([7, 9, 3, 8, 0, 2, 4, 8, 3, 9], 0));
console.log(findTargetSumWays([1, 2, 1], 0));
console.log(findTargetSumWays([1, 1, 1, 1, 1], 3));
console.log(findTargetSumWays2([1, 1, 1, 1, 1], 3));
console.log(
  findTargetSumWays2(
    // [28, 29, 35, 48, 9, 9, 3, 22, 43, 0, 33, 3, 3, 11, 44, 39, 35, 0, 25, 8],
    // 25
    [
      2,
      107,
      109,
      113,
      127,
      131,
      137,
      3,
      2,
      3,
      5,
      7,
      11,
      13,
      17,
      19,
      23,
      29,
      47,
      53
    ],
    2147483647
  )
);

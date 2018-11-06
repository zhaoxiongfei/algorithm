// https://leetcode-cn.com/problems/house-robber/description/
// No 198. 打家劫舍

/**
  你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。

  给定一个代表每个房屋存放金额的非负整数数组，计算你在不触动警报装置的情况下，能够偷窃到的最高金额。

  示例 1:

  输入: [1,2,3,1]
  输出: 4
  解释: 偷窃 1 号房屋 (金额 = 1) ，然后偷窃 3 号房屋 (金额 = 3)。
       偷窃到的最高金额 = 1 + 3 = 4 。
  示例 2:

  输入: [2,7,9,3,1]
  输出: 12
  解释: 偷窃 1 号房屋 (金额 = 2), 偷窃 3 号房屋 (金额 = 9)，接着偷窃 5 号房屋 (金额 = 1)。
       偷窃到的最高金额 = 2 + 9 + 1 = 12 。
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
// 思路: 动态规划 dp[i] 代表
const rob = nums => {
  const { length } = nums;
  if (length === 0) return 0;
  if (length < 3) return Math.max(...nums);
  const dp = [0, 0, nums[0]];
  for (let i = 3; i < length + 2; i += 1) {
    dp[i] = Math.max(dp[i - 2], dp[i - 3]) + nums[i - 2];
  }

  return Math.max(dp[length + 1], dp[length]);
};

console.log(rob([1, 2, 3, 1]));
// https://leetcode-cn.com/problems/burst-balloons/description/
// 312. 戳气球

/**
  有 n 个气球，编号为0 到 n-1，每个气球上都标有一个数字，这些数字存在数组 nums 中。

  现在要求你戳破所有的气球。
  每当你戳破一个气球 i 时，你可以获得 nums[left] * nums[i] * nums[right] 个硬币。
  这里的 left 和 right 代表和 i 相邻的两个气球的序号。
  注意当你戳破了气球 i 后，气球 left 和气球 right 就变成了相邻的气球。

  求所能获得硬币的最大数量。

  说明:

  你可以假设 nums[-1] = nums[n] = 1，但注意它们不是真实存在的所以并不能被戳破。
  0 ≤ n ≤ 500, 0 ≤ nums[i] ≤ 100
  示例:

  输入: [3,1,5,8]
  输出: 167
  解释: nums = [3,1,5,8] --> [3,5,8] -->   [3,8]   -->  [8]  --> []
       coins =  3*1*5      +  3*5*8    +  1*3*8      + 1*8*1   = 167
*/

const count = {};
// start, end 左开右闭
// 正确性没问题，但是性能不行, 只用了分治的思想，而没有用到动态规划
const helper = (nums, start, end, left, right) => {
  if (end - start < 1) return 0;
  let max = -Infinity;
  for (let i = start; i < end; i += 1) {
    const p1 = helper(nums, start, i, left, nums[i]);
    const p2 = helper(nums, i + 1, end, nums[i], right);
    const curr = p1 + p2 + left * nums[i] * right;
    if (curr > max) max = curr;
  }
  const key = [start, end, left, right].join(" # ");
  if (!count[key]) count[key] = 0;
  count[key] += 1;

  return max;
};

/**
 * @param {number[]} nums
 * @return {number}
 */
// 思路: 分而治之 + 动态规划 令 dp[low][high] 代表 low -> high 个气球所得金币
// 递推公式: dp[low][high] = Max(dp[low][i] + dp[i][high] + nums[low] * nums[i] * nums[high]);
const maxCoins = nums => {
  const { length } = nums;
  if (length === 0) return 0;
  if (length === 1) return nums[0];

  nums.unshift(1);
  nums.push(1);

  const dp = [];
  for (let i = 0; i < length + 2; i += 1) dp[i] = Array(length + 2).fill(0);

  for (let low = length; low >= 0; low -= 1) {
    for (let high = low + 2; high < length + 2; high += 1) {
      if (high === low + 2) {
        dp[low][high] = nums[low] * nums[low + 1] * nums[high];
      } else {
        dp[low][high] = -Infinity;
        for (let i = low + 1; i < high; i += 1) {
          const value =
            dp[low][i] + dp[i][high] + nums[low] * nums[i] * nums[high];
          if (value > dp[low][high]) dp[low][high] = value;
        }
      }
    }
  }

  console.log(dp);
  return dp[0][length + 1];
};

// console.log(maxCoins([3, 1]));
console.log(maxCoins([3, 1, 5, 8]));

// console.log(maxCoins([8, 2, 6, 8, 9, 8, 1, 4, 1, 5, 3, 0, 7, 7, 0, 4, 2, 2, 5]));
// console.log(maxCoins([3, 1]));

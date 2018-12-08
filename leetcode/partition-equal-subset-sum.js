// https://leetcode-cn.com/problems/partition-equal-subset-sum/description/
// No 416. 分割等和子集

/**
  给定一个只包含正整数的非空数组。
  是否可以将这个数组分割成两个子集，使得两个子集的元素和相等。

  注意:

  每个数组中的元素不会超过 100
  数组的大小不会超过 200
  示例 1:

  输入: [1, 5, 11, 5]

  输出: true

  解释: 数组可以分割成 [1, 5, 5] 和 [11].


  示例 2:

  输入: [1, 2, 3, 5]

  输出: false

  解释: 数组不能分割成两个元素和相等的子集.
 */

/**
 * @param {number[]} nums
 * @return {boolean}
 */
const canPartition = nums => {
  const total = nums.reduce((m, x) => m + x, 0);
  if (total % 2) return false;
  const half = total / 2;

  const dp = Array(half + 1).fill(0);
  dp[0] = 1;
  for (let i = 0; i < nums.length; i += 1) {
    for (let j = half; j >= nums[i]; j -= 1) {
      dp[j] = dp[j] || dp[j - nums[i]];
    }
  }

  return dp[half] === 1;
};

console.log(
  canPartition([
    71,
    70,
    66,
    54,
    32,
    63,
    38,
    98,
    4,
    22,
    61,
    40,
    6,
    8,
    6,
    21,
    71,
    36,
    30,
    34,
    44,
    60,
    89,
    53,
    60,
    56,
    73,
    14,
    63,
    37,
    15,
    58,
    51,
    88,
    88,
    32,
    80,
    32,
    10,
    89,
    67,
    29,
    68,
    65,
    34,
    15,
    88,
    8,
    57,
    78,
    37,
    63,
    73,
    65,
    47,
    39,
    32,
    74,
    31,
    44,
    43,
    4,
    10,
    8,
    96,
    22,
    58,
    87,
    29,
    99,
    79,
    13,
    96,
    21,
    62,
    71,
    34,
    55,
    72,
    3,
    96,
    7,
    36,
    64,
    30,
    6,
    14,
    87,
    12,
    90,
    40,
    13,
    29,
    21,
    94,
    33,
    99,
    86,
    4,
    100
  ])
);
// console.log(canPartition([1, 5, 11, 5]));
// console.log(canPartition([1, 5, 11, 5, 12, 13, 14, 7]));

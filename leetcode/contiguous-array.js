// https://leetcode-cn.com/problems/contiguous-array/
// No 525. 连续数组

/**
  给定一个二进制数组, 找到含有相同数量的 0 和 1 的最长连续子数组。

  示例 1:

  输入: [0,1]
  输出: 2
  说明: [0, 1] 是具有相同数量0和1的最长连续子数组。
  示例 2:

  输入: [0,1,0]
  输出: 2
  说明: [0, 1] (或 [1, 0]) 是具有相同数量0和1的最长连续子数组。
  注意: 给定的二进制数组的长度不会超过50000。
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
// 思路: 暴力算法，纯粹按照定义来做题
const findMaxLength2 = nums => {
  const { length } = nums;
  const dp = Array(length + 1);
  dp[0] = [0, 0];
  for (let i = 0; i < length; i += 1) {
    dp[i + 1] = dp[i].slice();
    dp[i + 1][nums[i]] += 1;
  }
  let maxLen = 0;
  for (let i = 0; i <= length; i += 1) {
    for (let j = length; j >= i + maxLen; j -= 1) {
      if (dp[j][1] - dp[i][1] === dp[j][0] - dp[i][0]) {
        maxLen = j - i;
      }
    }
  }
  return maxLen;
};

const findMaxLength = nums => {
  const { length } = nums;
  const dp = new Map();
  dp.set(0, -1); // 记录总和和索引的对应关系
  let sum = 0;
  let maxLen = 0;
  for (let i = 0; i < length; i += 1) {
    sum += nums[i] === 1 ? 1 : -1;
    const index = dp.get(sum);
    if (index === undefined) {
      dp.set(sum, i);
    } else if (maxLen < i - index) {
      maxLen = i - index;
    }
  }

  return maxLen;
};

console.log(findMaxLength2([0, 1, 0]));
console.log(findMaxLength([0, 1, 0]));

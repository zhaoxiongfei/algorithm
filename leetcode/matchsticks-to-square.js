// https://leetcode-cn.com/problems/matchsticks-to-square/
// No 473. 火柴拼正方形

/**
  还记得童话《卖火柴的小女孩》吗？现在，你知道小女孩有多少根火柴，
  请找出一种能使用所有火柴拼成一个正方形的方法。不能折断火柴，可以把火柴连接起来，并且每根火柴都要用到。

  输入为小女孩拥有火柴的数目，每根火柴用其长度表示。输出即为是否能用所有的火柴拼成正方形。

  示例 1:

  输入: [1,1,2,2,2]
  输出: true

  解释: 能拼成一个边长为2的正方形，每边两根火柴。
  示例 2:

  输入: [3,3,3,3,4]
  输出: false

  解释: 不能用所有火柴拼成一个正方形。
  注意:

  给定的火柴长度和在 0 到 10^9之间。
  火柴数组的长度不超过15。
 */

// 找到所有和为 target 的组合
const dfs = (nums, target, pre = new Set(), total = 0, start = 0) => {
  if (total === target) {
    const remain = nums.filter((x, i) => !pre.has(i));
    if (remain.length === 0) return true; // 全部用完
    return dfs(remain, target);
  }
  // 完毕
  if (start === nums.length) return false;
  // 取
  if (dfs(nums, target, pre.add(start), total + nums[start], start + 1))
    return true;
  pre.delete(start); // 回溯
  // 舍
  return dfs(nums, target, pre, total, start + 1);
};

/**
 * @param {number[]} nums
 * @return {boolean}
 */
// 思路: 因为要用到所有火柴，所以可以确定如果可能的话最终的正放心边长为所有长度之和的 1/4, 长度之和是 4 的整数倍
// 已知了边长，接下来就是搜索是否有三组满足这个边长的组合(三组满足了，剩下的自然满足)
const makesquare = nums => {
  const total = nums.reduce((mem, x) => mem + x, 0);
  if (!total || total % 4) return false;

  const len = total >> 2; // 正方形边长
  if (nums.some(x => x < len)) return false;

  // 逐个尝试各种组合，直到找到合理的解
  return dfs(nums, len);
};

console.log(makesquare([1, 1, 2, 2, 2]));
console.log(makesquare([3, 3, 3, 3, 4]));

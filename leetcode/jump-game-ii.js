/**
 * @param {number[]} nums
 * @return {number}
 */
// 思路：采用递归降低问题的复杂度
const jump = (nums, start = 0, times = 0) => {
  const steps = nums[start];
  // 当前所在位置距离小于等于当前步数，则至少需要一步到达目的
  if (start + steps >= nums.length - 1) return times + 1;
  const mayBeTimes = [];
  for (let i = 1; i <= steps; i += 1) {
    if (nums[start + i] !== 0)
      mayBeTimes.push(jump(nums, start + i, times + 1));
  }
  return Math.min(...mayBeTimes);
};

console.log(jump([2, 3, 1, 1, 4]));
console.log(jump([2, 3, 0, 1, 4]));

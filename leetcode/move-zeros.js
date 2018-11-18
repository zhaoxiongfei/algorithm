// https://leetcode-cn.com/problems/move-zeroes/description/
// No 283. 移动零

/**
  给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。

  示例:

  输入: [0,1,0,3,12]
  输出: [1,3,12,0,0]
  说明:

  必须在原数组上操作，不能拷贝额外的数组。
  尽量减少操作次数。
 */

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
// 思路: 扫描，找到 0 的个数和开始的位置, 之后从开始位置开始，右面的数字忽略0的前提下前移 n 位 (n 为 0的个数)
const moveZeroes = nums => {
  const { length } = nums;
  if (length === 0) return;

  let count = 0;
  for (let i = 0; i < length; i += 1) {
    if (count) nums[i - count] = nums[i];
    if (nums[i] === 0) count += 1;
  }
  while (0 <= (count -= 1)) nums[length - count - 1] = 0;

  console.log(nums);
};

// const nums = [0, 1, 0, 0, 2, 0, 1, 0, 0];
const nums = [0, 1, 0, 3, 12];
// const nums = [0, 1, 0];
// const nums = [2, 1];
console.log(moveZeroes(nums));

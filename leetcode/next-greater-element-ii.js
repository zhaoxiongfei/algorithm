// https://leetcode-cn.com/problems/next-greater-element-ii/
// No 503. 下一个更大元素 II

/**
  给定一个循环数组（最后一个元素的下一个元素是数组的第一个元素），
  输出每个元素的下一个更大元素。
  数字 x 的下一个更大的元素是按数组遍历顺序，
  这个数字之后的第一个比它更大的数，
  这意味着你应该循环地搜索它的下一个更大的数。如果不存在，则输出 -1。

  示例 1:

  输入: [1,2,1]
  输出: [2,-1,2]
  解释: 第一个 1 的下一个更大的数是 2；
  数字 2 找不到下一个更大的数；
  第二个 1 的下一个最大的数需要循环搜索，结果也是 2。
  注意: 输入数组的长度不会超过 10000。
 */

/**
 * @param {number[]} nums
 * @return {number[]}
 */
// 思路: 暴力做法, 重复两次数组，挨个查找下一个最大值
const nextGreaterElements2 = nums => {
  const { length } = nums;
  if (length === 0) return nums;

  const list = Array(length).fill(-1);
  for (let i = 0; i < length; i += 1) {
    for (let j = i + 1; j < length + i; j += 1) {
      if (nums[i] < nums[j % length]) {
        list[i] = nums[j % length];
        break;
      }
    }
  }

  return list;
};

// 思路二: 利用单调栈解题
const nextGreaterElements = nums => {
  const { length } = nums;
  if (length === 0) return nums;

  const stack = [0]; // 这里的 0 代表的是数组下标
  const list = Array(length).fill(-1);
  let i = 1;
  while (i < 2 * length - 1 && stack.length) {
    if (nums[i % length] <= nums[stack[stack.length - 1]]) {
      stack.push(i % length);
      i += 1;
    } else {
      console.log("stack: %s", stack);
      list[stack.pop()] = nums[i % length];
      if (!stack.length) stack.push(i++ % length);
    }
  }

  return list;
};

console.log(nextGreaterElements([1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 100]));
console.log(nextGreaterElements2([1, 2, 1]));
console.log(nextGreaterElements([1, 2, 1]));
console.log(nextGreaterElements([3, 2, 1]));

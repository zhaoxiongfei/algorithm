// https://leetcode-cn.com/problems/132-pattern/
// No 456. 132模式

/**
  给定一个整数序列：a1, a2, ..., an，
  一个132模式的子序列 ai, aj, ak 被定义为：当 i < j < k 时，ai < ak < aj。
  设计一个算法，当给定有 n 个数字的序列时，验证这个序列中是否含有132模式的子序列。

  注意：n 的值小于15000。

  示例1:

  输入: [1, 2, 3, 4]

  输出: False

  解释: 序列中不存在132模式的子序列。
  示例 2:

  输入: [3, 1, 4, 2]

  输出: True

  解释: 序列中有 1 个132模式的子序列： [1, 4, 2].
  示例 3:

  输入: [-1, 3, 2, 0]

  输出: True

  解释: 序列中有 3 个132模式的的子序列: [-1, 3, 2], [-1, 3, 0] 和 [-1, 2, 0].
 */

/**
 * @param {number[]} nums
 * @return {boolean}
 */
// 这道题中，更加巧妙的做法如下(真是巧妙)，从后往前传递，先找到第二大的数( s2 > s3 > s1, 利用单调栈找s3)，然后判断前面是否有s1.
const find132pattern = nums => {
  const { length } = nums;
  if (length < 3) return false;

  const stack = [];
  let s3 = -Infinity;
  for (let i = length - 1; i >= 0; i -= 1) {
    if (nums[i] < s3) return true;
    while (stack.length && stack[stack.length - 1] < nums[i]) {
      s3 = Math.max(s3, stack[stack.length - 1]);
      stack.pop();
    }
    stack.push(nums[i]);
  }

  return false;
};

// console.log(find132pattern([3, 5, 0, 3, 4]));
console.log(find132pattern([-2, 1, 2, -2, 1, 2]));
// console.log(find132pattern([-2, 1, -2]));
// console.log(find132pattern([-2, 1]));
// console.log(find132pattern([-1, 3, 2, 0]));
// console.log(find132pattern([1, 2, 3, 4]));
// console.log(find132pattern([3, 1, 4, 2]));

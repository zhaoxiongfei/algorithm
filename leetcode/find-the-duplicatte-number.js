// https://leetcode-cn.com/problems/find-the-duplicate-number/description/
// No 287. 寻找重复数

/**
  给定一个包含 n + 1 个整数的数组 nums，其数字都在 1 到 n 之间（包括 1 和 n），
  可知至少存在一个重复的整数。假设只有一个重复的整数，找出这个重复的数。

  示例 1:

  输入: [1,3,4,2,2]
  输出: 2
  示例 2:

  输入: [3,1,3,4,2]
  输出: 3
  说明：

  不能更改原数组（假设数组是只读的）。
  只能使用额外的 O(1) 的空间。
  时间复杂度小于 O(n2) 。
  数组中只有一个重复的数字，但它可能不止重复出现一次。
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
const findDuplicate1 = nums => {
  const { length } = nums;
  for (let i = 0; i < length; i += 1) {
    const n1 = nums[i];
    for (let j = 0; j < length; j += 1) {
      if (i === j) continue;
      if (n1 === nums[j]) return n1;
    }
  }
  return null;
};

const findDuplicate = nums => {
  const { length } = nums;
  if (length <= 1) return -1;
  let slow = nums[0];
  let fast = nums[nums[0]];
  while (slow !== fast) {
    slow = nums[slow];
    fast = nums[nums[fast]];
  }

  fast = 0;
  while (fast !== slow) {
    fast = nums[fast];
    slow = nums[slow];
  }

  return slow;
};

console.log(findDuplicate([1, 3, 4, 2, 2]));
console.log(findDuplicate([2, 2, 2, 2, 2]));
console.log(findDuplicate([3, 1, 3, 4, 2]));
console.log(findDuplicate1([3, 1, 3, 4, 2]));
console.log(findDuplicate([3, 1, 3, 4, 2, 3]));

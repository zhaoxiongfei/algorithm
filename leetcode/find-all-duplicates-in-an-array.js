// https://leetcode-cn.com/problems/find-all-duplicates-in-an-array/
// No 442. 数组中重复的数据

/**
  给定一个整数数组 a，其中1 ≤ a[i] ≤ n （n为数组长度）, 其中有些元素出现两次而其他元素出现一次。

  找到所有出现两次的元素。

  你可以不用到任何额外空间并在O(n)时间复杂度内解决这个问题吗？

  示例：

  输入:
  [4,3,2,7,8,2,3,1]

  输出:
  [2,3]
 */

/**
 * @param {number[]} nums
 * @return {number[]}
 */
// 思路: 把数字放在它该出现的位置
const findDuplicates = nums => {
  const dup = new Set();
  let i = 0;
  while (i < nums.length) {
    if (nums[i] !== i + 1) {
      if (nums[i] === nums[nums[i] - 1]) {
        dup.add(nums[i]);
        i += 1;
      } else {
        const t = nums[nums[i] - 1];
        nums[nums[i] - 1] = nums[i];
        nums[i] = t;
      }
    } else {
      i += 1;
    }
  }

  console.log(nums);
  return Array.from(dup);
};

// 思路二: 巧妙的避开了元素交换，把处理过的位置翻转为负数，这样再次遇到该位置则说明重复了。
// 妙哉
const findDuplicates1 = nums => {
  const dup = [];
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    const index = Math.abs(num) - 1;
    if (nums[index] < 0) {
      dup.push(index + 1);
    } else {
      nums[index] *= -1;
    }
  }

  return dup;
};

console.log(findDuplicates1([5, 4, 6, 7, 9, 3, 10, 9, 5, 6]));
console.log(findDuplicates([5, 4, 6, 7, 9, 3, 10, 9, 5, 6]));
console.log(findDuplicates([4, 3, 2, 7, 8, 2, 3, 1]));

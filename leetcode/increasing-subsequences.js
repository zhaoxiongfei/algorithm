// https://leetcode-cn.com/problems/increasing-subsequences/
// No 491. 递增子序列

/**
  给定一个整型数组, 你的任务是找到所有该数组的递增子序列，递增子序列的长度至少是2。

  示例:

  输入: [4, 6, 7, 7]
  输出: [[4, 6], [4, 7], [4, 6, 7], [4, 6, 7, 7], [6, 7], [6, 7, 7], [7,7], [4,7,7]]
  说明:

  给定数组的长度不会超过15。
  数组中的整数范围是 [-100,100]。
  给定数组中可能包含重复数字，相等的数字应该被视为递增的一种情况。
 */

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const findSubsequences = nums => {
  const list = new Map();
  for (let j = 0; j < nums.length; j += 1) {
    const num = nums[j];
    const expand = [];
    for (const [key, ns] of list) {
      if (
        ns[ns.length - 1] <= num &&
        (num !== nums[j - 1] || ns[ns.length - 1] === num)
      ) {
        expand.push([`${key}_${num}`, ns.concat(num)]);
      }
    }
    expand.push([`${num}`, [num]]);
    for (const [key, ns] of expand) list.set(key, ns);
  }

  return Array.from(list)
    .map(x => x[1])
    .filter(x => 1 < x.length);
};

console.log(findSubsequences([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 1, 1, 1, 1]));
// console.log(findSubsequences([4, 6, 7, 7]));

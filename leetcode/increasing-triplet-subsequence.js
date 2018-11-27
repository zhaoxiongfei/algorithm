// https://leetcode-cn.com/problems/increasing-triplet-subsequence/description/
// No 334. 递增的三元子序列

/**
  给定一个未排序的数组，判断这个数组中是否存在长度为 3 的递增子序列。

  数学表达式如下:

  如果存在这样的 i, j, k,  且满足 0 ≤ i < j < k ≤ n-1，
  使得 arr[i] < arr[j] < arr[k] ，返回 true ; 否则返回 false 。
  说明: 要求算法的时间复杂度为 O(n)，空间复杂度为 O(1) 。

  示例 1:

  输入: [1,2,3,4,5]
  输出: true
  示例 2:

  输入: [5,4,3,2,1]
  输出: false
 */

/**
 * @param {number[]} nums
 * @return {boolean}
 */
// 思路: 设置两个变量记录最小的和次小的，从左到有一次扫描更新
const increasingTriplet = nums => {
  const { length } = nums;
  if (length < 3) return false;

  let first = Infinity;
  let second = Infinity;

  for (const n of nums) {
    if (n > second) return true;
    if (n < first) first = n;
    if (first < n && n < second) second = n;
  }

  return false;
};

console.log(increasingTriplet([1, 2, 3, 1, 2, 1]));
// console.log(increasingTriplet([1, 0, 3, 6, 5]));

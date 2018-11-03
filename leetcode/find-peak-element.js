// https://leetcode-cn.com/problems/find-peak-element/description/
// No 162. 寻找峰值

/**
  峰值元素是指其值大于左右相邻值的元素。

  给定一个输入数组 nums，其中 nums[i] ≠ nums[i+1]，找到峰值元素并返回其索引。

  数组可能包含多个峰值，在这种情况下，返回任何一个峰值所在位置即可。

  你可以假设 nums[-1] = nums[n] = -∞。

  示例 1:

  输入: nums = [1,2,3,1]
  输出: 2
  解释: 3 是峰值元素，你的函数应该返回其索引 2。
  示例 2:

  输入: nums = [1,2,1,3,5,6,4]
  输出: 1 或 5
  解释: 你的函数可以返回索引 1，其峰值元素为 2；
       或者返回索引 5， 其峰值元素为 6。
  说明:

  你的解法应该是 O(logN) 时间复杂度的。
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
// 思路: 这个题如果允许O(n)的时间复杂度的话，几乎没有任何难度了。
// 要求 logN，下意识想到二分法，但是这个是未排序的，何从二分呢。
// 参考这个 https://blog.csdn.net/jmspan/article/details/51487108
const findPeakElement = nums => {
  let left = 0;
  let right = nums.length - 1;
  while (left < right) {
    const middle = parseInt((left + right) / 2, 10);
    console.log("left: %d, right: %d, middle: %d", left, right, middle);
    console.log(
      "middle v: %d, middle + 1 v: %d",
      nums[middle],
      nums[middle + 1]
    );
    if (nums[middle] > nums[middle + 1]) right = middle;
    else left = middle + 1;
  }

  return left;
};

console.log(findPeakElement([9, 8, 7, 6, 5, 0, 4, 7, -1]));

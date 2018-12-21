// https://leetcode-cn.com/problems/reverse-pairs/
// No 493. 翻转对

/**
  给定一个数组 nums ，如果 i < j 且 nums[i] > 2*nums[j]
  我们就将 (i, j) 称作一个重要翻转对。

  你需要返回给定数组中的重要翻转对的数量。

  示例 1:

  输入: [1,3,2,3,1]
  输出: 2
  示例 2:

  输入: [2,4,3,5,1]
  输出: 3
  注意:

  给定数组的长度不会超过50000。
  输入数组中的所有数字都在32位整数的表示范围内。
 */
const binSearch = (list, e, lo = 0, hi = list.length) => {
  while (lo < hi) {
    const mi = (lo + hi) >> 1; // 寻找中点
    // 经比较后确认深入 [lo, mi) 或 [mi + 1, hi)
    if (e < list[mi]) hi = mi;
    else lo = mi + 1;
  }

  return lo - 1;
};

/**
 * @param {number[]} nums
 * @return {number}
 */
// 思路: 从左到右扫描，逐步插入排序,使之有序
// 利用二分查找法加速搜索，利用 splice 加入插入
const reversePairs = nums => {
  let count = 0;

  const list = [];
  for (const num of nums) {
    count += list.length - 1 - binSearch(list, num * 2);
    list.splice(binSearch(list, num) + 1, 0, num);
  }

  return count;
};

console.log(reversePairs([-5, -5]));
console.log(reversePairs([1, 3, 2, 3, 1]));
console.log(reversePairs([2, 4, 3, 5, 1]));

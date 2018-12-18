// https://leetcode-cn.com/problems/find-right-interval/
// No 436. 寻找右区间

/**
  给定一组区间，对于每一个区间 i，检查是否存在一个区间 j，它的起始点大于或等于区间 i 的终点，这可以称为 j 在 i 的“右侧”。

  对于任何区间，你需要存储的满足条件的区间 j 的最小索引，这意味着区间 j 有最小的起始点可以使其成为“右侧”区间。
  如果区间 j 不存在，则将区间 i 存储为 -1。最后，你需要输出一个值为存储的区间值的数组。

  注意:

  你可以假设区间的终点总是大于它的起始点。
  你可以假定这些区间都不具有相同的起始点。
  示例 1:

  输入: [ [1,2] ]
  输出: [-1]

  解释:集合中只有一个区间，所以输出-1。
  示例 2:

  输入: [ [3,4], [2,3], [1,2] ]
  输出: [-1, 0, 1]

  解释:对于[3,4]，没有满足条件的“右侧”区间。
  对于[2,3]，区间[3,4]具有最小的“右”起点;
  对于[1,2]，区间[2,3]具有最小的“右”起点。
  示例 3:

  输入: [ [1,4], [2,3], [3,4] ]
  输出: [-1, 2, -1]

  解释:对于区间[1,4]和[3,4]，没有满足条件的“右侧”区间。
  对于[2,3]，区间[3,4]有最小的“右”起点。
 */

/**
 * Definition for an interval.
 */
function Interval(start, end) {
  this.start = start;
  this.end = end;
}

const create = intervals => intervals.map(x => new Interval(...x));
/**
 * @param {Interval[]} intervals
 * @return {number[]}
 */
// 思路: 按照区间左侧排序, 之后二分查找来定位是否存在大于等于当前区间结束的开始
const findRightInterval = intervals => {
  const { length } = intervals;
  intervals = intervals.map((x, i) => {
    x.index = i;
    return x;
  });
  intervals.sort((a, b) => a.start - b.start);

  // 在有序列表的区间[lo, hi)查找元素不小于 e 的元素的最小秩, 0 <= lo <= hi <= size
  const binSearch = (e, lo, hi = length) => {
    while (lo < hi) {
      const mi = (lo + hi) >> 1; // 寻找中点
      // 经比较后确认深入 [lo, mi) 或 [mi + 1, hi)
      if (e <= intervals[mi].start) hi = mi;
      else lo = mi + 1;
    }
    // 查找成功不能提前终止

    // 循环结束时， lo 为大于e的元素的最小的秩，故 lo - 1即不大于 e de元素的最大秩
    if (lo === length) return -1;
    return intervals[lo].index;
  };

  const ans = Array(length);
  for (let i = 0; i < length; i += 1) {
    ans[intervals[i].index] = binSearch(intervals[i].end, i + 1);
  }

  return ans;
};

// console.log(findRightInterval(create([[1, 2]])));
console.log(findRightInterval(create([[3, 4], [2, 3], [1, 2]])));
// console.log(findRightInterval(create([[1, 4], [2, 3], [3, 4]])));

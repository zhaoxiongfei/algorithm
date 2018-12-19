// https://leetcode-cn.com/problems/non-overlapping-intervals/
// No 435. 无重叠区间

/**
  给定一个区间的集合，找到需要移除区间的最小数量，使剩余区间互不重叠。

  注意:

  可以认为区间的终点总是大于它的起点。
  区间 [1,2] 和 [2,3] 的边界相互“接触”，但没有相互重叠。
  示例 1:

  输入: [ [1,2], [2,3], [3,4], [1,3] ]

  输出: 1

  解释: 移除 [1,3] 后，剩下的区间没有重叠。
  示例 2:

  输入: [ [1,2], [1,2], [1,2] ]

  输出: 2

  解释: 你需要移除两个 [1,2] 来使剩下的区间没有重叠。
  示例 3:

  输入: [ [1,2], [2,3] ]

  输出: 0

  解释: 你不需要移除任何区间，因为它们已经是无重叠的了。
 */

/**
 * Definition for an interval.
 * function Interval(start, end) {
 *     this.start = start;
 *     this.end = end;
 * }
 */
function Interval(start, end) {
  this.start = start;
  this.end = end;
}

const create = intervals => intervals.map(x => new Interval(...x));
/**
 * @param {Interval[]} intervals
 * @return {number}
 */
// 思路一: 依然按照区间起始端排序, 逐一判断是否有重叠，没有重叠的区域记录下来。
// 最终总数减去记录下来没有重叠的数量就是要删除的量
// 某些用例无法通过
const eraseOverlapIntervals1 = intervals => {
  const { length } = intervals;
  intervals.sort((a, b) => a.start - b.start);
  const overlap = new Map();

  for (let i = 0; i < length; i += 1) {
    const end = intervals[i].end;
    for (let j = i + 1; j < length; j += 1) {
      if (end <= intervals[j].start) break;
      overlap.set(i, (overlap.get(i) || new Set()).add(j));
      overlap.set(j, (overlap.get(j) || new Set()).add(i));
    }
  }

  console.log(overlap);
  let count = 0;
  while (overlap.size) {
    let max = null;
    for (const item of overlap) {
      if (max === null || max[1].size < item[1].size) max = item;
    }
    for (const index of max[1]) {
      overlap.get(index).delete(max[0]);
      if (overlap.get(index).size === 0) {
        overlap.delete(index);
      }
    }
    console.log(max);
    overlap.delete(max[0]);
    count += 1;
    console.log(count);
    console.log(overlap);
  }

  return count;
};

// 思路二: 删除最少，即保留下来的最多，动态规划做题
const eraseOverlapIntervals2 = intervals => {
  const { length } = intervals;
  intervals.sort((a, b) => a.end - b.end);

  const dp = [[0, 0]];
  for (const interval of intervals) {
    let prev = 0;
    for (let j = dp.length - 1; j >= 0; j -= 1) {
      if (dp[j][0] <= interval.start) {
        prev = dp[j][1];
        break;
      }
    }
    const last = dp[dp.length - 1];
    if (!last) {
      dp.push([interval.end, 1]);
    } else {
      dp.push([interval.end, Math.max(prev + 1, last[1])]);
    }
  }

  return (length - dp[dp.length - 1][1]) | 0;
};

// 思路三: 贪心算法，轻量级的动规,
// 核心思想：遇到相交的，保留结尾更小的，结尾更小，留给后面的空间更大，可容纳更多的区间
const eraseOverlapIntervals = intervals => {
  const { length } = intervals;
  if (length === 0) return 0;
  intervals.sort((a, b) => {
    if (a.end === b.end) return a.start - b.start;
    return a.end - b.end;
  });

  let count = 1;
  let prev = 0;
  for (let i = 1; i < length; i += 1) {
    if (intervals[prev].end <= intervals[i].start) {
      count += 1;
      prev = i;
    }
  }

  return length - count;
};

console.log(eraseOverlapIntervals1(create([[1, 2], [2, 3], [3, 4], [1.5, 3]])));
console.log(eraseOverlapIntervals2(create([[1, 2], [2, 3], [3, 4], [1.5, 3]])));
console.log(
  // eraseOverlapIntervals(create([[0, 2], [1, 3], [2, 4], [3, 5], [4, 6]]))
  eraseOverlapIntervals(
    create([[1, 2], [1, 2], [1, 2], [1, 4], [1, 4], [1, 4]])
    // create([[0, 2], [1, 3], [1, 3], [2, 4], [3, 5], [3, 5], [4, 6]])
  )
);

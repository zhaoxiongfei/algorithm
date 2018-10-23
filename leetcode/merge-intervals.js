// https://leetcode-cn.com/problems/merge-intervals/description/

/**
 * Definition for an interval.
 * function Interval(start, end) {
 *     this.start = start;
 *     this.end = end;
 * }
 */
/**
 * @param {Interval[]} intervals
 * @return {Interval[]}
 */

// 思路: 逐个扫描，比较区间是否有交集，放入答案中
const merge = intervals => {
  const { length } = intervals;
  if (length < 2) return intervals;
  const ans = [];
  // 先按照区间开始值排序, 这样比较区间是否有交集的时候只需要比较两次
  intervals.sort((a, b) => a.start - b.start);
  for (let i = 0; i < length; i += 1) {
    const interval = intervals[i];
    let intersect = false;
    for (let j = 0; j < ans.length; j += 1) {
      const an = ans[j];
      if (interval.start <= an.end) {
        if (interval.end > an.end) an.end = interval.end;
        intersect = true;
        break;
      }
    }
    if (!intersect) ans.push(interval);
  }

  return ans;
};

const intervals = [];
console.log(merge(intervals));

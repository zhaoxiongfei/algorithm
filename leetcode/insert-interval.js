// https://leetcode-cn.com/problems/insert-interval/description/
const createInterval = (start, end) => ({
  start,
  end
});
/**
 * Definition for an interval.
 * function Interval(start, end) {
 *     this.start = start;
 *     this.end = end;
 * }
 */
const insert = (intervals, newInterval) => {
  const { length } = intervals;
  if (length === 0) return [newInterval];

  const ans = [];
  let inserted = false;
  for (let i = 0; i < length; i += 1) {
    const curr = intervals[i];
    // 新区间已经合并，则后续区间直接放入答案中
    if (inserted) {
      ans.push(curr);
      continue;
    }

    if (newInterval.start < curr.start && newInterval.end >= curr.start) {
      // 新区间右侧和当前区间左侧相交, 修改新区间的结束之
      if (curr.end > newInterval.end) newInterval.end = curr.end;
    } else if (newInterval.end >= curr.end && newInterval.start <= curr.end) {
      // 新区间左侧和当前区间右侧相交, 修改新区间的开始值
      if (curr.start < newInterval.start) newInterval.start = curr.start;
    } else if (newInterval.end < curr.start) {
      // 判断新区间是否在当前区间的左侧，是的话直接插入
      ans.push(newInterval);
      ans.push(curr);
      inserted = true;
    } else if (newInterval.start >= curr.start && newInterval.end <= curr.end) {
      // 新区间完全包含在当前区间
      inserted = true;
      ans.push(curr);
    } else {
      // 当前区间和新区间没有交叉，当前区间放入答案
      ans.push(curr);
    }
  }
  if (!inserted) ans.push(newInterval);

  return ans;
};

const intervals = [createInterval(1, 3), createInterval(6, 9)];
console.log(insert(intervals, createInterval(2, 5)));

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
  const pushAns = interval => {
    const last = ans[ans.length - 1];
    if (last && last.end >= interval.start) {
      if (interval.end > last.end) last.end = interval.end;
    } else {
      ans.push(interval);
    }
  };

  for (let i = 0; i < length; i += 1) {
    const curr = intervals[i];
    if (inserted || curr.start < newInterval.start) {
      pushAns(curr);
      continue;
    }
    pushAns(newInterval);
    pushAns(curr);
    inserted = true;
  }
  if (!inserted) pushAns(newInterval);

  return ans;
};

const intervals = [createInterval(1, 3), createInterval(6, 9)];
console.log(insert(intervals, createInterval(2, 5)));

// 在有序向量的区间[lo, hi)查找元素不大于 e 的元素的最大秩, 0 <= lo <= hi <= size
const binSearch = (_elem, e, lo = 0, hi = _elem.length) => {
  while (lo < hi) {
    const mi = (lo + hi) >> 1; // 寻找中点
    // 经比较后确认深入 [lo, mi) 或 [mi + 1, hi)
    if (e < _elem[mi]) hi = mi;
    else lo = mi + 1;
  }
  // 查找成功不能提前终止

  // 循环结束时， lo 为大于e的元素的最小的秩，故 lo - 1即不大于 e de元素的最大秩
  return lo;
};

/**
 * @param {number[]} days
 * @param {number[]} costs
 * @return {number}
 */
// 思路: 暴力的dfs会超时
const mincostTickets1 = (days, costs) => {
  const dfs = start => {
    if (start === days.length - 1) return costs[0];
    if (days.length <= start) return 0;
    const case1 = costs[0] + dfs(start + 1);

    let case2 = Infinity;
    const case2Start = binSearch(days, days[start] + 7 - 1, start, days.length);
    if (case2Start !== start + 1) case2 = costs[1] + dfs(case2Start);

    let case3 = Infinity;
    const case3Start = binSearch(
      days,
      days[start] + 30 - 1,
      start,
      days.length
    );
    if (case3Start !== start + 1) case3 = costs[2] + dfs(case3Start);

    return Math.min(case1, case2, case3);
  };

  return dfs(0);
};

// 思路: 动态规划来做题 dp[i] 为 完成第 i 天旅行需要的最低费用
// dp[i] = Math.min(dp[i - 1] + costs[0], dp[i - 7] + costs[1], dp[i - 30] + costs[2])
const mincostTickets = (days, costs) => {
  const { length } = days;
  const set = new Set(days);
  const dp = Array(366).fill(0);
  for (let i = 1; i < 366; i += 1) {
    if (!set.has(i)) {
      dp[i] = dp[i - 1];
    } else {
      dp[i] = Math.min(
        dp[i - 1] + costs[0],
        7 <= i ? dp[i - 7] + costs[1] : costs[1],
        30 <= i ? dp[i - 30] + costs[2] : costs[2]
      );
    }
  }

  return dp[days[length - 1]];
};

console.log(
  mincostTickets(
    [1, 2, 3, 4, 6, 8, 9, 10, 13, 14, 16, 17, 19, 21, 24, 26, 27, 28, 29],
    [3, 14, 50]
  )
);
console.log(
  mincostTickets1([1, 4, 6, 7, 8, 20], [2, 7, 15])
  // mincostTickets([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 30, 31], [2, 7, 15])
);

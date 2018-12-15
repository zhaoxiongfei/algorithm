// https://leetcode-cn.com/problems/minimum-number-of-arrows-to-burst-balloons/
// No 452. 用最少数量的箭引爆气球

/**
  在二维空间中有许多球形的气球。
  对于每个气球，提供的输入是水平方向上，气球直径的开始和结束坐标。
  由于它是水平的，所以y坐标并不重要，因此只要知道开始和结束的x坐标就足够了。
  开始坐标总是小于结束坐标。平面内最多存在104个气球。

  一支弓箭可以沿着x轴从不同点完全垂直地射出。
  在坐标x处射出一支箭，若有一个气球的直径的开始和结束坐标为 xstart，xend， 且满足  xstart ≤ x ≤ xend，则该气球会被引爆。
  可以射出的弓箭的数量没有限制。 弓箭一旦被射出之后，可以无限地前进。我们想找到使得所有气球全部被引爆，所需的弓箭的最小数量。

  Example:

  输入:
  [[10,16], [2,8], [1,6], [7,12]]

  输出:
  2

  解释:
  对于该样例，我们可以在x = 6（射爆[2,8],[1,6]两个气球）和 x = 11（射爆另外两个气球）。
 */

/**
 * @param {number[][]} points
 * @return {number}
 */
// 思路: 能想到的办法就是按照是否相交归组，
// 但是可能 A ∩ B， B ∩ C， 但是 A C 不相交。此时B改归入 A 还是 C?
// 参考 https://blog.csdn.net/lby0910/article/details/69945430
// 先对直径坐标的起点排序
const findMinArrowShots = points => {
  const { length } = points;
  if (length === 0) return 0;

  points.sort((a, b) => a[0] - b[0]);

  const arrows = [points[0]];
  for (let i = 1; i < length; i += 1) {
    const last = arrows[arrows.length - 1];
    if (points[i][0] <= last[1]) {
      // 可以重叠
      last[0] = points[i][0];
      if (points[i][1] < last[1]) last[1] = points[i][1];
    } else {
      arrows.push(points[i]);
    }
  }

  return arrows.length;
};

// 空间优化 O(N) => O(1)
const findMinArrowShots = points => {
  const { length } = points;
  if (length === 0) return 0;

  points.sort((a, b) => a[0] - b[0]);

  let last = points[0];
  let count = 1;
  for (let i = 1; i < length; i += 1) {
    if (points[i][0] <= last[1]) {
      // 可以重叠
      last[0] = points[i][0];
      if (points[i][1] < last[1]) last[1] = points[i][1];
    } else {
      last = points[i];
      count += 1;
    }
  }

  return count;
};

console.log(findMinArrowShots1([[10, 16], [2, 8], [1, 6], [7, 12]]));
console.log(
  findMinArrowShots([
    [3, 9],
    [7, 12],
    [3, 8],
    [6, 8],
    [9, 10],
    [2, 9],
    [0, 9],
    [3, 9],
    [0, 6],
    [2, 8]
  ])
);

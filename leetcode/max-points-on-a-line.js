// https://leetcode-cn.com/problems/max-points-on-a-line/description/
// No. 149

/**
  给定一个二维平面，平面上有 n 个点，求最多有多少个点在同一条直线上。

  示例 1:

  输入: [[1,1],[2,2],[3,3]]
  输出: 3
  解释:
  ^
  |
  |        o
  |     o
  |  o
  +------------->
  0  1  2  3  4
  示例 2:

  输入: [[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]]
  输出: 4
  解释:
  ^
  |
  |  o
  |     o        o
  |        o
  |  o        o
  +------------------->
  0  1  2  3  4  5  6
 */

/**
 * Definition for a point.
 * function Point(x, y) {
 *     this.x = x;
 *     this.y = y;
 * }
 */
/**
 * @param {Point[]} points
 * @return {number}
 */
// 思路：两两求斜率，按照同样的斜率计数
const maxPoints = points => {
  const { length } = points;
  if (!length) return 0;
  if (length < 3) return length;

  const slope = {}; // 按照斜率以及截距统计
  for (let i = 0; i < length - 1; i += 1) {
    const p1 = points[i];
    for (let j = i + 1; j < length; j += 1) {
      const p2 = points[j];
      let k; // 斜率
      let intercept; // 截距
      if (p2.y === p1.y) {
        k = Infinity;
        intercept = p1.y;
      } else if (p2.x === p1.x) {
        k = 0;
        intercept = p1.x;
      } else {
        k = (p2.x - p1.x) / (p2.y - p1.y);
        intercept = p1.y - p1.x / k;
      }
      if (!slope[k]) slope[k] = {};
      if (!slope[k][intercept]) slope[k][intercept] = new Set();
      slope[k][intercept].add(p1);
      slope[k][intercept].add(p2);
    }
  }

  // console.log(slope);
  return Math.max(
    ...Object.values(slope).map(x =>
      Math.max(...Object.values(x).map(s => s.size))
    )
  );
};

console.log(maxPoints([[1, 1], [1, 1], [2, 3]].map(([x, y]) => ({ x, y }))));
console.log(maxPoints([[0, 0], [1, 1], [0, 0]].map(([x, y]) => ({ x, y }))));

console.log(
  maxPoints(
    [[1, 1], [3, 2], [5, 3], [4, 1], [2, 3], [1, 4]].map(([x, y]) => ({ x, y }))
  )
);

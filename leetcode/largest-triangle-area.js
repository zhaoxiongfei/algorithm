// https://leetcode-cn.com/problems/largest-triangle-area/description/
// No 812. 最大三角形面积

/**
给定包含多个点的集合，从其中取三个点组成三角形，返回能组成的最大三角形的面积。

示例:
输入: points = [[0,0],[0,1],[1,0],[0,2],[2,0]]
输出: 2
解释:
这五个点如下图所示。组成的橙色三角形是最大的，面积为2。


注意:

3 <= points.length <= 50.
不存在重复的点。
 -50 <= points[i][j] <= 50.
结果误差值在 10^-6 以内都认为是正确答案。
 */

const getArea = ([x1, y1], [x2, y2], [x3, y3]) =>
  Math.abs((x1 * y2 + x2 * y3 + x3 * y1 - x1 * y3 - x2 * y1 - x3 * y2) / 2);

/**
 * @param {number[][]} points
 * @return {number}
 */
const largestTriangleArea = points => {
  const { length } = points;
  let max = 0;
  for (let i = 0; i < length - 2; i += 1) {
    const a = points[i];
    for (let j = i + 1; j < length - 1; j += 1) {
      const b = points[j];
      for (let k = j + 1; k < length; k += 1) {
        const c = points[k];
        const area = getArea(a, b, c);
        if (area > max) max = area;
      }
    }
  }

  return max;
};

console.log(largestTriangleArea([[0, 0], [0, 1], [1, 0], [0, 2], [2, 0]]));

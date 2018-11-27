// https://leetcode-cn.com/problems/longest-increasing-path-in-a-matrix/description/
// No 329. 矩阵中的最长递增路径

/**
  给定一个整数矩阵，找出最长递增路径的长度。

  对于每个单元格，你可以往上，下，左，右四个方向移动。
  你不能在对角线方向上移动或移动到边界外（即不允许环绕）。

  示例 1:

  输入: nums =
  [
    [9,9,4],
    [6,6,8],
    [2,1,1]
  ]
  输出: 4
  解释: 最长递增路径为 [1, 2, 6, 9]。
  示例 2:

  输入: nums =
  [
    [3,4,5],
    [3,2,6],
    [2,2,1]
  ]
  输出: 4
  解释: 最长递增路径是 [3, 4, 5, 6]。注意不允许在对角线方向上移动。
 */

/**
 * @param {number[][]} matrix
 * @return {number}
 */
// 思路: 动态规划, 先将各点放一起排序，从最大点开始逐个更新最长路径
const longestIncreasingPath = matrix => {
  const m = matrix.length;
  if (m === 0) return 0;
  const n = matrix[0].length;
  if (n === 0) return 0;

  const sorted = [];
  for (let i = 0; i < m; i += 1) {
    for (let j = 0; j < n; j += 1) {
      const item = { i, j, v: matrix[i][j], longest: 1 };
      sorted.push(item);
      matrix[i][j] = item;
    }
  }

  let max = 1;
  const update = (i, j, longest, v) => {
    if (i < 0 || i >= m || j < 0 || j >= n) return;
    const item = matrix[i][j];
    if (!item) return;
    if (item.v >= v) return;
    if (item.longest < longest + 1) item.longest = longest + 1;
    if (item.longest > max) max = item.longest;
  };

  const updateLongest = idx => {
    const point = sorted[idx];
    if (!point) return;
    const { i, j, v, longest } = point;
    // 如果未设置最大路径值，则设置为 1
    // 更新周围比当前点低的的最大路径，为当前最大路径 +1
    update(i - 1, j, longest, v); // 上
    update(i + 1, j, longest, v); // 下
    update(i, j - 1, longest, v); // 左
    update(i, j + 1, longest, v); // 右
    updateLongest(idx + 1);
  };

  sorted.sort((a, b) => b.v - a.v);
  updateLongest(0); // 从第一个开始

  return max;
};

// console.log(longestIncreasingPath([[9, 9, 4], [6, 6, 8], [2, 1, 1]]));
console.log(longestIncreasingPath([[3, 4, 5], [3, 2, 6], [2, 2, 1]]));

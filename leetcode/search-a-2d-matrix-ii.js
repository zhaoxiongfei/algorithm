// https://leetcode-cn.com/problems/search-a-2d-matrix-ii/description/
// No 240. 搜索二维矩阵 II

/**
  编写一个高效的算法来搜索 m x n 矩阵 matrix 中的一个目标值 target。该矩阵具有以下特性：

  每行的元素从左到右升序排列。
  每列的元素从上到下升序排列。
  示例:

  现有矩阵 matrix 如下：

  [
    [1,   4,  7, 11, 15],
    [2,   5,  8, 12, 19],
    [3,   6,  9, 16, 22],
    [10, 13, 14, 17, 24],
    [18, 21, 23, 26, 30]
  ]
  给定 target = 5，返回 true。

  给定 target = 20，返回 false。
 */

/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
const bs = (line, target) => {
  let left = 0;
  let right = line.length - 1;
  while (left <= right) {
    const middle = Math.floor((left + right) / 2);
    const md = line[middle];
    console.log(
      "left: %d, right: %d, middle: %d, md: %d",
      left,
      right,
      middle,
      md
    );
    if (md === target) return true;
    if (md < target) {
      left = middle + 1;
    } else {
      right = middle - 1;
    }
  }

  return false;
};

// 思路: 二分查找，先确定哪一行，之后二分查找
const searchMatrix = (matrix, target) => {
  const m = matrix.length;
  if (m === 0) return false;
  const n = matrix[0].length;
  for (let i = 0; i < m; i += 1) {
    const line = matrix[i];
    if (line[0] > target && line[n - 1] < target) break;
    if (bs(line, target)) return true;
  }

  return false;
};

console.log(bs([1, 4, 7, 11, 15], 5));
console.log(bs([2, 5, 8, 12, 19], 5));
console.log(bs([-5], -5));

console.log(
  searchMatrix(
    [
      [1, 4, 7, 11, 15],
      [2, 5, 8, 12, 19],
      [3, 6, 9, 16, 22],
      [10, 13, 14, 17, 24],
      [18, 21, 23, 26, 30]
    ],
    5
  )
);

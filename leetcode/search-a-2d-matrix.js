// https://leetcode-cn.com/problems/search-a-2d-matrix/description/

/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
// 编写一个高效的算法来判断 m x n 矩阵中，是否存在一个目标值。该矩阵具有如下特性：
// 1. 每行中的整数从左到右按升序排列。
// 2. 每行的第一个整数大于前一行的最后一个整数。
//
// 思路: 本质上一个二分搜索发，需要合理的转换为二维上
const searchMatrix = (matrix, target) => {
  const m = matrix.length;
  if (m === 0) return false;
  const n = matrix[0].length;
  if (n === 0) return false;
  if (target === matrix[0][0]) return true;
  if (target === matrix[m - 1][n - 1]) return true;
  if (target < matrix[0][0]) return false;
  if (target > matrix[m - 1][n - 1]) return false;

  let left = 0;
  let right = m * n - 1;
  let middle;

  while (left < right) {
    middle = Math.ceil((left + right) / 2);
    const num = matrix[(middle / n) | 0][middle % n];
    if (num === target) return true;
    if (middle === right) return false;
    if (num < target) {
      left = middle;
    } else {
      right = middle;
    }
  }

  return false;
};

const matrix = [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 50]];
console.log(searchMatrix(matrix, 9));

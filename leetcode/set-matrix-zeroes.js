// https://leetcode-cn.com/problems/set-matrix-zeroes/description/

/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
// 这个题要求原地修改，这就需要先找到零所在行和列, 如果一边找一边修改, 修改会引入额外的零
const setZeroes = matrix => {
  const m = matrix.length;
  if (m === 0) return;
  const n = matrix[0].length;
  if (n === 0) return;

  const rows = new Set();
  const cols = new Set();

  for (let i = 0; i < m; i += 1) {
    for (let j = 0; j < n; j += 1) {
      if (matrix[i][j] === 0) {
        rows.add(i);
        cols.add(j);
      }
    }
  }

  for (let i = 0; i < m; i += 1) {
    for (let j = 0; j < n; j += 1) {
      if (rows.has(i) || cols.has(j)) {
        matrix[i][j] = 0;
      }
    }
  }
};

const matrix = [[0, 1, 2, 0], [3, 4, 5, 2], [1, 3, 1, 5]];
setZeroes(matrix);
console.log(matrix);

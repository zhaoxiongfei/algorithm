// https://leetcode-cn.com/problems/diagonal-traverse/
// No 498. 对角线遍历

/**
  给定一个含有 M x N 个元素的矩阵（M 行，N 列），
  请以对角线遍历的顺序返回这个矩阵中的所有元素，对角线遍历如下图所示。

  示例:

  输入:
  [
   [ 1, 2, 3 ],
   [ 4, 5, 6 ],
   [ 7, 8, 9 ]
  ]

  输出:  [1,2,4,7,5,3,6,8,9]

  说明:

  给定矩阵中的元素总数不会超过 100000 。
 */

/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
const findDiagonalOrder = matrix => {
  const m = matrix.length;
  if (m === 0) return matrix;
  const n = matrix[0].length;
  const list = [];

  for (let i = 1; i < m + n; i += 1) {
    const line = [];
    const max = i < m ? i : m;
    for (let j = 0; j < max; j += 1) {
      if (matrix[j].length) {
        if (i % 2) {
          line.unshift(matrix[j].shift());
        } else {
          line.push(matrix[j].shift());
        }
      }
    }
    list.push(line);
  }

  return [].concat(...list);
};

console.log(findDiagonalOrder([[1, 2, 3], [4, 5, 6], [7, 8, 9]]));
console.log(findDiagonalOrder([[3], [2]]));

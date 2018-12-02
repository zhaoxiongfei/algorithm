// https://leetcode-cn.com/problems/kth-smallest-element-in-a-sorted-matrix/description/
// No 378. 有序矩阵中第K小的元素

/**
  给定一个 n x n 矩阵，其中每行和每列元素均按升序排序，找到矩阵中第k小的元素。
  请注意，它是排序后的第k小元素，而不是第k个元素。

  示例:

  matrix = [
     [ 1,  5,  9],
     [10, 11, 13],
     [12, 13, 15]
  ],
  k = 8,

  返回 13。
  说明:
  你可以假设 k 的值永远是有效的, 1 ≤ k ≤ n2 。
*/

/**
 * @param {number[][]} matrix
 * @param {number} k
 * @return {number}
 */
// 直接采用归并排序的merge方法，这样就得到一个整体有序的数组，随便要谁给谁
const kthSmallest = (matrix, k) => {
  const list = [];
  while ((k -= 1) >= 0) {
    let min = Infinity;
    let minIndex = 0;
    for (let i = 0; i < matrix.length; i += 1) {
      if (matrix[i].length === 0) continue;
      if (matrix[i][0] < min) {
        min = matrix[i][0];
        minIndex = i;
      }
    }
    list.push(min);
    matrix[minIndex].shift();
  }

  return list.pop();
};

console.log(
  kthSmallest(
    [
      [1, 6, 10, 13, 14, 16, 21],
      [3, 10, 12, 18, 22, 27, 29],
      [3, 15, 19, 20, 23, 29, 34],
      [8, 15, 19, 25, 27, 29, 39],
      [12, 17, 24, 25, 28, 29, 41],
      [16, 22, 27, 31, 31, 33, 44],
      [20, 26, 28, 35, 39, 41, 45]
    ],
    38
  )
);

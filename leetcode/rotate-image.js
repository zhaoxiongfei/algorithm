// https://leetcode-cn.com/problems/rotate-image/description/
//

const rotate = matrix => {
  const n = matrix.length;
  const half = (n / 2) | 0;
  // 进行转置
  for (let i = 0; i < n; i += 1) {
    for (let j = i; j < n; j += 1) {
      const tmp = matrix[j][i];
      matrix[j][i] = matrix[i][j];
      matrix[i][j] = tmp;
    }
    // 翻转每一行
    for (let j = 0; j < half; j += 1) {
      const tmp = matrix[i][j];
      matrix[i][j] = matrix[i][n - j - 1];
      matrix[i][n - j - 1] = tmp;
    }
  }
};

const matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
rotate(matrix);

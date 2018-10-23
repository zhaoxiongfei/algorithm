// https://leetcode-cn.com/problems/spiral-matrix/description/

/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
// 思路: 记录运动的方向，不同的方向不同的操作
// 每改变一次方向，对应的到下一次转向的距离减一
const spiralOrder = matrix => {
  let rows = matrix.length;
  let cols = matrix[0].length;

  const line = [];
  const directions = {
    right: "down",
    down: "left",
    left: "up",
    up: "right"
  };
  let direction = "right";
  let nextRow = 0; // 下一个元素的行号
  let nextCol = 0; // 下一个元素的列号
  let i = 0;
  while (i < rows || i < cols) {
    if (rows === 0 || cols === 0) break;
    i += 1;
    line.push(matrix[nextRow][nextCol]);

    if (direction === "left" || direction === "right") {
      if (i === cols) {
        // 开始转向
        direction = directions[direction];
        i = 0;
        rows -= 1;
      }
    }
    if (direction === "down" || direction === "up") {
      if (i === rows) {
        // 开始转向
        direction = directions[direction];
        i = 0;
        cols -= 1;
      }
    }
    if (direction === "right") {
      nextCol += 1;
    } else if (direction === "down") {
      nextRow += 1;
    } else if (direction === "left") {
      nextCol -= 1;
    } else {
      nextRow -= 1;
    }
  }

  return line;
};

const matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
console.log(spiralOrder(matrix));

const matrix2 = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]];
console.log(spiralOrder(matrix2));

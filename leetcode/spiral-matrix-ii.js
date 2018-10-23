// https://leetcode-cn.com/problems/spiral-matrix-ii/description/

/**
 * @param {number} n
 * @return {number[][]}
 */
// 思路: 记录运动的方向，不同的方向不同的操作
// 每改变一次方向，对应的到下一次转向的距离减一
const generateMatrix = n => {
  const matrix = [];
  let rows = n;
  let cols = n;

  const line = [];
  for (let i = 0; i < n * n; i += 1) line.push(n * n - i);
  for (let i = 0; i < n; i += 1) matrix.push(Array(n));

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

    matrix[nextRow][nextCol] = line.pop();

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

  return matrix;
};

console.log(
  generateMatrix(10)
    .map(x => x.join("\t"))
    .join("\n")
);

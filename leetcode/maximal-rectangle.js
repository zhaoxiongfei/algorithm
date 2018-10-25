// https://leetcode-cn.com/problems/maximal-rectangle/description/

/**
 * @param {character[][]} matrix
 * @return {number}
 */
// 思路: 利用上一个题把当前给定的矩阵逐行作为底，求m个不同的，找到面积最大的
// https://leetcode-cn.com/problems/largest-rectangle-in-histogram/description/

// 思路二:
// https://blog.csdn.net/u013040821/article/details/79830697
// 利用单调栈
const largestRectangleArea2 = heights => {
  console.log(heights);
  if (heights.length === 0) return 0;
  const stack = [];

  let maxArea = 0;
  for (let i = 0; i < heights.length; i += 1) {
    while (stack.length && heights[stack[stack.length - 1]] >= heights[i]) {
      const tmp = stack.pop();
      const k = stack.length ? stack[stack.length - 1] : -1;
      maxArea = Math.max(maxArea, (i - k - 1) * heights[tmp]);
    }
    stack.push(i);
  }

  let tmp = 0;
  const len = heights.length;
  while (stack.length) {
    tmp = stack.pop();
    maxArea = Math.max(
      maxArea,
      (stack.length ? len - stack[stack.length - 1] - 1 : len) * heights[tmp]
    );
  }

  console.log(maxArea);
  return maxArea;
};

const maximalRectangle = matrix => {
  const m = matrix.length;
  if (m === 0) return 0;
  const n = matrix[0].length;
  if (n === 0) return 0;

  const list = [];
  for (let i = 0; i < m; i += 1) {
    const last = list[list.length - 1] || Array(n).fill(0);
    const curr = last.slice();
    console.log("i: %d, curr: %s", i, curr);
    for (let j = 0; j < n; j += 1) {
      const num = matrix[i][j];
      if (num === "0") {
        curr[j] = 0;
      } else {
        curr[j] += 1;
      }
    }
    console.log("i: %d, curr: %s", i, curr);
    list.push(curr);
  }

  return Math.max(...list.map(largestRectangleArea2));
};

const matrix = [
  ["1", "0", "1", "0", "0"],
  ["1", "0", "1", "1", "1"],
  ["1", "1", "1", "1", "1"],
  ["1", "0", "0", "1", "0"]
];
console.log(maximalRectangle(matrix));

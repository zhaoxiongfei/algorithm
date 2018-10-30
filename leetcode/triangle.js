// https://leetcode-cn.com/problems/triangle/description/
/**
  给定一个三角形，找出自顶向下的最小路径和。每一步只能移动到下一行中相邻的结点上。

  例如，给定三角形：

  [
       [2],
      [3,4],
     [6,5,7],
    [4,1,8,3]
  ]
  自顶向下的最小路径和为 11（即，2 + 3 + 5 + 1 = 11）。

  说明：

  如果你可以只使用 O(n) 的额外空间（n 为三角形的总行数）来解决这个问题，那么你的算法会很加分。
*/

/**
 * @param {number[][]} triangle
 * @return {number}
 */
// 思路: 这个也是一个典型的动态规划的题目: 只是二维数组各项长度不等，稍加迷惑性
// 令 dp[i][j] 代表到达第 i 行，第 j 列所需最短路径
// 递推公式 dp[i][j] = Math.min(dp[i - 1][j - 1], dp[i - 1][j]) + triangle[i][j];
const minimumTotal = triangle => {
  const { length } = triangle;
  if (!length) return 0;
  const dp = [triangle[0]];
  const getV = v => (v !== undefined ? v : Infinity);
  for (let i = 1; i < length; i += 1) {
    const line = triangle[i];
    const l = dp[i - 1];
    dp[i] = [];
    for (let j = 0; j < line.length; j += 1) {
      dp[i][j] = Math.min(getV(l[j - 1]), getV(l[j])) + line[j];
    }
  }
  return Math.min(...dp[length - 1]);
};

// 这里的dp结构和triangle 完全一样，也可以直接使用 triangle 的结构
const minimumTotal2 = triangle => {
  const { length } = triangle;
  if (!length) return 0;
  const getV = v => (v !== undefined ? v : Infinity);
  for (let i = 1; i < length; i += 1) {
    const line = triangle[i];
    const l = triangle[i - 1];
    for (let j = 0; j < line.length; j += 1) {
      line[j] = Math.min(getV(l[j - 1]), getV(l[j])) + line[j];
    }
  }
  return Math.min(...triangle[length - 1]);
};

console.log(minimumTotal([[1], [-5, -2], [3, 6, 1], [-1, 2, 4, -3]]));
console.log(minimumTotal2([[1], [-5, -2], [3, 6, 1], [-1, 2, 4, -3]]));
console.log(minimumTotal([[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]]));
console.log(minimumTotal2([[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]]));

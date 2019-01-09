// https://leetcode-cn.com/problems/most-stones-removed-with-same-row-or-column/
// No 947. 移除最多的同行或同列石头

/**
  在二维平面上，我们将石头放置在一些整数坐标点上。
  每个坐标点上最多只能有一块石头。

  现在，move 操作将会移除与网格上的某一块石头共享一列或一行的一块石头。

  我们最多能执行多少次 move 操作？

  示例 1：

  输入：stones = [[0,0],[0,1],[1,0],[1,2],[2,1],[2,2]]
  输出：5
  示例 2：

  输入：stones = [[0,0],[0,2],[1,1],[2,0],[2,2]]
  输出：3
  示例 3：

  输入：stones = [[0,0]]
  输出：0

  提示：

  1 <= stones.length <= 1000
  0 <= stones[i][j] < 10000
 */
const UnionFind = require("./union-find");
/**
 * @param {number[][]} stones
 * @return {number}
 */
const removeStones = stones => {
  const { length } = stones;

  const uf = new UnionFind(length);
  for (let i = 0; i < length; i += 1) {
    for (let j = 0; j < length; j += 1) {
      if (i === j) continue;
      if (stones[i][0] === stones[j][0] || stones[i][1] === stones[j][1]) {
        uf.union(i, j);
      }
    }
  }

  return length - uf.size;
};

console.log(removeStones([[0, 0], [0, 1], [1, 0], [1, 2], [2, 1], [2, 2]]));
console.log(removeStones([[0, 0], [0, 2], [1, 1], [2, 0], [2, 2]]));
console.log(removeStones([[0, 0]]));

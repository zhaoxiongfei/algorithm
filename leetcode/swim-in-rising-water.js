// https://leetcode-cn.com/problems/swim-in-rising-water/
// No 778. 水位上升的泳池中游泳

/**
  在一个 N x N 的坐标方格 grid 中，每一个方格的值 grid[i][j] 表示在位置 (i,j) 的平台高度。

  现在开始下雨了。当时间为 t 时，此时雨水导致水池中任意位置的水位为 t 。
  你可以从一个平台游向四周相邻的任意一个平台，但是前提是此时水位必须同时淹没这两个平台。
  假定你可以瞬间移动无限距离，也就是默认在方格内部游动是不耗时的。当然，在你游泳的时候你必须待在坐标方格里面。

  你从坐标方格的左上平台 (0，0) 出发。最少耗时多久你才能到达坐标方格的右下平台 (N-1, N-1)？

  示例 1:

  输入: [[0,2],[1,3]]
  输出: 3
  解释:
  时间为0时，你位于坐标方格的位置为 (0, 0)。
  此时你不能游向任意方向，因为四个相邻方向平台的高度都大于当前时间为 0 时的水位。

  等时间到达 3 时，你才可以游向平台 (1, 1).
  因为此时的水位是 3，坐标方格中的平台没有比水位 3 更高的，所以你可以游向坐标方格中的任意位置
  示例2:

  输入: [[0,1,2,3,4],[24,23,22,21,5],[12,13,14,15,16],[11,17,18,19,20],[10,9,8,7,6]]
  输入: 16
  解释:
   0  1  2  3  4
  24 23 22 21  5
  12 13 14 15 16
  11 17 18 19 20
  10  9  8  7  6

  最终的路线用加粗进行了标记。
  我们必须等到时间为 16，此时才能保证平台 (0, 0) 和 (4, 4) 是连通的
  提示:

  2 <= N <= 50.
  grid[i][j] 位于区间 [0, ..., N*N - 1] 内。
 */
const UnionFind = require("./union-find");
/**
 * @param {number[][]} grid
 * @return {number}
 */
const swimInWater = grid => {
  const { length } = grid;

  // 描边, 为了后续处理统一, 描上边和左边
  for (let i = 0; i < length; i += 1) grid[i].unshift(Infinity);
  grid.unshift(Array(length + 1).fill(Infinity));

  console.log(grid);
  let t = 0;
  let lo = 0;
  let hi = length * length;
  while (lo < hi) {
    const mi = (lo + hi) >> 1; // 寻找中点
    const uf = new UnionFind(length * length);

    for (let i = 0; i < length; i += 1) {
      for (let j = 0; j < length; j += 1) {
        if (grid[i + 1][j + 1] <= mi) {
          if (grid[i][j + 1] <= mi) {
            uf.union((i - 1) * length + j, i * length + j);
          }
          if (grid[i + 1][j] <= mi) {
            uf.union(i * length + j - 1, i * length + j);
          }
        }
      }
    }

    if (uf.find(0) === uf.find(length * length - 1)) {
      t = mi;
      hi = mi;
    } else {
      lo = mi + 1;
    }
  }
  // 查找成功不能提前终止

  return t;
};

console.log(
  swimInWater([
    [0, 1, 2, 3, 4],
    [24, 23, 22, 21, 5],
    [12, 13, 14, 15, 16],
    [11, 17, 18, 19, 20],
    [10, 9, 8, 7, 6]
  ])
);

console.log(swimInWater([[0, 2], [1, 3]]));
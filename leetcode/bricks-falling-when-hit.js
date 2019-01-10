// https://leetcode-cn.com/problems/bricks-falling-when-hit/
// No 803. 打砖块

/**
  我们有一组包含1和0的网格；其中1表示砖块。 当且仅当一块砖直接连接到网格的顶部，
  或者它至少连接着(4个方向)相邻的砖块之一时，它才不会落下。

  我们会依次消除一些砖块。
  每当我们消除 (i, j) 位置时， 对应位置的砖块（若存在）会消失，
  然后其他的砖块可能因为这个消除而落下。

  返回一个数组表示每次消除操作对应落下的砖块数目。

  示例 1：
  输入：
  grid = [[1,0,0,0],[1,1,1,0]]
  hits = [[1,0]]
  输出: [2]
  解释:
  如果我们消除(1, 0)位置的砖块, 在(1, 1) 和(1, 2) 的砖块会落下。所以我们应该返回2。
  示例 2：
  输入：
  grid = [[1,0,0,0],[1,1,0,0]]
  hits = [[1,1],[1,0]]
  输出：[0,0]
  解释：
  当我们消除(1, 0)的砖块时，
  (1, 1)的砖块已经由于上一步消除而消失了。
  所以每次消除操作不会造成砖块落下。注意(1, 0)砖块不会记作落下的砖块。
  注意:

  网格的行数和列数的范围是[1, 200]。
  消除的数字不会超过网格的区域。
  可以保证每次的消除都不相同，并且位于网格的内部。
  一个消除的位置可能没有砖块，如果这样的话，就不会有砖块落下。
 */

const UnionFind = require('./union-find');

/**
 * @param {number[][]} grid
 * @param {number[][]} hits
 * @return {number[]}
 */
const hitBricks = (grid, hits) => {
  const {length} = hits;
  const m = grid.length;
  if (m === 0) return Array(length).fill(0);
  const n = grid[0].length;
  if (n === 0) return Array(length).fill(0);

  const near = {
    up: [-1],
    right: [-1],
    down: [-1],
    left: [-1],
  };
  let count = 1; // 砖块的数量, 顶部整体算作一块
  const map = Array(m + 1);
  map[0] = Array(n + 1).fill(0);
  for (let i = 1; i <= m; i += 1) {
    map[i] = Array(n + 1).fill(-1);
    for (let j = 1; j <= n; j += 1) {
      if (grid[i - 1][j - 1]) {
        map[i][j] = count;
        near.up[count] = map[i - 1][j];
        near.left[count] = map[i][j - 1];
        near.right[map[i][j - 1]] = count;
        near.down[map[i - 1][j]] = count;
        count += 1;
      }
    }
  }
  for (let i = 0; i < count; i += 1) {
    for (let d of ['up', 'right', 'down', 'left']) {
      if (near[d][i] === undefined) near[d][i] = -1;
    }
  }

  // 按需要敲掉的砖块编号列表
  const _hits = new Set(hits.map(([r, c], i) => map[r + 1][c + 1]));

  // 按需要敲掉的砖块编号列表
  const uf = new UnionFind(count);
  for (let i = 1; i <= m; i += 1) {
    for (let j = 1; j <= n; j += 1) {
      if (-1 === map[i][j] || _hits.has(map[i][j])) continue;
      if (-1 < map[i - 1][j] && !_hits.has(map[i - 1][j])) {
        // 和上面的结合
        uf.union(map[i - 1][j], map[i][j]);
      }

      if (-1 < map[i][j - 1] && !_hits.has(map[i][j - 1])) {
        // 和左面的结合
        uf.union(map[i][j - 1], map[i][j]);
      }
    }
  }

  const recovery = curr => {
    for (const d of ['up', 'right', 'down', 'left']) {
      if (near[d][curr] !== -1 && !_hits.has(near[d][curr])) {
        uf.union(near[d][curr], curr);
      }
    }
  };

  const ans = Array(length).fill(0);
  for (let k = length - 1; 0 <= k; k -= 1) {
    const curr = map[hits[k][0] + 1][hits[k][1] + 1];
    _hits.delete(curr);
    if (curr === -1) {
      ans[k] = 0;
      continue;
    }

    const falls = [];
    for (let i = 1; i < count; i += 1) {
      if (!uf.isConnected(0, i)) falls.push(i);
    }

    ans[k] = falls.length;
    // restore union relation
    recovery(curr);
  }

  // 统计前i个被敲击的砖块有几个是存在的
  const stats = Array(length).fill(0);
  stats[0] = map[hits[0][0] + 1][hits[0][1] + 1] !== -1 ? 1 : 0;
  for (let i = 1; i < length; i += 1) {
    stats[i] =
      stats[i - 1] + (map[hits[i][0] + 1][hits[i][1] + 1] !== -1 ? 1 : 0);
  }
  console.log(ans);
  console.log(stats);
  let normal = 0;
  for (let i = 0; i < length; i += 1) {
    if (ans[i]) ans[i] -= stats[i]; // minus hit bricks

    ans[i] -= normal;
    if (0 < ans[i] && length - i - 1 < ans[i]) {
      normal += ans[i] - (length - i - 1);
    }
  }

  return ans;
};

console.log(
  hitBricks(
    [
      [0, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1],
      [0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      [1, 3],
      [3, 5],
      [0, 3],
      [3, 3],
      [1, 1],
      [4, 2],
      [1, 0],
      [3, 0],
      [4, 5],
      [2, 1],
      [4, 4],
      [4, 0],
      [2, 4],
      [2, 5],
      [3, 4],
      [0, 5],
      [0, 4],
      [3, 2],
      [1, 5],
      [4, 1],
      [2, 2],
      [0, 2],
    ],
  ),
);
/*
console.log(
  hitBricks(
    [[1], [1], [1], [1], [1]],
    [[3, 0], [4, 0], [1, 0], [2, 0], [0, 0]],
  ),
);
console.log(
  hitBricks(
    [[1, 1, 1], [0, 1, 0], [0, 0, 0]],
    [[0, 2], [2, 0], [0, 1], [1, 2]],
  ),
);
console.log(hitBricks([[1, 0, 1], [0, 0, 1]], [[1, 0], [0, 0]]));
console.log(hitBricks([[1, 0, 1], [1, 1, 1]], [[0, 0], [0, 2], [1, 1]]));
console.log(hitBricks([[1, 0, 0, 0], [1, 1, 1, 0]], [[1, 0]]));
console.log(hitBricks([[1, 0, 0, 0], [1, 1, 0, 0]], [[1, 1], [1, 0]]));
*/

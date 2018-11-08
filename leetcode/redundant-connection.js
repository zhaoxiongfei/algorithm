// https://leetcode-cn.com/problems/redundant-connection/description/
// No 684. 冗余连接

/**
  在本问题中, 树指的是一个连通且无环的无向图。

  输入一个图，该图由一个有着N个节点 (节点值不重复1, 2, ..., N) 的树及一条附加的边构成。
  附加的边的两个顶点包含在1到N中间，这条附加的边不属于树中已存在的边。

  结果图是一个以边组成的二维数组。每一个边的元素是一对[u, v] ，满足 u < v，表示连接顶点u 和v的无向图的边。

  返回一条可以删去的边，使得结果图是一个有着N个节点的树。如果有多个答案，则返回二维数组中最后出现的边。
  答案边 [u, v] 应满足相同的格式 u < v。

  示例 1：

  输入: [[1,2], [1,3], [2,3]]
  输出: [2,3]
  解释: 给定的无向图为:
    1
   / \
  2 - 3
  示例 2：

  输入: [[1,2], [2,3], [3,4], [1,4], [1,5]]
  输出: [1,4]
  解释: 给定的无向图为:
  5 - 1 - 2
      |   |
      4 - 3
  注意:

  输入的二维数组大小在 3 到 1000。
  二维数组中的整数在1到N之间，其中N是输入数组的大小。
 */
function Node(val) {
  this.val = val;
  this.next = null;
  this.status = "undiscovery";
}

// DFS
const getBackForwardEdge = (vertex, v, matrix, count, ps) => {
  ps.push(v.val);
  // 设置为已发现
  v.status = "discovery";
  v.dtime = count();
  for (let i = 1; i < matrix[v.val].length; i += 1) {
    if (i === v.val || matrix[v.val][i] === 0) continue;
    const neighbor = vertex[i];
    if (neighbor.status === "undiscovery") {
      neighbor.parent = v.val;
      if (getBackForwardEdge(vertex, neighbor, matrix, count, ps)) return true;
      ps.pop();
    } else if (v.parent !== i) {
      ps.push(neighbor.val);
      return true;
    }
  }
  v.status = "visited";
  v.ftime = count();
  return false;
};

const getCount = init => {
  let curr = init;
  return () => {
    curr += 1;
    return curr;
  };
};
/**
 * @param {number[][]} edges
 * @return {number[]}
 */
// 思路: 构建邻接矩阵，BFS/DFS 找到环状结构，把环状结构所有节点返回
const findRedundantConnection = edges => {
  const matrix = [];
  const vertex = [];
  const n = Math.max(...[].concat(...edges));
  for (let i = 1; i <= n; i += 1) {
    vertex[i] = new Node(i);
    matrix[i] = Array(n + 1).fill(0);
  }
  for (const [i, j] of edges) {
    matrix[i][j] = 1;
    matrix[j][i] = 1;
  }

  const ps = [];
  getBackForwardEdge(vertex, vertex[1], matrix, getCount(0), ps);
  const last = ps.pop();
  const set = new Set(ps.slice(ps.indexOf(last)));
  for (let i = edges.length - 1; i >= 0; i -= 1) {
    const [a, b] = edges[i];
    if (set.has(a) && set.has(b)) return [a, b];
  }
  return [];
};

console.log(
  findRedundantConnection([
    [2, 7],
    [7, 8],
    [3, 6],
    [2, 5],
    [6, 8],
    [4, 8],
    [2, 8],
    [1, 8],
    [7, 10],
    [3, 9]
  ])
);
// console.log(findRedundantConnection([[1, 4], [3, 4], [1, 3], [1, 2], [4, 5]]));
// console.log(findRedundantConnection([[1, 2], [1, 3], [2, 3]]));
// console.log(findRedundantConnection([[1, 2], [2, 3], [3, 4], [1, 4], [1, 5]]));

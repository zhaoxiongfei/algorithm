// https://leetcode-cn.com/problems/redundant-connection-ii/description/
// No 685. 冗余连接II

/**
  在本问题中，有根树指满足以下条件的有向图。该树只有一个根节点，所有其他节点都是该根节点的后继。
  每一个节点只有一个父节点，除了根节点没有父节点。

  输入一个有向图，该图由一个有着N个节点 (节点值不重复1, 2, ..., N) 的树及一条附加的边构成。
  附加的边的两个顶点包含在1到N中间，这条附加的边不属于树中已存在的边。

  结果图是一个以边组成的二维数组。 每一个边 的元素是一对 [u, v]，用以表示有向图中连接顶点 u and v和顶点的边，其中父节点u是子节点v的一个父节点。

  返回一条能删除的边，使得剩下的图是有N个节点的有根树。若有多个答案，返回最后出现在给定二维数组的答案。

  示例 1:

  输入: [[1,2], [1,3], [2,3]]
  输出: [2,3]
  解释: 给定的有向图如下:
    1
   / \
  v   v
  2-->3
  示例 2:

  输入: [[1,2], [2,3], [3,4], [4,1], [1,5]]
  输出: [4,1]
  解释: 给定的有向图如下:
  5 <- 1 -> 2
       ^    |
       |    v
       4 <- 3
  注意:

  二维数组大小的在3到1000范围内。
  二维数组中的每个整数在1到N之间，其中 N 是二维数组的大小。
 */

const parent = Symbol("parent");
const find = Symbol("find");

/**
 * UnionFind 并查集类
 * @class
 * @param {Number} size 集合规模
 * @return {UnionFind} Instance
 */
class UnionFind {
  /** Create a UnionFind instance */
  constructor(size) {
    this[parent] = Array(size);
    for (let i = 0; i < size; i += 1) {
      this[parent][i] = i;
    }
  }

  /**
   * 获取数据长度/大小
   * @this.O(1)
   * @space O(1)
   *
   * @return {number}
   */
  get size() {
    return this[parent].length;
  }

  /**
   * 查找p所属的集合编号
   * @param {Number} p
   * @time O(log*N)
   * @space O(1);
   *
   * @return {Number}
   */
  [find](p) {
    if (p !== this[parent][p]) {
      this[parent][p] = this[find](this[parent][p]);
    }
    return this[parent][p];
  }

  /**
   * 链接两个元素
   * @param {Number} p
   * @param {Number} q
   * @time O(log*N)
   * @space O(1);
   *
   * @return {void}
   */
  union(p, q) {
    const pP = this[find](p);
    const qP = this[find](q);
    if (pP === qP) return;
    this[parent][pP] = qP;
  }

  /**
   * 判断两个元素是否相连
   * @param {Number} p
   * @param {Number} q
   * @time O(logN)
   * @space O(1)
   *
   * @return {Boolean}
   */
  isConnected(p, q) {
    return this[find](p) === this[find](q);
  }
}

// 思路: 并查集解决问题
const findRedundantDirectedConnection = edges => {
  const { length } = edges;

  // 如果找到两个点同时指向一个点的情况，答案肯定是其中之一
  const sameTarget = [];
  const map = new Map();
  for (const x of edges) {
    if (map.get(x[1])) {
      sameTarget[0] = map.get(x[1]);
      sameTarget[1] = x;
      break;
    } else {
      map.set(x[1], x);
    }
  }

  const uf = new UnionFind(length + 1);
  let ans; // 保存答案，可以删除的边
  for (const x of edges) {
    if (sameTarget.includes(x)) continue;
    if (uf.isConnected(x[0], x[1])) {
      ans = x;
    } else {
      uf.union(x[0], x[1]);
    }
  }
  if (sameTarget.length) {
    for (const x of sameTarget) {
      if (uf.isConnected(x[0], x[1])) {
        ans = x;
      } else {
        uf.union(x[0], x[1]);
      }
    }
  }

  return ans;
};

console.log(findRedundantDirectedConnection([[1, 2], [1, 3], [2, 3]]));
console.log(findRedundantDirectedConnection([[2, 1], [3, 1], [4, 2], [1, 4]]));
console.log(
  findRedundantDirectedConnection([[1, 4], [3, 4], [1, 3], [1, 2], [4, 5]])
);
console.log(
  findRedundantDirectedConnection([[1, 2], [2, 3], [3, 4], [4, 1], [1, 5]])
);

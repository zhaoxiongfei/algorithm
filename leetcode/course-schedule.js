// https://leetcode-cn.com/problems/course-schedule/description/
// No 207. 课程表

/**
  现在你总共有 n 门课需要选，记为 0 到 n-1。

  在选修某些课程之前需要一些先修课程。 例如，想要学习课程 0 ，你需要先完成课程 1 ，我们用一个匹配来表示他们: [0,1]

  给定课程总量以及它们的先决条件，判断是否可能完成所有课程的学习？

  示例 1:

  输入: 2, [[1,0]]
  输出: true
  解释: 总共有 2 门课程。学习课程 1 之前，你需要完成课程 0。所以这是可能的。
  示例 2:

  输入: 2, [[1,0],[0,1]]
  输出: false
  解释: 总共有 2 门课程。学习课程 1 之前，你需要先完成课程 0；并且学习课程 0 之前，你还应先完成课程 1。这是不可能的。
  说明:

  输入的先决条件是由边缘列表表示的图形，而不是邻接矩阵。详情请参见图的表示法。
  你可以假定输入的先决条件中没有重复的边。
  提示:

  这个问题相当于查找一个循环是否存在于有向图中。如果存在循环，则不存在拓扑排序，因此不可能选取所有课程进行学习。
  通过 DFS 进行拓扑排序 - 一个关于Coursera的精彩视频教程（21分钟），介绍拓扑排序的基本概念。
  拓扑排序也可以通过 BFS 完成。
 */

function Node(val) {
  this.val = val;
  this.next = null;
  this.status = "undiscovery";
}

// DFS
const hasCycle = (vertex, matrix, v, count) => {
  v.status = "discovery";
  v.dtime = count();
  for (let i = 0; i < matrix[v.val].length; i += 1) {
    if (i === v.val || matrix[v.val][i] === 0) continue;
    const neighbor = vertex[i];
    if (neighbor.status === "undiscovery") {
      if (hasCycle(vertex, matrix, neighbor, count)) return true;
    } else if (neighbor.status === "discovery") {
      // 深度搜索的过程中，未结束的顶点，刚被发现，说明是当前顶点的祖先
      // 形成的环状结构
      return true;
    }
  }
  v.ftime = count();
  v.status = "visited";
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
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
// 思路: 构建邻接矩阵，DFS图，看看是否存在环
const canFinish = (numCourses, prerequisites) => {
  const vertex = [];
  const matrix = [];
  for (let i = 0; i < numCourses; i += 1) {
    vertex.push(new Node(i));
    matrix.push(Array(numCourses).fill(0));
  }
  for (const [tail, head] of prerequisites) matrix[tail][head] = 1;

  const count = getCount(0);
  for (const v of vertex) {
    if (vertex.status === "visited") continue;
    if (hasCycle(vertex, matrix, v, count)) {
      // return false;
    }
  }
  console.log(vertex);
  console.log(matrix);
  return true;
};

console.log(canFinish(3, [[1, 0], [2, 1]]));

// https://leetcode-cn.com/problems/possible-bipartition/
// No 886. 可能的二分法

/**
  给定一组 N 人（编号为 1, 2, ..., N）， 我们想把每个人分进任意大小的两组。

  每个人都可能不喜欢其他人，那么他们不应该属于同一组。

  形式上，如果 dislikes[i] = [a, b]，表示不允许将编号为 a 和 b 的人归入同一组。

  当可以用这种方法将每个人分进两组时，返回 true；否则返回 false。

  示例 1：

  输入：N = 4, dislikes = [[1,2],[1,3],[2,4]]
  输出：true
  解释：group1 [1,4], group2 [2,3]
  示例 2：

  输入：N = 3, dislikes = [[1,2],[1,3],[2,3]]
  输出：false
  示例 3：

  输入：N = 5, dislikes = [[1,2],[2,3],[3,4],[4,5],[1,5]]
  输出：false

  提示：

  1 <= N <= 2000
  0 <= dislikes.length <= 10000
  1 <= dislikes[i][j] <= N
  dislikes[i][0] < dislikes[i][1]
  对于 dislikes[i] == dislikes[j] 不存在 i != j
 */

/**
 * @param {number} N
 * @param {number[][]} dislikes
 * @return {boolean}
 */
const possibleBipartition = (N, dislikes) => {
  const list = Array(N + 1);
  for (let i = 0; i <= N; i += 1) list[i] = [];

  for (const x of dislikes) {
    list[x[0]].push(x[1]);
    list[x[1]].push(x[0]);
  }

  const colors = Array(N + 1).fill(-1);

  const dfs = (i, color) => {
    if (colors[i] !== -1) return colors[i] === color; // 着色不一致，返回失败
    colors[i] = color; // 着色
    for (const x of list[i]) {
      // 异类着相对的色
      if (!dfs(x, color ^ 1)) return false;
    }
    return true;
  };

  for (let i = 1; i <= N; i += 1) {
    if (colors[i] === -1 && !dfs(i, 0)) return false;
  }

  return true;
};

console.log(possibleBipartition(4, [[1, 2], [1, 3], [2, 4]]));
/*
console.log(possibleBipartition(3, [[1, 2], [1, 3], [2, 3]]));
console.log(possibleBipartition(5, [[1, 2], [2, 3], [3, 4], [4, 5], [1, 5]]));
*/

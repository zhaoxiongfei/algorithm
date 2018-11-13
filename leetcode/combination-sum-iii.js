// https://leetcode-cn.com/problems/combination-sum-iii/description/
// No 216. 组合总和 III

/**
  题目描述提示帮助提交记录社区讨论阅读解答
  找出所有相加之和为 n 的 k 个数的组合。组合中只允许含有 1 - 9 的正整数，并且每种组合中不存在重复的数字。

  说明：

  所有数字都是正整数。
  解集不能包含重复的组合。
  示例 1:

  输入: k = 3, n = 7
  输出: [[1,2,4]]
  示例 2:

  输入: k = 3, n = 9
  输出: [[1,2,6], [1,3,5], [2,3,4]]
 */
const helper = (pos, k, n, solution, solutions) => {
  if (k === 0) {
    if (n === 0) solutions.push(solution.slice());
    return;
  }
  for (let i = pos; i <= 9; i += 1) {
    solution.push(i);
    helper(i + 1, k - 1, n - i, solution, solutions);
    solution.pop();
  }
};
/**
 * @param {number} k
 * @param {number} n
 * @return {number[][]}
 */
const combinationSum3 = (k, n) => {
  if (k > 9) return [];
  if (n > 45) return [];
  const solutions = [];
  helper(1, k, n, [], solutions);

  return solutions;
};

console.log(combinationSum3(3, 9));
console.log(combinationSum3(3, 15));

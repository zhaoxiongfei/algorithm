// https://leetcode-cn.com/problems/n-queens/description/
// n 的皇后放入 n * n 个格子中，每行，每列有且仅有一个，每个皇后的两条对角线也不能存在其他皇后

/**
 * @param {number} n
 * @return {string[][]}
 */
const solveNQueens = n => {
  const solutions = [];
  const tryStack = [];

  const init = [];
  for (let i = 0; i < n; i += 1) init.push(i);

  // 依次将第一个皇后的可选情况压入待尝试的栈
  for (let i = 0; i < n; i += 1) tryStack.push([i]);
  // 逐个尝试栈里的选项，尝试的过程中可能会有新的情况继续压入栈内
  // while (tryStack.length) {
  // 数组长度超过一定限度后 shift变的极度缓慢
  for (let x = 0; x < tryStack.length; x += 1) {
    // const solution = tryStack.shift();
    const solution = tryStack[x];
    const { length } = solution;
    if (length === n) {
      // 满足条件压入结果
      solutions.push(solution);
      continue;
    }
    // 下一个皇后可能的列位置序号
    const options = new Set(init);
    // 依次计算每一个已压入的选项，操作后续的可选项目
    for (let i = 0; i < length; i += 1) {
      const col = solution[i];
      options.delete(col); // 删除同列的
      options.delete(col + length - i); // 删除主对角线的
      options.delete(col - length + i); // 删除次对角线的
    }
    // const options = getNextOptions(solution, n);
    for (const option of options) {
      // 这个只能选择这个选项，压入等待后续继续监测
      const newSolution = solution.slice();
      newSolution.push(option);
      // 不满足条件压入待尝试栈
      tryStack.push(newSolution);
    }
    // if (options.size) console.log("tryStack-length: %d", tryStack.length);
  }

  return solutions.length;
};

console.log(solveNQueens(12));

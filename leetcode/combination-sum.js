// https://leetcode-cn.com/problems/combination-sum/description/

const resolve = (candidates, start, target, solution, solutions) => {
  if (target < 0) return;
  if (target === 0) {
    solutions.push([].concat(solution));
    return;
  }

  for (let i = start; i < candidates.length; i += 1) {
    solution.push(candidates[i]);
    resolve(candidates, i, target - candidates[i], solution, solutions);
    solution.pop();
  }
};

/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
const combinationSum = (candidates, target) => {
  const solutions = [];
  resolve(candidates, 0, target, [], solutions);

  return solutions;
};

console.log(combinationSum([2, 3, 6, 7], 7));
console.log(combinationSum([2, 3, 5], 8));

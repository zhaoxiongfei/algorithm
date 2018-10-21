// https://leetcode-cn.com/problems/combination-sum-ii/description/

const resolve = (candidates, start, target, solution, solutions) => {
  if (target < 0) return;
  if (target === 0) {
    solutions.add(solution.join(" "));
    return;
  }

  for (let i = start; i < candidates.length; i += 1) {
    solution.push(candidates[i]);
    resolve(candidates, i + 1, target - candidates[i], solution, solutions);
    solution.pop();
  }
};

/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
const combinationSum = (candidates, target) => {
  candidates.sort((a, b) => a - b);
  const solutions = new Set();
  resolve(candidates, 0, target, [], solutions);

  return Array.from(solutions).map(x => x.split(" ").map(i => i | 0));
};

console.log(combinationSum([2, 3, 6, 7], 7));
console.log(combinationSum([2, 3, 5], 8));
console.log(combinationSum([10, 1, 2, 7, 6, 1, 5], 8));

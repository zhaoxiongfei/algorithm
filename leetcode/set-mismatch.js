// https://leetcode-cn.com/problems/set-mismatch/submissions/
// No 645. 错误的集合

/**
 * @param {number[]} nums
 * @return {number[]}
 */
const findErrorNums = nums => {
  const ans = [];
  const set = new Set();
  for (const num of nums) {
    if (set.has(num)) ans[0] = num;
    set.add(num);
  }

  for (let i = 1; i < nums.length + 1; i += 1) {
    if (!set.has(i)) {
      ans[1] = i;
      break;
    }
  }

  return ans;
};

console.log(findErrorNums([3, 2, 3, 4, 6, 5]));
console.log(findErrorNums([1, 5, 3, 2, 2, 7, 6, 4, 8, 9]));

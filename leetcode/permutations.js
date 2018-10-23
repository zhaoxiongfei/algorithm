// https://leetcode-cn.com/problems/permutations/description/
//
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const permute = nums => {
  if (nums.length === 1) return [nums];
  if (nums.length < 3) return [nums, [nums[1], nums[0]]];
  const combination = [];
  for (let i = 0; i < nums.length; i += 1) {
    const fixed = nums[i]; // 固定的数字
    if (i > 0) {
      nums[i] = nums[0];
      nums[0] = fixed;
    }
    const res = permute(nums.slice(1));
    res.forEach(x => {
      x.unshift(fixed);
      combination.push(x);
    });
  }
  return combination;
};

console.log(permute([1, 2, 3]));

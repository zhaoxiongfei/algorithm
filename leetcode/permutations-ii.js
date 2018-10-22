/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const permuteUnique = nums => {
  nums.sort((a, b) => a - b);

  const { length } = nums;
  if (length === 1) return [nums];
  if (length === 2) {
    if (nums[0] === nums[1]) return [nums];
    return [nums, [nums[1], nums[0]]];
  }

  const combinations = [];
  for (let i = 0; i < length; i += 1) {
    if (nums[i] === nums[i + 1]) continue;
    const fixed = nums[i];
    if (i > 0) {
      nums[i] = nums[0];
      nums[0] = fixed;
    }
    const res = permuteUnique(nums.slice(1));
    res.forEach(x => {
      x.unshift(fixed);
      combinations.push(x);
    });
  }
  return combinations;
};

console.log(permuteUnique([2, 2, 1, 1]));

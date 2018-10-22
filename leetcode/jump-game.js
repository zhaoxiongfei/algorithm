// https://leetcode-cn.com/problems/jump-game/description/

/**
 * @param {number[]} nums
 * @return {boolean}
 */
const canJump = nums => {
  if (nums.length === 0) return true;
  let reached = 0;
  for (let i = 0; i < nums.length; i += 1) {
    const num = nums[i];
    if (reached <= i && num === 0) return false;
    if (nums[i] + i > reached) reached = nums[i] + i;
    if (reached >= nums.length - 1) return true;
  }

  return true;
};

console.log(canJump([2, 0, 0]));
console.log(canJump([0, 2, 3]));
console.log(canJump([2, 0, 2, 3]));

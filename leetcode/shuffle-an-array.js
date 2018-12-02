// https://leetcode-cn.com/problems/shuffle-an-array/description/
// No 384. 打乱数组

/**
  打乱一个没有重复元素的数组。

  示例:

  // 以数字集合 1, 2 和 3 初始化数组。
  int[] nums = {1,2,3};
  Solution solution = new Solution(nums);

  // 打乱数组 [1,2,3] 并返回结果。任何 [1,2,3]的排列返回的概率应该相同。
  solution.shuffle();

  // 重设数组到它的初始状态[1,2,3]。
  solution.reset();

  // 随机返回数组[1,2,3]打乱后的结果。
  solution.shuffle();
 */

/**
 * @param {number[]} nums
 */
function Solution(nums) {
  const { length } = nums;
  const origin = nums.slice();

  /**
   * Resets the array to its original configuration and return it.
   * @return {number[]}
   */
  const reset = () => origin;

  /**
   * Returns a random shuffling of the array.
   * @return {number[]}
   */
  const shuffle = () => {
    for (let i = 0; i < length; i += 1) {
      const index = (Math.random() * length) | 0;
      if (index === i) continue;
      const t = nums[i];
      nums[i] = nums[index];
      nums[index] = t;
    }

    return nums;
  };

  return { reset, shuffle };
}

/**
 * Your Solution object will be instantiated and called as such:
 * var obj = Object.create(Solution).createNew(nums)
 * var param_1 = obj.reset()
 * var param_2 = obj.shuffle()
 */

const solution = new Solution([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
console.log(solution.shuffle());
console.log(solution.shuffle());
console.log(solution.reset());

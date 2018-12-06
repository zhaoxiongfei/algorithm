// https://leetcode-cn.com/problems/random-pick-index/description/
// No 398. 随机数索引

/**
  给定一个可能含有重复元素的整数数组，要求随机输出给定的数字的索引。 您可以假设给定的数字一定存在于数组中。

  注意：
  数组大小可能非常大。 使用太多额外空间的解决方案将不会通过测试。

  示例:

  int[] nums = new int[] {1,2,3,3,3};
  Solution solution = new Solution(nums);

  // pick(3) 应该返回索引 2,3 或者 4。每个索引的返回概率应该相等。
  solution.pick(3);

  // pick(1) 应该返回 0。因为只有nums[0]等于1。
  solution.pick(1);
 */

/**
 * @param {number[]} nums
 */
function Solution(nums) {
  const { length } = nums;

  const map = [];
  for (let i = 0; i < length; i += 1) {
    if (!map[nums[i]]) map[nums[i]] = [];
    map[nums[i]].push(i);
  }

  /**
   * @param {number} target
   * @return {number}
   */
  const pick = target => map[target][(Math.random() * map[target].length) | 0];

  return { pick };
}

/**
 * Your Solution object will be instantiated and called as such:
 * var obj = Object.create(Solution).createNew(nums)
 * var param_1 = obj.pick(target)
 */

const solution = new Solution([1, 2, 3, 3, 3]);
console.log(solution.pick(3));
console.log(solution.pick(3));
console.log(solution.pick(3));
console.log(solution.pick(1));

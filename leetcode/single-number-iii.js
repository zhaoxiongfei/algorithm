// https://leetcode-cn.com/problems/single-number-iii/description/
// No 260. 只出现一次的数字 III

/**
  给定一个整数数组 nums，其中恰好有两个元素只出现一次，其余所有元素均出现两次。 找出只出现一次的那两个元素。

  示例 :

  输入: [1,2,1,3,2,5]
  输出: [3,5]
  注意：

  结果输出的顺序并不重要，对于上面的例子， [5, 3] 也是正确答案。
  你的算法应该具有线性时间复杂度。你能否仅使用常数空间复杂度来实现？
 */

/**
 * @param {number[]} nums
 * @return {number[]}
 */
const singleNumber = nums => {
  let t = 0;
  for (const n of nums) t ^= n;

  const set = new Set(nums);
  for (const n of set) {
    if (set.has(t ^ n)) {
      return [n, t ^ n];
    }
  }
  return null;
};

console.log(singleNumber([1, 2, 1, 3, 2, 5]));

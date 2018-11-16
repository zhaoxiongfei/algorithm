// https://leetcode-cn.com/problems/product-of-array-except-self/description/
// No 238. 除自身以外数组的乘积

/**
  给定长度为 n 的整数数组 nums，其中 n > 1，返回输出数组 output ，其中 output[i] 等于 nums 中除 nums[i] 之外其余各元素的乘积。

  示例:

  输入: [1,2,3,4]
  输出: [24,12,8,6]
  说明: 请不要使用除法，且在 O(n) 时间复杂度内完成此题。

  进阶：
  你可以在常数空间复杂度内完成这个题目吗？（ 出于对空间复杂度分析的目的，输出数组不被视为额外空间。）
 */

/**
 * @param {number[]} nums
 * @return {number[]}
 */
// 思路: 求出全体乘积，之后逐一除自身
// 上面的思路有问题，遇到0就废了，所有数的乘积为0了。
// 两次循环，第一次从左到右，第二次从右到左,之后再一次合并二者
const productExceptSelf = nums => {
  const { length } = nums;
  const ans = Array(length).fill(1);
  for (let i = 1; i < length; i += 1) {
    ans[i] = ans[i - 1] * nums[i - 1];
  }
  for (let i = length - 2; i >= 0; i -= 1) {
    ans[i] *= nums[i + 1];
    nums[i] *= nums[i + 1];
  }
  return ans;
};

console.log(productExceptSelf([1, 2, 3, 4]));

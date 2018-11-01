// https://leetcode-cn.com/problems/single-number-ii/description/
// No. 137

/**
 给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现了三次。找出那个只出现了一次的元素。

 说明：

 你的算法应该具有线性时间复杂度。 你可以不使用额外空间来实现吗？

 示例 1:

 输入: [2,2,3,2]
 输出: 3
 示例 2:

 输入: [0,1,0,1,0,1,99]
 输出: 99
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
// 参考: https://blog.csdn.net/jiangxiewei/article/details/82227451
const singleNumber = nums => {
  let a = 0;
  let b = 0;
  for (const n of nums) {
    const t = (~a & b & n) + (a & ~b & ~n);
    b = (~a & ~b & n) + (~a & b & ~n);
    a = t;
  }
  return b;
};

const singleNumber2 = nums => {
  let a = 0;
  let b = 0;
  for (const n of nums) {
    b ^= n & ~a;
    a ^= n & ~b;
  }
  return b;
};

console.log(singleNumber([1, 1, 1, 2]));
console.log(singleNumber2([1, 2, 3, 1, 2, 1, 2]));

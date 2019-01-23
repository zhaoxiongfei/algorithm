// https://leetcode-cn.com/problems/wiggle-subsequence/
// No 376. 摆动序列

/**
  如果连续数字之间的差严格地在正数和负数之间交替，则数字序列称为摆动序列。
  第一个差（如果存在的话）可能是正数或负数。少于两个元素的序列也是摆动序列。

  例如， [1,7,4,9,2,5] 是一个摆动序列，因为差值 (6,-3,5,-7,3) 是正负交替出现的。
  相反, [1,4,7,2,5] 和 [1,7,4,5,5] 不是摆动序列，第一个序列是因为它的前两个差值都是正数，
  第二个序列是因为它的最后一个差值为零。

  给定一个整数序列，返回作为摆动序列的最长子序列的长度。
  通过从原始序列中删除一些（也可以不删除）元素来获得子序列，剩下的元素保持其原始顺序。

  示例 1:

  输入: [1,7,4,9,2,5]
  输出: 6
  解释: 整个序列均为摆动序列。
  示例 2:

  输入: [1,17,5,10,13,15,10,5,16,8]
  输出: 7
  解释: 这个序列包含几个长度为 7 摆动序列，其中一个可为[1,17,10,13,10,16,8]。
  示例 3:

  输入: [1,2,3,4,5,6,7,8,9]
  输出: 2
  进阶:
  你能否用 O(n) 时间复杂度完成此题?
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
const wiggleMaxLength = nums => {
  const { length } = nums;
  if (length < 2) return length;
  let up = 1;
  let down = 1;
  for (let i = 1; i < length; i += 1) {
    if (nums[i - 1] < nums[i]) {
      up = down + 1;
    }
    if (nums[i] < nums[i - 1]) {
      down = up + 1;
    }
  }

  return Math.max(up, down);
};

const wiggleMaxLength2 = nums => {
  const { length } = nums;
  if (length < 2) return length;
  let prev = nums[1] - nums[0];
  let ans = 1;

  if (prev) ans += 1;

  for (let i = 2; i < length; i += 1) {
    const curr = nums[i] - nums[i - 1];
    if ((0 <= prev && curr < 0) || (prev <= 0 && 0 < curr)) {
      ans += 1;
      prev = curr;
    }
  }

  return ans;
};

console.log(
  wiggleMaxLength2([
    33,
    53,
    12,
    64,
    50,
    41,
    45,
    21,
    97,
    35,
    47,
    92,
    39,
    0,
    93,
    55,
    40,
    46,
    69,
    42,
    6,
    95,
    51,
    68,
    72,
    9,
    32,
    84,
    34,
    64,
    6,
    2,
    26,
    98,
    3,
    43,
    30,
    60,
    3,
    68,
    82,
    9,
    97,
    19,
    27,
    98,
    99,
    4,
    30,
    96,
    37,
    9,
    78,
    43,
    64,
    4,
    65,
    30,
    84,
    90,
    87,
    64,
    18,
    50,
    60,
    1,
    40,
    32,
    48,
    50,
    76,
    100,
    57,
    29,
    63,
    53,
    46,
    57,
    93,
    98,
    42,
    80,
    82,
    9,
    41,
    55,
    69,
    84,
    82,
    79,
    30,
    79,
    18,
    97,
    67,
    23,
    52,
    38,
    74,
    15
  ])
);
console.log(wiggleMaxLength([3, 3, 3, 2, 5]));
console.log(wiggleMaxLength([0, 0]));
console.log(wiggleMaxLength([1, 2, 3, 4, 5, 6, 7, 8, 9]));
console.log(wiggleMaxLength([1, 17, 5, 10, 13, 15, 10, 5, 16, 8]));

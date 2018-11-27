// https://leetcode-cn.com/problems/counting-bits/description/
// No 338. 比特位计数

/**
  给定一个非负整数 num。对于 0 ≤ i ≤ num 范围中的每个数字 i ，计算其二进制数中的 1 的数目并将它们作为数组返回。

  示例 1:

  输入: 2
  输出: [0,1,1]
  示例 2:

  输入: 5
  输出: [0,1,1,2,1,2]
  进阶:

  给出时间复杂度为O(n*sizeof(integer))的解答非常容易。但你可以在线性时间O(n)内用一趟扫描做到吗？
  要求算法的空间复杂度为O(n)。
  你能进一步完善解法吗？要求在C++或任何其他语言中不使用任何内置函数（如 C++ 中的 __builtin_popcount）来执行此操作。
 */

/**
 * @param {number} num
 * @return {number[]}
 */
// 思路: 暴力求解
const countBits1 = num => {
  const dp = Array(num + 1).fill(0);
  for (let i = 0; i <= num; i += 1) {
    for (const ch of i.toString(2)) {
      if (ch === "1") dp[i] += 1;
    }
  }
  return dp;
};

// 思路: 智慧求解, 规律就是除去高位的 1 其余位置是在重复前面的
const countBits = num => {
  const dp = Array(num + 1);
  dp[0] = 0;
  let i = 1;
  let end = 1;
  let j = 0;
  while (i <= num) {
    if (j < end) {
      dp[i++] = dp[j++] + 1;
    } else {
      j = 0;
      end *= 2;
    }
  }

  return dp;
};

console.log(countBits1(16));
console.log(countBits(16));

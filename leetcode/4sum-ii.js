// https://leetcode-cn.com/problems/4sum-ii/
// No 454. 四数相加 II

/**
  给定四个包含整数的数组列表 A , B , C , D ,计算有多少个元组 (i, j, k, l) ，使得 A[i] + B[j] + C[k] + D[l] = 0。

  为了使问题简单化，所有的 A, B, C, D 具有相同的长度 N，且 0 ≤ N ≤ 500 。所有整数的范围在 -228 到 228 - 1 之间，最终结果不会超过 231 - 1 。

  例如:

  输入:
  A = [ 1, 2]
  B = [-2,-1]
  C = [-1, 2]
  D = [ 0, 2]

  输出:
  2

  解释:
  两个元组如下:
  1. (0, 0, 0, 1) -> A[0] + B[0] + C[0] + D[1] = 1 + (-2) + (-1) + 2 = 0
  2. (1, 1, 0, 0) -> A[1] + B[1] + C[0] + D[0] = 2 + (-1) + (-1) + 0 = 0
 */

/**
 * @param {number[]} A
 * @param {number[]} B
 * @param {number[]} C
 * @param {number[]} D
 * @return {number}
 */
// 思路: AB的和做一个hash表，CD的和做一个hash表
const fourSumCount = (A, B, C, D) => {
  const { length } = A;
  if (!length) return 0;
  const hash = {};
  for (let i = 0; i < length; i += 1) {
    for (let j = 0; j < length; j += 1) {
      const sum = A[i] + B[j];
      if (!hash[sum]) hash[sum] = 0;
      hash[sum] += 1;
    }
  }

  let count = 0;
  for (let i = 0; i < length; i += 1) {
    for (let j = 0; j < length; j += 1) {
      const target = 0 - C[i] - D[j];
      if (hash[target]) count += hash[target];
    }
  }

  return count;
};

const fourSumCount1 = (A, B, C, D) => {
  const { length } = A;
  if (!length) return 0;
  const hash = new Map();
  for (let i = 0; i < length; i += 1) {
    for (let j = 0; j < length; j += 1) {
      const sum = A[i] + B[j];
      if (!hash.get(sum)) {
        hash.set(sum, 1);
      } else {
        hash.set(sum, hash.get(sum) + 1);
      }
    }
  }

  let count = 0;
  for (let i = 0; i < length; i += 1) {
    for (let j = 0; j < length; j += 1) {
      const target = 0 - C[i] - D[j];
      if (hash.get(target)) count += hash.get(target);
    }
  }

  return count;
};

console.log(fourSumCount([1, 2], [-2, -1], [-1, 2], [0, 2]));
console.log(fourSumCount1([1, 2], [-2, -1], [-1, 2], [0, 2]));

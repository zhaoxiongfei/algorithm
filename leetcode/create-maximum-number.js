// https://leetcode-cn.com/problems/create-maximum-number/
// 321. 拼接最大数

/**
  给定长度分别为 m 和 n 的两个数组，其元素由 0-9 构成，表示两个自然数各位上的数字。
  现在从这两个数组中选出 k (k <= m + n) 个数字拼接成一个新的数，
  要求从同一个数组中取出的数字保持其在原数组中的相对顺序。

  求满足该条件的最大数。结果返回一个表示该最大数的长度为 k 的数组。

  说明: 请尽可能地优化你算法的时间和空间复杂度。

  示例 1:

  输入:
  nums1 = [3, 4, 6, 5]
  nums2 = [9, 1, 2, 5, 8, 3]
  k = 5
  输出:
  [9, 8, 6, 5, 3]
  示例 2:

  输入:
  nums1 = [6, 7]
  nums2 = [6, 0, 4]
  k = 5
  输出:
  [6, 7, 6, 0, 4]
  示例 3:

  输入:
  nums1 = [3, 9]
  nums2 = [8, 9]
  k = 3
  输出:
  [9, 8, 9]
 */

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k
 * @return {number[]}
 */
const maxNumber = (nums1, nums2, k) => {
  const m = nums1.length;
  const n = nums2.length;

  const getMaxNums = (nums, z) => {
    const max = [];
    let start = 0;
    while (max.length < z) {
      const end = nums.length - (z - max.length);
      let _max = -Infinity;
      for (let i = start; i <= end; i += 1) {
        if (_max < nums[i]) {
          _max = nums[i];
          start = i + 1;
        }
      }
      max.push(_max);
    }

    return max;
  };

  const gt = (n1, n2) => {
    const len = Math.max(n1.length, n2.length);
    for (let i = 0; i < len; i += 1) {
      if (n1[i] === undefined) return false;
      if (n2[i] === undefined) return true;
      if (n1[i] === n2[i]) continue;
      return n2[i] < n1[i];
    }
    return true;
  };

  const merge = (ns1, ns2) => {
    const ns = [];
    while (ns1.length && ns2.length) {
      if (ns1[0] < ns2[0]) {
        ns.push(ns2.shift());
      } else if (ns2[0] < ns1[0]) {
        ns.push(ns1.shift());
      } else if (gt(ns1, ns2)) {
        ns.push(ns1.shift());
      } else {
        ns.push(ns2.shift());
      }
    }
    while (ns1.length) ns.push(ns1.shift());
    while (ns2.length) ns.push(ns2.shift());

    return ns;
  };

  const solution = [];
  const z1 = Math.max(k - n, 0);
  const z2 = Math.min(m, k);
  for (let z = z1; z <= z2; z += 1)
    solution.push(merge(getMaxNums(nums1, z), getMaxNums(nums2, k - z)));

  let max = solution[0];
  for (let i = 1; i < solution.length; i += 1) {
    for (let j = 0; j < k; j += 1) {
      if (max[j] === solution[i][j]) continue;
      if (max[j] < solution[i][j]) max = solution[i];
      break;
    }
  }

  return max.join(" ");
};

console.log(
  maxNumber(
    [5, 0, 2, 1, 0, 1, 0, 3, 9, 1, 2, 8, 0, 9, 8, 1, 4, 7, 3],
    [7, 6, 7, 1, 0, 1, 0, 5, 6, 0, 5, 0],
    31
  )
);
console.log(maxNumber([2, 5, 6, 4, 4, 0], [7, 3, 8, 0, 6, 5, 7, 6, 2], 15));
console.log(maxNumber([8, 9], [3, 9], 3));
console.log(maxNumber([6, 7], [6, 0, 4], 5));
console.log(maxNumber([3, 4, 6, 5], [9, 1, 2, 5, 8, 3], 5));

// https://leetcode-cn.com/problems/permutation-sequence/description/
//
/**
 * @param {number} n
 * @param {number} k
 * @return {string}
 */

const fact = n => {
  if (!n) return 1;
  if (n === 1) return 1;
  return n * fact(n - 1);
};

/**
  给出集合 [1,2,3,…,n]，其所有元素共有 n! 种排列。

  按大小顺序列出所有排列情况，并一一标记，当 n = 3 时, 所有排列如下：

  思路: 这个题如果是完全排列之后找第k项显然不经济。但是我们可以借鉴那个排列思路
  就是从做到右逐个固定一个数字，所处位置不同略过的排列数就不同，那么第k项就是
  n1! + n2! + n3! + n4!.... 满足 n1 > n2 > n3 > n4
 */
const getPermutation = (n, k) => {
  let nums = "123456789".substr(0, n);

  let sequence = "";
  let diff = k - 1;
  for (let i = n - 1; i >= 0; i -= 1) {
    const factorial = fact(i);
    const index = parseInt(diff / factorial, 10);
    diff -= index * factorial;
    sequence += nums[index];
    nums = nums.replace(nums[index], ""); // 使用过的数字删除掉
  }

  return sequence;
};

console.log(getPermutation(4, 19));
console.log(getPermutation(3, 5));
console.log(getPermutation(2, 2));
console.log(getPermutation(3, 3));
console.log(getPermutation(4, 9));
console.log(getPermutation(9, 362666));

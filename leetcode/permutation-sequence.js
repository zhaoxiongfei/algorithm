// https://leetcode-cn.com/problems/permutation-sequence/description/
//
/**
 * @param {number} n
 * @param {number} k
 * @return {string}
 */

const factorial = (() => {
  const dict = {};

  const fact = n => {
    if (!n) return 0;
    if (dict[n] === undefined) {
      let val;
      if (n === 1) {
        val = 1;
      } else {
        val = n * fact(n - 1);
      }
      dict[n] = val;
    }
    return dict[n];
  };

  return n => {
    // 里面插入一个 0 这样索引值就等于 n
    const list = [0];
    for (let i = 1; i <= n; i += 1) list.push(fact(i));
    return list;
  };
})();

// 返回 k 由 1 ~ n 各阶乘数的组合方式, 由大到小
// @return [[num, count], ....];
const combine = (n, k) => {
  const solution = [];
  // 得到一个1 ~ n 的阶乘的顺序，由小到大
  const factorials = factorial(n);
  let diff = k; // 还差多少
  while (diff > 0) {
    for (let i = n; i > 0; i -= 1) {
      const value = factorials[i];
      if (diff >= value) {
        let count = 1;
        while ((count + 1) * value <= diff) count += 1;
        solution.push([i, count]);
        diff -= count * value;
        break;
      }
    }
  }

  return solution;
};

/**
  给出集合 [1,2,3,…,n]，其所有元素共有 n! 种排列。

  按大小顺序列出所有排列情况，并一一标记，当 n = 3 时, 所有排列如下：

  思路: 这个题如果是完全排列之后找第k项显然不经济。但是我们可以借鉴那个排列思路
  就是从做到右逐个固定一个数字，所处位置不同略过的排列数就不同，那么第k项就是
  n1! + n2! + n3! + n4!.... 满足 n1 > n2 > n3 > n4
 */
const getPermutation = (n, k) => {
  const nums = [];
  for (let i = 1; i <= n; i += 1) nums.push(i);

  // 计算里包含的 1 ~ n 的各数阶乘的数量和组合, 由大到小
  const combination = combine(n, k - 1);

  for (let i = 0; i < combination.length; i += 1) {
    // len n - len - 1交换那个数字索引
    // count 交换第几个
    // eg nums = [1, 2, 3, 4], len = 3, count = 2. 那么交换 1 <=> 3
    // eg nums = [1, 2, 3, 4], len = 2, count = 1. 那么交换 2 <=> 3
    const [len, count] = combination[i];
    const start = n - len - 1;
    const end = start + count;
    const tmp = nums[start];
    nums[start] = nums[end];
    nums[end] = tmp;
    // 重新按照升序整理(不是简单翻转)  start + 1 到 end 的数字
    for (let x = 1; x < end - start; x += 1) {
      const first = start + x;
      const t = nums[first];
      nums[first] = nums[end];
      nums[end] = t;
    }
  }

  return nums.join("");
};

console.log(getPermutation(4, 19));
console.log(getPermutation(3, 5));
console.log(getPermutation(2, 2));
console.log(getPermutation(3, 3));
console.log(getPermutation(4, 9));
console.log(getPermutation(9, 183568));

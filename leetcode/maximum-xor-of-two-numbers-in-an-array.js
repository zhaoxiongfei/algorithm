// https://leetcode-cn.com/problems/maximum-xor-of-two-numbers-in-an-array/description/
// No 421. 数组中两个数的最大异或值

/**
  给定一个非空数组，数组中元素为 a0, a1, a2, … , an-1，其中 0 ≤ ai < 231 。

  找到 ai 和aj 最大的异或 (XOR) 运算结果，其中0 ≤ i,  j < n 。

  你能在O(n)的时间解决这个问题吗？

  示例:

  输入: [3, 10, 5, 25, 2, 8]

  输出: 28

  解释: 最大的结果是 5 ^ 25 = 28.
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
// 解法1：暴力法 O(N²)
const findMaximumXOR = nums => {
  const { length } = nums;
  let max = -Infinity;
  for (let i = 0; i < length; i += 1) {
    for (let j = i + 1; j < length; j += 1) {
      if (max < (nums[i] ^ nums[j])) max = nums[i] ^ nums[j];
    }
  }

  return max;
};

// 利用掩码位运算求解 O(N)
const findMaximumXOR1 = nums => {
  let max = 0;
  let mask = 0;
  for (let i = 31; i >= 0; i -= 1) {
    mask |= 2 ** i;
    const set = new Set();
    for (const num of nums) set.add(num & mask);

    const tmp = max | (2 ** i);
    for (const pre of set) {
      if (set.has(tmp ^ pre)) {
        max = tmp;
        break;
      }
    }
  }

  return max;
};

// 利用trie 结构求解复杂度 O(32N) 渐进性等于 O(N)
const findMaximumXOR2 = nums => {
  let max = 0;

  const dfs = (root1, root2, depth, v) => {
    max = Math.max(max, v);
    if (depth === -1) return;
    let flag = false;
    if (root1.son[0] && root2.son[1]) {
      dfs(root1.son[0], root2.son[1], depth - 1, v | (1 << depth));
      flag = true;
    }
    if (root1.son[1] && root2.son[0]) {
      dfs(root1.son[1], root2.son[0], depth - 1, v | (1 << depth));
      flag = true;
    }

    if (!flag && root1.son[0] && root1.son[0]) {
      dfs(root1.son[0], root2.son[0], depth - 1, v);
    }
    if (!flag && root1.son[1] && root1.son[1]) {
      dfs(root1.son[1], root2.son[1], depth - 1, v);
    }
  };

  const node = () => ({ son: [null, null] });
  const root = node();
  for (const num of nums) {
    let now = root;
    for (let j = 1 << 30; j >= 1; j >>= 1) {
      const r = (num & j) > 0 ? 1 : 0;
      if (!now.son[r]) {
        now.son[r] = node();
      }
      now = now.son[r];
    }
  }

  dfs(root, root, 30, 0);

  return max;
};

console.log(findMaximumXOR([3, 10, 5, 25, 2, 8]));
console.log(findMaximumXOR1([3, 10, 5, 25, 2, 8]));
console.log(findMaximumXOR2([3, 10, 5, 25, 2, 8]));

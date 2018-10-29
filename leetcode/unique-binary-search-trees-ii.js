// https://leetcode-cn.com/problems/binary-tree-inorder-traversal/description/
//

/**
 * Definition for a binary tree node.
 */
function TreeNode(val) {
  this.val = val;
  this.left = null;
  this.right = null;
}

const merge = (val, ls, rs, list) => {
  if (!ls.length && !rs.length) {
    list.push(new TreeNode(val));
    return;
  }
  if (!ls.length) {
    for (let i = 0; i < rs.length; i += 1) {
      const root = new TreeNode(val);
      root.right = rs[i];
      list.push(root);
    }
  }
  if (!rs.length) {
    for (let i = 0; i < ls.length; i += 1) {
      const root = new TreeNode(val);
      root.left = ls[i];
      list.push(root);
    }
  }
  if (ls.length && rs.length) {
    for (let i = 0; i < ls.length; i += 1) {
      const left = ls[i];
      for (let j = 0; j < rs.length; j += 1) {
        const right = rs[j];
        const root = new TreeNode(val);
        root.left = left;
        root.right = right;
        list.push(root);
      }
    }
  }
};

const generate = nums => {
  const { length } = nums;
  if (!length) return [];

  const list = [];
  for (let i = 0; i < length; i += 1) {
    const ls = generate(nums.slice(0, i));
    const rs = generate(nums.slice(i + 1));
    merge(nums[i], ls, rs, list);
  }

  return list;
};

/**
 * @param {number} n
 * @return {TreeNode[]}
 */
// 思路: 采用类似于全排列的思路，逐个用某一数字做root，采用递归，降低规模
const generateTrees = n => {
  const nums = [];
  for (let i = 0; i < n; i += 1) nums[i] = i + 1;

  return generate(nums);
};

console.log(JSON.stringify(generateTrees(3), null, 2));

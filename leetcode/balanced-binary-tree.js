// https://leetcode-cn.com/problems/balanced-binary-tree/description/
const TreeNode = require("./binary-tree");
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
const maxDepth = (root, max = 0) => {
  if (!root) return max;
  return Math.max(maxDepth(root.left, max + 1), maxDepth(root.right, max + 1));
};

const minDepth = (root, min = 0) => {
  if (!root) return min;
  if (!root.left && !root.right) return min + 1;
  return Math.min(minDepth(root.left, min + 1), minDepth(root.right, min + 1));
};

/**
 * @param {TreeNode} root
 * @return {boolean}
 */
// 思路: 简单、直接、有效 递归，逐步减少规模
const isBalanced = root => {
  if (!root) return true;

  const leftMX = maxDepth(root.left);
  const rightMX = maxDepth(root.right);
  if (Math.abs(leftMX - rightMX) > 1) return false;
  return isBalanced(root.left) && isBalanced(root.right);
};

// 思路二: 获取数的最小深度和最大深度，差值不能大于 1, 这个思路是错误的，经不起推敲
const isBalanced2 = root => maxDepth(root) - minDepth(root) <= 1;

console.log(isBalanced(TreeNode.create([3, 9, 20, null, null, 15, 7])));
console.log(isBalanced2(TreeNode.create([3, 9, 20, null, null, 15, 7])));
console.log(isBalanced(TreeNode.create([1, 2, 2, 3, 3, null, null, 4, 4])));
console.log(isBalanced2(TreeNode.create([1, 2, 2, 3, 3, null, null, 4, 4])));

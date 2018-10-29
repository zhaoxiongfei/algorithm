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

/**
 * @param {TreeNode} root
 * @return {boolean}
 */
// 思路: 简单、直接、有效 递归，逐步减少规模
const isBalanced = root => {
  if (!root) return true;

  const leftMX = maxDepth(root.left);
  const rightMX = maxDepth(root.right);
  console.log(leftMX, rightMX);
  if (Math.abs(leftMX - rightMX) > 1) return false;
  return isBalanced(root.left) && isBalanced(root.right);
};

console.log(isBalanced(TreeNode.create([3, 9, 20, null, null, 15, 7])));
console.log(isBalanced(TreeNode.create([1, 2, 2, 3, 3, null, null, 4, 4])));

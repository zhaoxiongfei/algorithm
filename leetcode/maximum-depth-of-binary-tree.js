// https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/description/
const BTree = require("./binary-tree");
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
const maxDepth = (root, max = 0) => {
  if (!root) return max;
  return Math.max(maxDepth(root.left, max + 1), maxDepth(root.right, max + 1));
};

console.log(maxDepth(BTree.make([3, 9, 20, null, null, 15, 7])));

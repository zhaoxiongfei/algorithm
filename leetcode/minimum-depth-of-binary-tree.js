// https://leetcode-cn.com/problems/minimum-depth-of-binary-tree/description/
const TreeNode = require("./binary-tree");
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
const minDepth = (root, min = 0) => {
  if (!root) return min;
  if (!root.left && !root.right) return min + 1;
  if (!root.left) return minDepth(root.right, min + 1);
  if (!root.right) return minDepth(root.left, min + 1);
  return Math.min(minDepth(root.left, min + 1), minDepth(root.right, min + 1));
};

console.log(minDepth(TreeNode.create([1, 2])));
// console.log(minDepth(TreeNode.create([3, 9, 20, null, null, 15, 7])));

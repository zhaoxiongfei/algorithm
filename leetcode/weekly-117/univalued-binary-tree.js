const TreeNode = require("../binary-tree");
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

const dfs = (root, val) => {
  if (root.val !== val) return false;
  if (root.left && !dfs(root.left, val)) return false;
  if (root.right && !dfs(root.right, val)) return false;
  return true;
};
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
const isUnivalTree = root => {
  if (!root) return true;
  return dfs(root, root.val);
};

console.log(isUnivalTree(TreeNode.create([1, 1, 1, 1, 1, null, 1])));

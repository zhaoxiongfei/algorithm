// https://leetcode-cn.com/problems/binary-tree-paths/description/
// No 257. 二叉树的所有路径

/**
  给定一个二叉树，返回所有从根节点到叶子节点的路径。

  说明: 叶子节点是指没有子节点的节点。

  示例:

  输入:

     1
   /   \
  2     3
   \
    5

  输出: ["1->2->5", "1->3"]

  解释: 所有根节点到叶子节点的路径为: 1->2->5, 1->3
 */

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
 * @return {string[]}
 */
const binaryTreePaths = (root, path = [], paths = []) => {
  if (!root) return path;
  path.push(root.val);
  if (root.left) binaryTreePaths(root.left, path.slice(), paths);
  if (root.right) binaryTreePaths(root.right, path.slice(), paths);
  if (!root.left && !root.right) paths.push(path);
  return paths.map(x => x.join("->"));
};

console.log(binaryTreePaths(TreeNode.create([1, 2, 3, null, 5])));

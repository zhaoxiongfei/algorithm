// https://leetcode-cn.com/problems/sum-of-left-leaves/description/
// 404. 左叶子之和

/**
  计算给定二叉树的所有左叶子之和。

  示例：

      3
     / \
    9  20
      /  \
     15   7

  在这个二叉树中，有两个左叶子，分别是 9 和 15，所以返回 24
 */
const TreeNode = require("./binary-tree");
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
const traverse = (root, visit, type = null) => {
  if (!root) return;
  if (!root.left && !root.right) {
    if (type === "left") visit(root.val);
  }
  if (root.left) traverse(root.left, visit, "left");
  if (root.right) traverse(root.right, visit, "right");
};
/**
 * @param {TreeNode} root
 * @return {number}
 */
const sumOfLeftLeaves = root => {
  let sum = 0;
  traverse(root, val => {
    sum += val;
  });

  return sum;
};

console.log(sumOfLeftLeaves(TreeNode.create([3, 9, 20, null, null, 15, 7])));

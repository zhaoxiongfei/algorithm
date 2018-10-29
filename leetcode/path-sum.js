// https://leetcode-cn.com/problems/path-sum/description/
const TreeNode = require("./binary-tree");
// 给定一个二叉树和一个目标和，判断该树中是否存在根节点到叶子节点的路径，这条路径上所有节点值相加等于目标和。

// 说明: 叶子节点是指没有子节点的节点。

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} sum
 * @return {boolean}
 */
// 思路: 二叉树的问题，依然采用递归, 从根节点开始，目标和逐步减少
const hasPathSum = (root, sum) => {
  if (!root) return false;
  const target = sum - root.val;
  if (target === 0 && !root.left && !root.right) return true;
  return hasPathSum(root.left, target) || hasPathSum(root.right, target);
};

console.log(
  hasPathSum(
    TreeNode.create([5, 4, 8, 11, 12, 13, 4, 7, 2, null, null, null, 1]),
    22
  )
);

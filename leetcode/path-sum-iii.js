// https://leetcode-cn.com/problems/path-sum-iii/
// 437. 路径总和 III

/**
  给定一个二叉树，它的每个结点都存放着一个整数值。

  找出路径和等于给定数值的路径总数。

  路径不需要从根节点开始，也不需要在叶子节点结束，
  但是路径方向必须是向下的（只能从父节点到子节点）。

  二叉树不超过1000个节点，且节点数值范围是 [-1000000,1000000] 的整数。

  示例：

  root = [10,5,-3,3,2,null,11,3,-2,null,1], sum = 8

        10
       /  \
      5   -3
     / \    \
    3   2   11
   / \   \
  3  -2   1

  返回 3。和等于 8 的路径有:

  1.  5 -> 3
  2.  5 -> 2 -> 1
  3.  -3 -> 11
 */
const TreeNode = require("./binary-tree");
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
const dfs = (root, sum, curr = 0, count = [0]) => {
  if (!root) return count[0];
  if (curr + root.val === sum) count[0] += 1;
  if (root.left) dfs(root.left, sum, curr + root.val, count);
  if (root.right) dfs(root.right, sum, curr + root.val, count);

  return count[0];
};
/**
 * @param {TreeNode} root
 * @param {number} sum
 * @return {number}
 */
const pathSum = (root, sum, curr = 0, count = [0]) => {
  if (!root) return count[0];
  dfs(root, sum, curr, count);
  if (root.left) pathSum(root.left, sum, 0, count);
  if (root.right) pathSum(root.right, sum, 0, count);

  return count[0];
};

console.log(
  // pathSum(TreeNode.create([10, 5, -3, 3, 2, null, 11, 3, -2, null, 1]), 8)
  pathSum(TreeNode.create([1, null, 2, null, 3, null, 4, null, 5]), 3)
);

// https://leetcode-cn.com/problems/path-sum-ii/description/
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
 * @param {number} sum
 * @return {number[][]}
 */
const pathSum = (root, sum, path = [], paths = []) => {
  if (!root) return paths;
  path.push(root.val);
  const target = sum - root.val;
  if (target === 0 && !root.left && !root.right) paths.push(path);
  pathSum(root.left, target, path.slice(), paths);
  pathSum(root.right, target, path.slice(), paths);

  return paths;
};

console.log(
  pathSum(
    TreeNode.create([5, 4, 8, 11, null, 13, 4, 7, 2, null, null, 5, 1]),
    22
  )
);

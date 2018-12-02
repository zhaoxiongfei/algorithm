// https://leetcode-cn.com/contest/weekly-contest-113/problems/flip-equivalent-binary-trees/
//
const TreeNode = require("../binary-tree");
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {boolean}
 */
const flipEquiv = (root1, root2) => {
  if (root1 === null || root2 === null) {
    return root1 === root2;
  }
  if (root1.val !== root2.val) return false;
  return (
    (flipEquiv(root1.left, root2.left) &&
      flipEquiv(root1.right, root2.right)) ||
    (flipEquiv(root1.left, root2.right) && flipEquiv(root1.right, root2.left))
  );
};

console.log(
  flipEquiv(
    TreeNode.create([1, 2, 3, 4, 5, 6, null, null, null, 7, 8]),
    TreeNode.create([1, 3, 2, null, 6, 4, 5, null, null, null, null, 8, 7])
  )
);

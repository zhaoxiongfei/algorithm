/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
const TreeNode = require("../binary-tree");
/**
 * @param {number[]} preorder
 * @return {TreeNode}
 */
const bstFromPreorder = preorder => {
  const root = new TreeNode(preorder[0]);
  let i = 1;
  while (preorder[i] < preorder[0]) i += 1;
  if (1 < i) root.left = bstFromPreorder(preorder.slice(1, i));
  if (i < preorder.length) root.right = bstFromPreorder(preorder.slice(i));
  return root;
};

console.log(bstFromPreorder([8, 5, 1, 7, 10, 12]));

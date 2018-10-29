// https://leetcode-cn.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/description/
const TreeNode = require("./binary-tree");

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
// 思路: 同上一个题 105 类似，后序翻转后，其实就是一个右优先的前序
const buildTree = (inorder, postorder) => {
  const { length } = postorder;
  if (length === 0) return null;
  const root = new TreeNode(postorder[length - 1]);
  if (length === 1) return root;
  const inIndex = inorder.indexOf(root.val);
  if (inIndex === -1) throw Error("inorder / postorder unexception");
  root.left = buildTree(inorder.slice(0, inIndex), postorder.slice(0, inIndex));
  root.right = buildTree(
    inorder.slice(inIndex + 1),
    postorder.slice(inIndex, length - 1)
  );

  return root;
};

console.log(buildTree([9, 3, 15, 20, 7], [9, 15, 7, 20, 3]));

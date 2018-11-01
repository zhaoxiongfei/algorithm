// https://leetcode-cn.com/problems/binary-tree-preorder-traversal/description/
// No. 144

/**
 给定一个二叉树，返回它的 前序 遍历。

 示例:

 输入: [1,null,2,3]
   1
    \
     2
    /
   3

 输出: [1,2,3]
 进阶: 递归算法很简单，你可以通过迭代算法完成吗？
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
 * @return {number[]}
 */
const preorderTraversal = (root, list = []) => {
  if (!root) return list;
  list.push(root.val);
  if (root.left) preorderTraversal(root.left, list);
  if (root.right) preorderTraversal(root.right, list);

  return list;
};

const preorderTraversal2 = root => {
  const list = [];
  if (!root) return list;

  const stack = [root];
  while (stack.length) {
    const node = stack.pop();
    list.push(node.val);
    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }
  return list;
};

console.log(preorderTraversal2(TreeNode.create([1, null, 2, 3])));
console.log(preorderTraversal(TreeNode.create([1, null, 2, 3])));

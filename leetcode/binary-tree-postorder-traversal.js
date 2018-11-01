// https://leetcode-cn.com/problems/binary-tree-postorder-traversal/description/
// No. 145

/**
 给定一个二叉树，返回它的 后序 遍历。

 示例:

 输入: [1,null,2,3]
    1
     \
      2
     /
    3

 输出: [3,2,1]
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
const postorderTraversal = (root, list = []) => {
  if (!root) return list;
  if (root.left) postorderTraversal(root.left, list);
  if (root.right) postorderTraversal(root.right, list);
  list.push(root.val);

  return list;
};

const postorderTraversal2 = root => {
  if (!root) return [];
  const list = [];
  const stack = [root];
  while (stack.length) {
    const node = stack.pop();
    if (!node.left && !node.right) {
      list.push(node.val);
      continue;
    }

    stack.push(new TreeNode(node.val));
    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }

  return list;
};

console.log(postorderTraversal(TreeNode.create([1, null, 2, 3])));
console.log(postorderTraversal2(TreeNode.create([1, null, 2, 3])));

// https://leetcode-cn.com/problems/flatten-binary-tree-to-linked-list/description/
const TreeNode = require("./binary-tree");
// 给定一个二叉树，原地将它展开为链表。

/**
 例如，给定二叉树
    1
   / \
  2   5
 / \   \
3   4   6
将其展开为：

1
 \
  2
   \
    3
     \
      4
       \
        5
         \
          6
*/

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 */
// 思路: 这个就是就是一个前序遍历, 难点在于原地操作, 所以不能简单的拆分为 tree -> inorder -> list
const flatten = root => {
  let pre = {};
  const stack = [root];
  while (stack.length) {
    const node = stack.pop();
    if (!node) continue;
    pre.right = node;
    pre.left = null;
    pre = node;
    stack.push(node.right);
    stack.push(node.left);
  }
};

const tree = TreeNode.create([1, 2, 5, 3, 4, null, 6]);
flatten(tree);
console.log(tree);

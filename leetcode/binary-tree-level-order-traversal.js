// https://leetcode-cn.com/problems/binary-tree-level-order-traversal/description/
const BTree = require("./binary-tree");
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
// 思路: 利用栈, 难点在于如何记录是第几层了, 直接在节点上标记层级深度 depth
// root 默认是 0
const levelOrder = root => {
  const list = [];
  if (!root) return list;
  root.depth = 0;
  const stack = [root];

  while (stack.length) {
    const node = stack.shift();
    if (!list[node.depth]) list[node.depth] = [];
    list[node.depth].push(node.val);
    if (node.left) {
      node.left.depth = node.depth + 1;
      stack.push(node.left);
    }

    if (node.right) {
      node.right.depth = node.depth + 1;
      stack.push(node.right);
    }
  }

  return list;
};

console.log(BTree.make([3, 9, 20, null, null, 15, 7]));
console.log(levelOrder(BTree.make([3, 9, 20, null, null, 15, 7])));

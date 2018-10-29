// https://leetcode-cn.com/problems/binary-tree-level-order-traversal-ii/description/
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
// 思路: 这个题前面出现过几次，懒人思维的话，直接使用前面的代码，把最外层数组翻转一下。
const levelOrderBottom = root => {
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

  return list.reverse();
};

console.log(levelOrderBottom(BTree.create([3, 9, 20, null, null, 15, 7])));

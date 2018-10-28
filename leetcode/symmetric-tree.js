// https://leetcode-cn.com/problems/symmetric-tree/description/
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
 * @return {boolean}
 */
const hasOwn = Object.prototype.hasOwnProperty;

// 思路：利用栈遍历两个树，按不同的顺序入栈
const isSymmetric = root => {
  if (!root) return true;
  const stack1 = [root.left];
  const stack2 = [root.right];

  while (stack1.length) {
    const node1 = stack1.pop();
    const node2 = stack2.pop();
    if (node1 === node2) continue;
    if (!node1 && !node2 && node1 !== node2) return false;
    if (!node1 && node2) return false;
    if (node1 && !node2) return false;

    if (node1.val !== node2.val) return false;
    if (hasOwn.call(node1, "left")) stack1.push(node1.left);
    if (hasOwn.call(node1, "right")) stack1.push(node1.right);
    if (hasOwn.call(node2, "right")) stack2.push(node2.right);
    if (hasOwn.call(node2, "left")) stack2.push(node2.left);
  }

  if (stack2.length) return false;

  return true;
};

// console.log(BTree.make([1, 2, 2, 3, 4, 4, 3]));
console.log(BTree.make([1, 2, 2, null, 3, null, 3]));
// console.log(isSymmetric(BTree.make([1, 2, 2, 3, 4, 4, 3])));
console.log(isSymmetric(BTree.make([1, 2, 2, null, 3, null, 3])));

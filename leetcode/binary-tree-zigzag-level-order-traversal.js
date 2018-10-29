// https://leetcode-cn.com/problems/binary-tree-zigzag-level-order-traversal/description/
const BTree = require("./binary-tree");

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

const pushChild = (node, key, stack) => {
  const child = node[key];
  if (!child) return;
  child.depth = node.depth + 1;
  stack.push(child);
};

/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
// 思路: 简单的想法是利用上一题的逐层遍历，之后隔行翻转
const zigzagLevelOrder = root => {
  const list = [];
  if (!root) return list;
  root.depth = 0;
  const stack = [root];

  while (stack.length) {
    const node = stack.shift();
    if (!list[node.depth]) list[node.depth] = [];
    list[node.depth].push(node.val);
    if (node.left) pushChild(node, "left", stack);
    if (node.right) pushChild(node, "right", stack);
  }

  for (let i = 1; i < list.length; i += 2) list[i].reverse();

  return list;
};

// 另一种做法，直接根据depth决定用push还是unshift 到 list
const zigzagLevelOrder2 = root => {
  const list = [];
  if (!root) return list;
  root.depth = 0;
  const stack = [root];

  while (stack.length) {
    const node = stack.shift();
    if (!list[node.depth]) list[node.depth] = [];
    list[node.depth][node.depth % 2 ? "unshift" : "push"](node.val);
    if (node.left) pushChild(node, "left", stack);
    if (node.right) pushChild(node, "right", stack);
  }

  return list;
};

// console.log(zigzagLevelOrder(BTree.make([3, 9, 20, null, null, 15, 7])));
// console.log(zigzagLevelOrder2(BTree.make([3, 9, 20, null, null, 15, 7])));
console.log(BTree.make([1, 2, 3, 4, null, null, 5]));
console.log(zigzagLevelOrder(BTree.make([1, 2, 3, 4, null, null, 5])));
console.log(zigzagLevelOrder2(BTree.make([1, 2, 3, 4, null, null, 5])));

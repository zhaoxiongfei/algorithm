// https://leetcode-cn.com/contest/weekly-contest-115/problems/check-completeness-of-a-binary-tree/

const TreeNode = require("../binary-tree");
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
const isCompleteTree = root => {
  const list = [];
  let stack1 = [root];
  let stack2 = [];
  while (stack1.length) {
    const node = stack1.shift();
    if (node) {
      list.push(node.val);
      stack2.push(node.left);
      stack2.push(node.right);
    } else {
      list.push(null);
    }
    if (!stack1.length) {
      stack1 = stack2;
      stack2 = [];
    }
  }
  let { length } = list;
  while (list[(length -= 1)] === null && length >= 0) {}
  list.length = length + 1;

  for (const e of list) {
    if (e === null) return false;
  }
  return true;
};

console.log(isCompleteTree(TreeNode.create([1, 2, 3, 4, 5, null, 7])));
console.log(isCompleteTree(TreeNode.create([1, 2, 3, 4, 5, 6])));

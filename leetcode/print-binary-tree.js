// https://leetcode-cn.com/problems/print-binary-tree/
// No 655. 输出二叉树

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
const TreeNode = require("./binary-tree");

const updateWidth = (root, depth) => {
  root.depth = depth;
  root.width = 1;
  if (root.left) {
    updateWidth(root.left, depth + 1);
    root.width = 1 + 2 * root.left.width;
  }
  if (root.right) {
    updateWidth(root.right, depth + 1);
    root.width = Math.max(root.width, 1 + 2 * root.right.width);
  }
};

const updateOffset = (root, offset, width) => {
  const half = (width - 1) >> 1;
  root.offset = offset + half;
  if (root.left) updateOffset(root.left, offset, half);
  if (root.right) updateOffset(root.right, offset + half + 1, half);
};

const dfs = (root, list, n) => {
  if (!list[root.depth]) {
    list[root.depth] = Array(n).fill("");
  }
  list[root.depth][root.offset] = root.val;
  if (root.left) dfs(root.left, list, n);
  if (root.right) dfs(root.right, list, n);
};

/**
 * @param {TreeNode} root
 * @return {string[][]}
 */
const printTree = root => {
  updateWidth(root, 0);
  updateOffset(root, 0, root.width);
  console.log(root);
  const list = [];
  dfs(root, list, root.width);

  return list;
};

console.log(printTree(TreeNode.create(["1", "2", "3", null, 4])));
// console.log(printTree(TreeNode.create(["1", "2"])));

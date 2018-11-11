/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
const TreeNode = require("../binary-tree");

const DFS = (root, L, R, visit) => {
  const stack = [root];
  while (stack.length) {
    const node = stack.pop();
    if (node.val >= L && node.val <= R) visit(node.val);
    if (node.val <= R && node.right) stack.push(node.right);
    if (node.val >= L && node.left) stack.push(node.left);
  }
};
/**
 * @param {TreeNode} root
 * @param {number} L
 * @param {number} R
 * @return {number}
 */
const rangeSumBST = (root, L, R) => {
  let total = 0;
  const visit = v => {
    total += v;
  };
  DFS(root, L, R, visit);
  return total;
};

console.log(rangeSumBST(TreeNode.create([10, 5, 15, 3, 7, null, 18]), 7, 15));
console.log(
  rangeSumBST(TreeNode.create([10, 5, 15, 3, 7, 13, 18, 1, null, 6]), 6, 10)
);

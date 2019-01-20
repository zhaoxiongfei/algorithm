/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
const TreeNode = require("../binary-tree");
/**
 * @param {TreeNode} root
 * @return {number}
 */
const distributeCoins = root => {
  const total = node => {
    node.total = node.val;
    node.size = 1;
    if (node.left) {
      total(node.left);
      node.total += node.left.total;
      node.size += node.left.size;
    }
    if (node.right) {
      total(node.right);
      node.total += node.right.total;
      node.size += node.right.size;
    }
  };

  let step = 0;
  const dfs = node => {
    step += Math.abs(node.size - node.total);
    if (node.left) dfs(node.left);
    if (node.right) dfs(node.right);
  };

  total(root);
  dfs(root);
  return step;
};

console.log(distributeCoins(TreeNode.create([1, 0, 0, null, 3])));
console.log(distributeCoins(TreeNode.create([1, 0, 2])));
console.log(distributeCoins(TreeNode.create([0, 3, 0])));
console.log(distributeCoins(TreeNode.create([3, 0, 0])));

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
const TreeNode = require("../binary-tree");

// https://leetcode-cn.com/articles/binary-tree-cameras/
/**
 * @param {TreeNode} root
 * @return {number}
 */
const minCameraCover = root => {
  if (!root) return 0;
  const solve = node => {
    if (!node) return [0, 0, Infinity];
    const L = solve(node.left);
    const R = solve(node.right);
    const mL12 = Math.min(L[1], L[2]);
    const mR12 = Math.min(R[1], R[2]);

    return [
      L[1] + R[1],
      Math.min(L[2] + mR12, R[2] + mL12),
      1 + Math.min(L[0], mL12) + Math.min(R[0], mR12)
    ];
  };

  const ans = solve(root);

  return Math.min(ans[1], ans[2]);
};

/**
 * @param {TreeNode} root
 * @return {number}
 */
const minCameraCover2 = root => {
  if (!root) return 0;
  const set = new Set();
  let ans = 0;
  const dfs = (node, parent) => {
    if (!node) return;
    dfs(node.left, node);
    dfs(node.right, node);
    if (
      (!parent && !set.has(node)) ||
      !set.has(node.left) ||
      !set.has(node.right)
    ) {
      ans += 1;
      set.add(parent);
      set.add(node);
      set.add(node.left);
      set.add(node.right);
    }
  };

  set.add(null);
  dfs(root, null);

  return ans;
};

console.log(
  minCameraCover(TreeNode.create([0, 0, null, 0, null, 0, null, null, 0]))
);
console.log(
  // minCameraCover(TreeNode.create([0, 0, null, 0, null, 0, null, null, 0]))
  minCameraCover2(TreeNode.create([0, 0, null, 0, null, 0, null, null, 0]))
  // minCameraCover(TreeNode.create([0, 0, 0, null, 0, 0, null, null, 0]))
  // minCameraCover(TreeNode.create([0, 0, null, null, 0, 0, null, null, 0, 0]))
  // minCameraCover(TreeNode.create([0, 0, null, 0, 0]))
);

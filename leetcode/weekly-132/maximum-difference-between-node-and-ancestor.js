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
const maxAncestorDiff = root => {
  let maxDiff = -Infinity;

  const dfs = (node, currMaxs) => {
    if (!node) return;
    for (const currMax of currMaxs) {
      maxDiff = Math.max(maxDiff, Math.abs(currMax - node.val));
    }
    currMaxs.push(node.val);
    if (node.left) dfs(node.left, currMaxs);
    if (node.right) dfs(node.right, currMaxs);
    currMaxs.pop();
  };

  dfs(root.left, [root.val]);
  dfs(root.right, [root.val]);

  return maxDiff;
};

console.log(
  maxAncestorDiff(
    TreeNode.create([8, 3, 10, 1, 6, null, 14, null, null, 4, 7, 13])
    // TreeNode.create([2, 4, 3, 1, null, 0, 5, null, 6, null, null, null, 7])
  )
);

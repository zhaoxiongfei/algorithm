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
 * @return {TreeNode}
 */
const bstToGst = root => {
  const dfs = (node, parent) => {
    if (!node) return 0;
    if (node.right) {
      const val = dfs(node.right, parent);
      node.val += val;
    } else {
      node.val = parent + node.val;
    }
    if (node.left) {
      return dfs(node.left, node.val);
    }
    return node.val;
  };

  dfs(root, 0);
  return root;
};

console.log(
  JSON.stringify(
    bstToGst(
      TreeNode.create([6, 2, 10, 0, 4, 8, 12, null, 1, 3, 5, 7, 9, 11, 13])
    ),
    null,
    2
  )
);

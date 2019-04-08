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
 * @return {Number}
 */

const secondLargest = root => {
  const update = node => {
    if (!node) return 0;
    node.size = update(node.left) + update(node.right) + 1;
    return node.size;
  };

  // 记录每个节点的size(即以该节点为根的子树的节点个数)
  update(root);

  const max = node => {
    while (node.right) {
      node = node.right;
    }
    return node.val;
  };

  const dfs = node => {
    if (!node.right) return max(node.left);
    if (node.right.size === 1) return node.val;
    return dfs(node.right);
  };

  return dfs(root);
};

console.log(secondLargest(TreeNode.create([3, 2, null, 1])));
console.log(secondLargest(TreeNode.create([3, 2, 4])));
console.log(secondLargest(TreeNode.create([8, 5, 10, 3, 6, 9, 11])));

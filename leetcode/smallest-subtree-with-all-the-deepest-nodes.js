// https://leetcode-cn.com/problems/smallest-subtree-with-all-the-deepest-nodes/
// No 865. 具有所有最深结点的最小子树

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
const TreeNode = require("./binary-tree");

/* 设置每个节点的高度 */
const dfsSet = root => {
  root.height = 0;
  if (root.left) {
    dfsSet(root.left);
    root.height = root.left.height;
  }
  if (root.right) {
    dfsSet(root.right);
    if (root.height < root.right.height) root.height = root.right.height;
  }
  root.height += 1;
};

const dfsGet = root => {
  if (!root.left && !root.right) return root;
  if (!root.left || !root.right) return dfsGet(root.left || root.right);
  if (root.left.height === root.right.height) return root;
  if (root.left.height < root.right.height) return dfsGet(root.right);
  return dfsGet(root.left);
};
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
const subtreeWithAllDeepest = root => {
  dfsSet(root);
  return dfsGet(root);
};

console.log(
  subtreeWithAllDeepest(
    TreeNode.create([3, 5, 1, 6, 2, 0, 8, null, null, 7, 4])
  )
);

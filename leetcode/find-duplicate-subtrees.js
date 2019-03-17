// https://leetcode-cn.com/problems/find-duplicate-subtrees/
// No 652. 寻找重复的子树

const TreeNode = require("./binary-tree");
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

const postOrder = (root, map) => {
  if (!root) return "#";
  const str = [
    postOrder(root.left, map),
    postOrder(root.right, map),
    root.val
  ].join(",");
  const ns = map.get(str) || [];
  if (ns.length === 0) map.set(str, ns);
  ns.push(root);

  return str;
};

/**
 * @param {TreeNode} root
 * @return {TreeNode[]}
 */
const findDuplicateSubtrees = root => {
  const map = new Map();
  postOrder(root, map);

  const ans = [];
  for (const [, ns] of map) {
    if (1 < ns.length) ans.push(ns[0]);
  }

  return ans;
};

console.log(
  findDuplicateSubtrees(
    // TreeNode.create([1, 2, 3, 4, null, 2, 4, null, null, 4])
    // TreeNode.create([2, 2, 2, 3, null, 3, null])
    // TreeNode.create([0, 0, 0, 0, null, null, 0, null, null, 0, 0])
    TreeNode.create([0, 0, 0, 0, null, null, 0, null, null, null, 0])
  )
);

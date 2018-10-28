// https://leetcode-cn.com/problems/same-tree/description/
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
// 思路: 递归比较
const isSameTree = (p, q) => {
  if (p === q) return true;
  if (p && !q) return false;
  if (!p && q) return false;
  if (!p && !q && p === q) return false;
  if (p.val !== q.val) return false;
  return isSameTree(p.left, q.left) && isSameTree(q.right, q.right);
};

console.log(isSameTree({}, {}));

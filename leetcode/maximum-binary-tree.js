// https://leetcode-cn.com/problems/maximum-binary-tree/submissions/
// No 654. 最大二叉树

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
const TreeNode = require("./binary-tree");

const create = (list, lo, hi) => {
  if (lo === hi) return null;
  let index = lo;
  for (let i = lo + 1; i < hi; i += 1) {
    if (list[index] < list[i]) index = i;
  }
  const node = new TreeNode(list[index]);
  if (lo < index) node.left = create(list, lo, index);
  if (index < hi - 1) node.right = create(list, index + 1, hi);

  return node;
};

/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
const constructMaximumBinaryTree = nums => {
  if (nums.length === 0) return null;

  return create(nums, 0, nums.length);
};

console.log(constructMaximumBinaryTree([3, 2, 1, 6, 0, 5]));

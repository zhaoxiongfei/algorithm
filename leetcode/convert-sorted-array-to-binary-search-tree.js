// https://leetcode-cn.com/problems/convert-sorted-array-to-binary-search-tree/description/

const TreeNode = require("./binary-tree");

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
// 思路: 说实话，二叉树的问题巨大多数都是递归降低规模，且这种思路最简单，最高效
const sortedArrayToBST = nums => {
  const { length } = nums;
  if (length === 0) return null;

  const middle = (length / 2) | 0;
  const root = new TreeNode(nums[middle]);
  root.left = sortedArrayToBST(nums.slice(0, middle));
  root.right = sortedArrayToBST(nums.slice(middle + 1));

  return root;
};

console.log(sortedArrayToBST([-10, -3, 0, 5, 9]));

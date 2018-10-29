// https://leetcode-cn.com/problems/convert-sorted-list-to-binary-search-tree/description/
const TreeNode = require("./binary-tree");
const ListNode = require("./link");
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
const sortedArrayToBST = nums => {
  const { length } = nums;
  if (length === 0) return null;

  const middle = (length / 2) | 0;
  const root = new TreeNode(nums[middle]);
  root.left = sortedArrayToBST(nums.slice(0, middle));
  root.right = sortedArrayToBST(nums.slice(middle + 1));

  return root;
};
/**
 * @param {ListNode} head
 * @return {TreeNode}
 */
// 思路: 没什么好说了，前面已经可以把有序数组转成平衡二叉树了，这个多了一个前奏，先将link => array
const sortedListToBST = head => {
  const list = [];
  let node = head;
  while (node) {
    list.push(node.val);
    node = node.next;
  }

  return sortedArrayToBST(list);
};

console.log(sortedListToBST(ListNode.create([-10, -3, 0, 5, 9])));

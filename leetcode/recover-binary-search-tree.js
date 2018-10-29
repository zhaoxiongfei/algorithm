// https://leetcode-cn.com/problems/recover-binary-search-tree/description/
const BTree = require("./binary-tree");
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 */
const getInorder = (root, list) => {
  if (!root) return;
  getInorder(root.left, list);
  list.push(root.val);
  getInorder(root.right, list);
};

const traverseAndExchange = (root, first, second) => {
  if (!root) return;
  if (root.val === first) {
    root.val = second;
  } else if (root.val === second) {
    root.val = first;
  }
  traverseAndExchange(root.left, first, second);
  traverseAndExchange(root.right, first, second);
};

// 思路 中序遍历后，搜索二叉树为顺序状态，
// 之所以出错了，一定有逆序的情况出现
// 找到逆序对，而过是一对儿，调换位置，如果是两对儿，第一对儿的第一个的第二对儿的第二调换。
// 注意 两对儿中可能的共用中间一个值的情况
const recoverTree = root => {
  const list = [];

  getInorder(root, list);

  // 找到逆序对儿
  const reverseOrders = [];
  for (let i = 1; i < list.length; i += 1) {
    if (list[i - 1] > list[i]) reverseOrders.push([list[i - 1], list[i]]);
  }

  console.log(list);
  console.log(reverseOrders);
  if (reverseOrders.length === 0) return;
  // 找到要替换的两个元素
  const first = reverseOrders[0][0];
  const second =
    reverseOrders.length === 2 ? reverseOrders[1][1] : reverseOrders[0][1];

  // 扫描并替换
  traverseAndExchange(root, first, second);
};

const btree = BTree.make([1, 3, null, null, 2]);
recoverTree(btree);
console.log(btree);
